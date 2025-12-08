import type {
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

export class FacebookGraphApi implements ICredentialType {
	name = 'facebookGraphApi';

	displayName = 'Facebook Graph API';

	icon: Icon = 'file:facebook.svg';

	documentationUrl = 'https://developers.facebook.com/docs/graph-api';

	properties: INodeProperties[] = [
		{
			displayName: 'Access Token',
			name: 'accessToken',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description: 'Facebook Graph API access token',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://graph.facebook.com/',
			url: '/me',
			method: 'GET',
		},
	};
}

