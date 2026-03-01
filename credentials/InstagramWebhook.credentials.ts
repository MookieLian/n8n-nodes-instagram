import type { ICredentialType, INodeProperties, Icon } from 'n8n-workflow';

export class InstagramWebhook implements ICredentialType {
	name = 'instagramWebhook';
	displayName = 'Instagram Webhook';
	icon: Icon = 'file:instagram.svg';
	documentationUrl =
		'https://developers.facebook.com/docs/graph-api/webhooks/getting-started';
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
