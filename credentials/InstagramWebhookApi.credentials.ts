import type {
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

export class InstagramWebhookApi implements ICredentialType {
	name = 'instagramWebhookApi';
	displayName = 'Instagram Webhook API';
	icon: Icon = 'file:instagram.svg';
	documentationUrl =
		'https://developers.facebook.com/docs/graph-api/webhooks/getting-started';
	test: ICredentialTestRequest = {
		request: {
			method: 'GET',
			url: 'https://graph.facebook.com/v21.0/versions',
		},
	};
	properties: INodeProperties[] = [
		{
			displayName: 'App Secret',
			name: 'appSecret',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description:
				'Your Meta App Secret (from App Dashboard → Settings → Basic). Used to verify X-Hub-Signature-256 on webhook POSTs.',
		},
	];
}

