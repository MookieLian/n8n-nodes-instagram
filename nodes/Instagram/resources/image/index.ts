import type { IDataObject, IExecuteFunctions, INodeProperties } from 'n8n-workflow';
import type { ResourceHandler } from '../types';

const imageFields: INodeProperties[] = [
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
			},
		},
	},
];

export const imageResource: ResourceHandler = {
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
	buildMediaPayload(this: IExecuteFunctions, itemIndex: number): IDataObject {
		const imageUrl = this.getNodeParameter('imageUrl', itemIndex) as string;
		return {
			image_url: imageUrl,
		};
	},
};

