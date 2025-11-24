"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storiesResource = void 0;
exports.storiesResource = {
    value: 'stories',
    option: {
        name: 'Stories',
        value: 'stories',
        description: 'Publish a story',
    },
    fields: [],
    pollIntervalMs: 3000,
    maxPollAttempts: 80,
    publishRetryDelay: 3000,
    publishMaxAttempts: 6,
    buildMediaPayload(itemIndex) {
        const videoUrl = this.getNodeParameter('videoUrl', itemIndex);
        return {
            video_url: videoUrl,
            media_type: 'STORIES',
        };
    },
};
//# sourceMappingURL=index.js.map