"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstagramWebhookApi = void 0;
class InstagramWebhookApi {
    constructor() {
        this.name = 'instagramWebhookApi';
        this.displayName = 'Instagram Webhook API';
        this.icon = 'file:instagram.svg';
        this.documentationUrl = 'https://developers.facebook.com/docs/graph-api/webhooks/getting-started';
        this.test = {
            request: {
                method: 'GET',
                url: 'https://graph.facebook.com/v21.0/versions',
            },
        };
        this.properties = [
            {
                displayName: 'App Secret',
                name: 'appSecret',
                type: 'string',
                typeOptions: { password: true },
                required: true,
                default: '',
                description: 'Your Meta App Secret (from App Dashboard → Settings → Basic). Used to verify X-Hub-Signature-256 on webhook POSTs.',
            },
        ];
    }
}
exports.InstagramWebhookApi = InstagramWebhookApi;
//# sourceMappingURL=InstagramWebhookApi.credentials.js.map