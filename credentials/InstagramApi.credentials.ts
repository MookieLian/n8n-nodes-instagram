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
	icon: Icon = 'file:instagram.svg';
	documentationUrl = 'https://github.com/MookieLian/n8n-nodes-instagram#credentials';
	properties: INodeProperties[] = [
		{
			displayName: 'Auth Mode',
			name: 'authMode',
			type: 'options',
			default: 'auto',
			description:
				'How to use the access token for authentication and which host to use for the connection test. Use Auto unless you know you need a specific API surface.',
			options: [
				{
					name: 'Auto (Detect by Token Prefix)',
					value: 'auto',
					description:
						'If the token starts with "IG", use graph.instagram.com (Bearer auth). Otherwise, use graph.facebook.com (access_token query).',
				},
				{
					name: 'Graph API (graph.facebook.com)',
					value: 'graph',
					description:
						'Use Facebook Graph API style (graph.facebook.com) with access_token query parameter. Common for Instagram Graph API publishing flows.',
				},
				{
					name: 'Instagram API (graph.instagram.com)',
					value: 'instagram',
					description:
						'Use Instagram API style (graph.instagram.com) with Authorization: Bearer <token>. Common for IG-prefixed tokens.',
				},
			],
		},
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
			headers: {
				Authorization: '={{"Bearer " + $credentials.accessToken}}',
			},
			qs: {
				access_token: '={{$credentials.accessToken}}',
			},
		},
	};
	test: ICredentialTestRequest = {
		request: {
			method: 'GET',
			url:
				'={{(() => {\n' +
				'  const token = String($credentials.accessToken || "");\n' +
				'  const authMode = String($credentials.authMode || "auto");\n' +
				'  const isIgPrefixed = token.startsWith("IG");\n' +
				'  const mode = authMode === "auto" ? (isIgPrefixed ? "instagram" : "graph") : authMode;\n' +
				'  return mode === "instagram"\n' +
				'    ? "https://graph.instagram.com/v21.0/me"\n' +
				'    : "https://graph.facebook.com/v22.0/me";\n' +
				'})()}}',
			qs: {
				fields: 'id',
			},
		},
	};
}
