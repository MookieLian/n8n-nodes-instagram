"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageResource = void 0;
const imageFields = [
    {
        displayName: 'Image URL',
        name: 'imageUrl',
        type: 'string',
        default: '',
        description: 'The URL of the image to publish on Instagram',
        required: true,
        displayOptions: {
            show: {
                resource: ['image'],
                operation: ['publish'],
            },
        },
    },
];
exports.imageResource = {
    value: 'image',
    option: {
        name: 'Image',
        value: 'image',
        description: 'Publish an image post',
    },
    fields: imageFields,
    pollIntervalMs: 1500,
    maxPollAttempts: 20,
    publishRetryDelay: 1500,
    publishMaxAttempts: 3,
    buildMediaPayload(itemIndex) {
        const imageUrl = this.getNodeParameter('imageUrl', itemIndex);
        const payload = {
            image_url: imageUrl,
        };
        return payload;
    },
};
//# sourceMappingURL=index.js.map