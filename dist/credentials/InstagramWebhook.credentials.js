"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstagramWebhook = void 0;
class InstagramWebhook {
    constructor() {
        this.name = 'instagramWebhook';
        this.displayName = 'Instagram Webhook';
        this.icon = 'file:instagram.svg';
        this.documentationUrl = 'https://developers.facebook.com/docs/graph-api/webhooks/getting-started';
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
exports.InstagramWebhook = InstagramWebhook;
//# sourceMappingURL=InstagramWebhook.credentials.js.map