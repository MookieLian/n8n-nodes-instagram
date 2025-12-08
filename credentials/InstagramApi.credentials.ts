import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

export class InstagramApi implements ICredentialType {
	name = 'instagramApi';
	displayName = 'Instagram API';
	icon: Icon = 'file:facebook.svg';
	documentationUrl = 'https://github.com/MookieLian/n8n-nodes-instagram#credentials';
	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description: 'Instagram Graph API user access token with publish permissions',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			qs: {
				access_token: '={{$credentials.accessToken}}',
			},
		},
	};
	test: ICredentialTestRequest = {
		request: {
			method: 'GET',
			url: 'https://graph.facebook.com/v22.0/me',
			qs: {
				fields: 'id',
			},
		},
	};
}
