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
    pollIntervalMs: 2000,
    maxPollAttempts: 40,
    publishRetryDelay: 2000,
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