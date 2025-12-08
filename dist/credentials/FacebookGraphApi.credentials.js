"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacebookGraphApi = void 0;
class FacebookGraphApi {
    constructor() {
        this.name = 'facebookGraphApi';
        this.displayName = 'Facebook Graph API';
        this.icon = 'file:facebook.svg';
        this.documentationUrl = 'https://developers.facebook.com/docs/graph-api';
        this.properties = [
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
        this.test = {
            request: {
                baseURL: 'https://graph.facebook.com/',
                url: '/me',
                method: 'GET',
            },
        };
    }
}
exports.FacebookGraphApi = FacebookGraphApi;
//# sourceMappingURL=FacebookGraphApi.credentials.js.map