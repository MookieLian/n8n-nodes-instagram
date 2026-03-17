"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstagramApi = void 0;
class InstagramApi {
    constructor() {
        this.name = 'instagramApi';
        this.displayName = 'Instagram API';
        this.icon = 'file:instagram.svg';
        this.documentationUrl = 'https://github.com/MookieLian/n8n-nodes-instagram#credentials';
        this.properties = [
            {
                displayName: 'Auth Mode',
                name: 'authMode',
                type: 'options',
                default: 'auto',
                description: 'How to use the access token for authentication and which host to use for the connection test. Use Auto unless you know you need a specific API surface.',
                options: [
                    {
                        name: 'Auto (Detect by Token Prefix)',
                        value: 'auto',
                        description: 'If the token starts with "IG", use graph.instagram.com (Bearer auth). Otherwise, use graph.facebook.com (access_token query).',
                    },
                    {
                        name: 'Graph API (graph.facebook.com)',
                        value: 'graph',
                        description: 'Use Facebook Graph API style (graph.facebook.com) with access_token query parameter. Common for Instagram Graph API publishing flows.',
                    },
                    {
                        name: 'Instagram API (graph.instagram.com)',
                        value: 'instagram',
                        description: 'Use Instagram API style (graph.instagram.com) with Authorization: Bearer <token>. Common for IG-prefixed tokens.',
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
        this.authenticate = {
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
        this.test = {
            request: {
                method: 'GET',
                url: '={{(() => {\n' +
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
}
exports.InstagramApi = InstagramApi;
//# sourceMappingURL=InstagramApi.credentials.js.map