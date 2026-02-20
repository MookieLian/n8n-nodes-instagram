import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import type { ResourceHandler } from '../types';

const reelsFields: INodeProperties[] = [
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

export const reelsResource: ResourceHandler = {
	value: 'reels',
	option: {
		name: 'Reels',
		value: 'reels',
		description: 'Publish a reel',
	},
	fields: reelsFields,
	pollIntervalMs: 2000,
	maxPollAttempts: 40, // Reduced from 80 - containers usually ready within 40 attempts (~80 seconds max)
	publishRetryDelay: 2000,
	publishMaxAttempts: 6,
	buildMediaPayload(this: IExecuteFunctions, itemIndex: number): IDataObject {
		const videoUrl = this.getNodeParameter('videoUrl', itemIndex) as string;
		return {
			video_url: videoUrl,
			media_type: 'REELS',
		};
	},
};

