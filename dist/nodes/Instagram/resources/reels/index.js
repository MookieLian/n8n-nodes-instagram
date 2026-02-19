"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reelsResource = void 0;
const reelsFields = [
    {
        displayName: 'Video URL',
        name: 'videoUrl',
        type: 'string',
        default: '',
        description: 'The URL of the video to publish as a reel or story on Instagram',
        required: true,
        displayOptions: {
            show: {
                resource: ['reels', 'stories'],
                operation: ['publish'],
            },
        },
    },
];
exports.reelsResource = {
    value: 'reels',
    option: {
        name: 'Reels',
        value: 'reels',
        description: 'Publish a reel',
    },
    fields: reelsFields,
    pollIntervalMs: 2000,
    maxPollAttempts: 80,
    publishRetryDelay: 2000,
    publishMaxAttempts: 6,
    buildMediaPayload(itemIndex) {
        const videoUrl = this.getNodeParameter('videoUrl', itemIndex);
        return {
            video_url: videoUrl,
            media_type: 'REELS',
        };
    },
};
//# sourceMappingURL=index.js.map