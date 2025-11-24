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
	pollIntervalMs: 3000,
	maxPollAttempts: 80,
	publishRetryDelay: 3000,
	publishMaxAttempts: 6,
	buildMediaPayload(this: IExecuteFunctions, itemIndex: number) {
		const videoUrl = this.getNodeParameter('videoUrl', itemIndex) as string;
		return {
			video_url: videoUrl,
			media_type: 'STORIES',
		};
	},
};

