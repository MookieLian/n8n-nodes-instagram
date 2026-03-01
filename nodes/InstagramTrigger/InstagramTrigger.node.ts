import type {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IWebhookResponseData,
} from 'n8n-workflow';
import type { IWebhookFunctions } from 'n8n-workflow';
import { NodeConnectionTypes } from 'n8n-workflow';

// Use Node built-ins without pulling in @types/node (n8n runs in Node)
const crypto = require('node:crypto') as {
	createHmac: (algo: string, secret: string) => { update: (data: string | Uint8Array) => { digest: (enc: string) => string } };
	timingSafeEqual: (a: Uint8Array, b: Uint8Array) => boolean;
};
const BufferGlobal = typeof globalThis !== 'undefined' && (globalThis as { Buffer?: unknown }).Buffer;
const Buffer = BufferGlobal as {
	from(s: string, enc?: string): Uint8Array;
	isBuffer(v: unknown): v is Uint8Array;
};

const INSTAGRAM_OBJECT = 'instagram';

const INSTAGRAM_WEBHOOK_FIELDS = [
	{ name: 'Comments', value: 'comments', description: 'When someone comments on media' },
	{ name: 'Live Comments', value: 'live_comments', description: 'Comments during live streams' },
	{ name: 'Message Edit', value: 'message_edit', description: 'When a direct message is edited' },
	{ name: 'Message Reactions', value: 'message_reactions', description: 'Reactions to direct messages' },
	{ name: 'Messages', value: 'messages', description: 'When users send direct messages' },
	{ name: 'Mentions', value: 'mentions', description: 'When your account is @mentioned' },
	{ name: 'Messaging Handover', value: 'messaging_handover', description: 'Thread control changes' },
	{ name: 'Messaging Referral', value: 'messaging_referral', description: 'Referral from messaging' },
	{ name: 'Messaging Seen', value: 'messaging_seen', description: 'When someone sees a message' },
	{ name: 'Messaging Postbacks', value: 'messaging_postbacks', description: 'Postback button clicks' },
	{ name: 'Standby', value: 'standby', description: 'Standby events' },
	{ name: 'Story Insights', value: 'story_insights', description: 'Metrics when a story expires' },
] as const;

function verifySignature(rawBody: string | Uint8Array, signature: string, secret: string): boolean {
	const expected = 'sha256=' + crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
	if (signature.length !== expected.length) return false;
	try {
		const sigBuf = Buffer.from(signature, 'utf8');
		const expBuf = Buffer.from(expected, 'utf8');
		return crypto.timingSafeEqual(sigBuf as Uint8Array, expBuf as Uint8Array);
	} catch {
		return false;
	}
}

export class InstagramTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Instagram Trigger',
		name: 'instagramTrigger',
		icon: { light: 'file:../Instagram/instagram.svg', dark: 'file:../Instagram/instagram.dark.svg' },
		group: ['trigger'],
		version: 1,
		description: 'Listen for Instagram webhook events from Meta (comments, messages, mentions, story insights, etc.)',
		defaults: {
			name: 'Instagram Trigger',
		},
		inputs: [],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'instagramWebhook',
				required: true,
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'GET',
				responseMode: 'onReceived',
				path: 'instagram',
			},
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'instagram',
			},
		],
		properties: [
			{
				displayName: 'Verify Token',
				name: 'verifyToken',
				type: 'string',
				typeOptions: { password: true },
				required: true,
				default: '',
				description:
					'Must match the Verify Token you set in Meta App Dashboard → Webhooks. Meta sends this on GET for URL verification.',
			},
			{
				displayName: 'Events to Include',
				name: 'eventsToInclude',
				type: 'multiOptions',
				options: INSTAGRAM_WEBHOOK_FIELDS.map((f) => ({
					name: f.name,
					value: f.value,
					description: f.description,
				})),
				default: [],
				description:
					'If empty, all received events are output. Otherwise only selected event types are passed to the workflow.',
			},
		],
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		const req = this.getRequestObject();
		const method = (req.method || 'GET').toUpperCase();

		if (method === 'GET') {
			const query = this.getQueryData() as IDataObject;
			const hubMode = query['hub.mode'] ?? query.hub_mode;
			const hubChallenge = query['hub.challenge'] ?? query.hub_challenge;
			const hubVerifyToken = query['hub.verify_token'] ?? query.hub_verify_token;
			const verifyToken = this.getNodeParameter('verifyToken') as string;

			if (hubMode === 'subscribe' && String(hubVerifyToken) === String(verifyToken) && hubChallenge != null) {
				return {
					webhookResponse: String(hubChallenge),
				};
			}
			return {
				webhookResponse: 'Forbidden',
				noWebhookResponse: false,
			};
		}

		// POST: event notification
		const headers = this.getHeaderData() as IDataObject;
		const signature = (headers['x-hub-signature-256'] ?? headers['X-Hub-Signature-256']) as string | undefined;
		const credentials = await this.getCredentials('instagramWebhook');
		const appSecret = credentials?.appSecret as string | undefined;

		if (!appSecret || !signature || typeof signature !== 'string') {
			return {
				webhookResponse: { error: 'Missing signature or app secret' },
				noWebhookResponse: false,
			};
		}

		const rawBody = (req as IDataObject & { rawBody?: Uint8Array }).rawBody;
		const bodyData = this.getBodyData();
		const rawPayload: string | Uint8Array =
			rawBody && Buffer.isBuffer(rawBody)
				? rawBody
				: Buffer.from(typeof bodyData === 'object' ? JSON.stringify(bodyData) : String(bodyData ?? ''), 'utf8');

		if (!verifySignature(rawPayload, signature, appSecret)) {
			return {
				webhookResponse: { error: 'Invalid signature' },
				noWebhookResponse: false,
			};
		}

		const payload = typeof bodyData === 'object' && bodyData !== null ? bodyData : {};
		const objectType = payload.object as string;
		const entries = Array.isArray(payload.entry) ? payload.entry : [];

		if (objectType !== INSTAGRAM_OBJECT) {
			return { webhookResponse: 'OK' };
		}

		const eventsToInclude = (this.getNodeParameter('eventsToInclude') as string[]) || [];
		const filterByEvents = eventsToInclude.length > 0;

		const items: INodeExecutionData[] = [];
		for (const entry of entries) {
			const entryObj = entry as IDataObject;
			const id = entryObj.id;
			const time = entryObj.time;
			const changesRaw = entryObj.changes;
			const changes: IDataObject[] = Array.isArray(changesRaw) ? (changesRaw as IDataObject[]) : [];
			for (const change of changes) {
				const field = (change as IDataObject).field as string | undefined;
				if (filterByEvents && field && !eventsToInclude.includes(field)) continue;
				items.push({
					json: {
						object: objectType,
						field,
						value: (change as IDataObject).value,
						id,
						time,
						...(change as IDataObject),
					} as IDataObject,
				});
			}
		}

		if (items.length === 0) {
			return { webhookResponse: 'OK' };
		}

		return {
			workflowData: [items],
			webhookResponse: 'OK',
		};
	}
}
