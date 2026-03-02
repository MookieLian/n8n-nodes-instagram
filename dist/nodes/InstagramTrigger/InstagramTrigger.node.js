"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstagramTrigger = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const crypto = require('node:crypto');
const { Buffer } = require('node:buffer');
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
];
function verifySignature(rawBody, signature, secret) {
    const expected = 'sha256=' + crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
    if (signature.length !== expected.length)
        return false;
    try {
        const sigBuf = Buffer.from(signature, 'utf8');
        const expBuf = Buffer.from(expected, 'utf8');
        return crypto.timingSafeEqual(sigBuf, expBuf);
    }
    catch {
        return false;
    }
}
class InstagramTrigger {
    constructor() {
        this.description = {
            displayName: 'Instagram Trigger',
            name: 'instagramTrigger',
            icon: { light: 'file:../Instagram/instagram.svg', dark: 'file:../Instagram/instagram.dark.svg' },
            group: ['trigger'],
            version: 2,
            description: "Instagram trigger for n8n that lets you react to real-time events (comments, messages, mentions, story insights, etc.) from Instagram Business and Creator accounts via the Facebook/Instagram Graph API, so you can connect incoming activity to the same automated workflows that manage publishing, moderation, messaging and analytics.",
            defaults: {
                name: 'Instagram Trigger',
            },
            inputs: [],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            credentials: [
                {
                    name: 'instagramWebhook',
                    required: true,
                    displayOptions: { show: { skipSignatureVerification: [false] } },
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
                    description: 'Must match the Verify Token you set in Meta App Dashboard → Webhooks. Meta sends this on GET for URL verification.',
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
                    description: 'If empty, all received events are output. Otherwise only selected event types are passed to the workflow.',
                },
                {
                    displayName: 'Skip Signature Verification',
                    name: 'skipSignatureVerification',
                    type: 'boolean',
                    default: true,
                    description: 'Enabled by default because n8n may not provide raw body for X-Hub-Signature-256 verification. Disable only if you have confirmed signature verification works in your setup.',
                },
            ],
        };
    }
    async webhook() {
        var _a, _b, _c, _d;
        const req = this.getRequestObject();
        const method = (req.method || 'GET').toUpperCase();
        if (method === 'GET') {
            const query = this.getQueryData();
            const hubMode = (_a = query['hub.mode']) !== null && _a !== void 0 ? _a : query.hub_mode;
            const hubChallenge = (_b = query['hub.challenge']) !== null && _b !== void 0 ? _b : query.hub_challenge;
            const hubVerifyToken = (_c = query['hub.verify_token']) !== null && _c !== void 0 ? _c : query.hub_verify_token;
            const verifyToken = this.getNodeParameter('verifyToken');
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
        const bodyData = this.getBodyData();
        const headers = this.getHeaderData();
        const signature = ((_d = headers['x-hub-signature-256']) !== null && _d !== void 0 ? _d : headers['X-Hub-Signature-256']);
        const skipVerification = this.getNodeParameter('skipSignatureVerification');
        if (!skipVerification) {
            const credentials = await this.getCredentials('instagramWebhook');
            const appSecret = credentials === null || credentials === void 0 ? void 0 : credentials.appSecret;
            if (!appSecret || !signature || typeof signature !== 'string') {
                return {
                    webhookResponse: { error: 'Missing signature or app secret' },
                    noWebhookResponse: false,
                };
            }
            const rawBody = req.rawBody;
            const rawPayload = rawBody && Buffer.isBuffer(rawBody)
                ? rawBody
                : Buffer.from(typeof bodyData === 'object' ? JSON.stringify(bodyData) : String(bodyData !== null && bodyData !== void 0 ? bodyData : ''), 'utf8');
            if (!verifySignature(rawPayload, signature, appSecret)) {
                return {
                    webhookResponse: { error: 'Invalid signature' },
                    noWebhookResponse: false,
                };
            }
        }
        const payload = typeof bodyData === 'object' && bodyData !== null ? bodyData : {};
        const objectType = payload.object;
        const entries = Array.isArray(payload.entry) ? payload.entry : [];
        if (objectType !== INSTAGRAM_OBJECT) {
            return { webhookResponse: 'OK' };
        }
        const eventsToInclude = this.getNodeParameter('eventsToInclude') || [];
        const filterByEvents = eventsToInclude.length > 0;
        const items = [];
        for (const entry of entries) {
            const entryObj = entry;
            const id = entryObj.id;
            const time = entryObj.time;
            const changesRaw = entryObj.changes;
            const changes = Array.isArray(changesRaw) ? changesRaw : [];
            for (const change of changes) {
                const field = change.field;
                if (filterByEvents && field && !eventsToInclude.includes(field))
                    continue;
                items.push({
                    json: {
                        object: objectType,
                        field,
                        value: change.value,
                        id,
                        time,
                        ...change,
                    },
                });
            }
            const messagingRaw = entryObj.messaging;
            const messaging = Array.isArray(messagingRaw) ? messagingRaw : [];
            for (const msg of messaging) {
                if (filterByEvents && !eventsToInclude.includes('messages'))
                    continue;
                items.push({
                    json: {
                        object: objectType,
                        field: 'messages',
                        id,
                        time,
                        sender: msg.sender,
                        recipient: msg.recipient,
                        timestamp: msg.timestamp,
                        message: msg.message,
                        ...msg,
                    },
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
exports.InstagramTrigger = InstagramTrigger;
//# sourceMappingURL=InstagramTrigger.node.js.map