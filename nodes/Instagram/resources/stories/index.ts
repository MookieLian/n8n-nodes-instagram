import type { IExecuteFunctions } from 'n8n-workflow';
import type { ResourceHandler } from '../types';

export const storiesResource: ResourceHandler = {
	value: 'stories',
	option: {
		name: 'Stories',
		value: 'stories',
		description: 'Publish a story',
	},
	fields: [],
	pollIntervalMs: 2000, // Reduced from 3000ms for faster polling
	maxPollAttempts: 40, // Reduced from 80 - containers usually ready within 40 attempts (~80 seconds max)
	publishRetryDelay: 2000, // Reduced from 3000ms
	publishMaxAttempts: 6,
	buildMediaPayload(this: IExecuteFunctions, itemIndex: number) {
		const videoUrl = this.getNodeParameter('videoUrl', itemIndex) as string;
		return {
			video_url: videoUrl,
			media_type: 'STORIES',
		};
	},
};

