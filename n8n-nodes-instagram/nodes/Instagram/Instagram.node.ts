import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IRequestOptions,
	JsonObject,
} from 'n8n-workflow';
const sleep = (ms: number) =>
	new Promise<void>((resolve) => {
		(globalThis as unknown as { setTimeout: (handler: () => void, timeout?: number) => void }).setTimeout(
			() => resolve(),
			ms,
		);
	});
import { NodeApiError, NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';

export class Instagram implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Instagram',
		name: 'instagram',
		icon: { light: 'file:instagram.png', dark: 'file:instagram.dark.png' },
		group: ['transform'],
		version: 1,
		description: 'Publish media to Instagram using Facebook Graph API',
		defaults: {
			name: 'Instagram',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'facebookGraphApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://graph.facebook.com/',
			headers: {
				accept: 'application/json,text/*;q=0.99',
			},
		},
		properties: [
			{
				displayName: 'Node',
				name: 'node',
				type: 'string',
				default: '',
				description:
					'The Instagram Business Account ID or User ID on which to publish the media',
				placeholder: 'me',
				required: true,
			},
			{
				displayName: 'Image URL',
				name: 'imageUrl',
				type: 'string',
				default: '',
				description: 'The URL of the image to publish on Instagram',
				required: true,
			},
			{
				displayName: 'Caption',
				name: 'caption',
				type: 'string',
				default: '',
				description: 'The caption text for the Instagram post',
				required: true,
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnItems: INodeExecutionData[] = [];

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const graphApiCredentials = await this.getCredentials('facebookGraphApi');
				const node = this.getNodeParameter('node', itemIndex) as string;
				const imageUrl = this.getNodeParameter('imageUrl', itemIndex) as string;
				const caption = this.getNodeParameter('caption', itemIndex) as string;

				// Hardcoded values as per requirements
				const hostUrl = 'graph.facebook.com';
				const graphApiVersion = 'v22.0';
				const httpRequestMethod = 'POST';

				// First request: Create media container
				const mediaUri = `https://${hostUrl}/${graphApiVersion}/${node}/media`;
				const mediaQs: IDataObject = {
					access_token: graphApiCredentials.accessToken,
					image_url: imageUrl,
					caption: caption,
				};

				const mediaRequestOptions: IRequestOptions = {
					headers: {
						accept: 'application/json,text/*;q=0.99',
					},
					method: httpRequestMethod,
					uri: mediaUri,
					qs: mediaQs,
					json: true,
					gzip: true,
				};

				let mediaResponse: any;
				try {
					mediaResponse = await this.helpers.request(mediaRequestOptions);
				} catch (error) {
					if (!this.continueOnFail()) {
						throw new NodeApiError(this.getNode(), error as JsonObject);
					}

					let errorItem;
					if ((error as any).response !== undefined) {
						const graphApiErrors = (error as any).response.body?.error ?? {};
						errorItem = {
							statusCode: (error as any).statusCode,
							...graphApiErrors,
							headers: (error as any).response.headers,
						};
					} else {
						errorItem = error;
					}
					returnItems.push({ json: { ...errorItem } });
					continue;
				}

				if (typeof mediaResponse === 'string') {
					if (!this.continueOnFail()) {
						throw new NodeOperationError(this.getNode(), 'Media creation response body is not valid JSON.', {
							itemIndex,
						});
					}
					returnItems.push({ json: { message: mediaResponse } });
					continue;
				}

				// Extract creation_id from first response
				const creationId = mediaResponse.id;
				if (!creationId) {
					if (!this.continueOnFail()) {
						throw new NodeOperationError(
							this.getNode(),
							'Media creation response did not contain an id (creation_id).',
							{ itemIndex },
						);
					}
					returnItems.push({ json: { error: 'No creation_id in response', response: mediaResponse } });
					continue;
				}

				// Poll until media container is ready
				const statusUri = `https://${hostUrl}/${graphApiVersion}/${creationId}`;
				const pollRequestOptions: IRequestOptions = {
					headers: {
						accept: 'application/json,text/*;q=0.99',
					},
					method: 'GET',
					uri: statusUri,
					qs: {
						access_token: graphApiCredentials.accessToken,
						fields: 'status_code',
					},
					json: true,
					gzip: true,
				};

				const pollIntervalMs = 750;
				const maxPollAttempts = 10;
				let containerReady = false;

				for (let attempt = 1; attempt <= maxPollAttempts; attempt++) {
					const statusResponse = (await this.helpers.request(pollRequestOptions)) as IDataObject;
					if (statusResponse.status_code === 'FINISHED') {
						containerReady = true;
						break;
					}

					if (statusResponse.status_code === 'ERROR') {
						throw new NodeOperationError(
							this.getNode(),
							'Media container returned status ERROR while waiting to publish.',
							{ itemIndex },
						);
					}

					await sleep(pollIntervalMs);
				}

				if (!containerReady) {
					throw new NodeOperationError(
						this.getNode(),
						'Timed out waiting for media container to become ready.',
						{ itemIndex },
					);
				}

				// Second request: Publish media
				const publishUri = `https://${hostUrl}/${graphApiVersion}/${node}/media_publish`;
				const publishQs: IDataObject = {
					access_token: graphApiCredentials.accessToken,
					creation_id: creationId,
				};

				const publishRequestOptions: IRequestOptions = {
					headers: {
						accept: 'application/json,text/*;q=0.99',
					},
					method: httpRequestMethod,
					uri: publishUri,
					qs: publishQs,
					json: true,
					gzip: true,
				};

				let publishResponse: any;
				try {
					publishResponse = await this.helpers.request(publishRequestOptions);
				} catch (error) {
					if (!this.continueOnFail()) {
						throw new NodeApiError(this.getNode(), error as JsonObject);
					}

					let errorItem;
					if ((error as any).response !== undefined) {
						const graphApiErrors = (error as any).response.body?.error ?? {};
						errorItem = {
							statusCode: (error as any).statusCode,
							...graphApiErrors,
							headers: (error as any).response.headers,
							creation_id: creationId,
							note: 'Media was created but publishing failed',
						};
					} else {
						errorItem = { ...error, creation_id: creationId, note: 'Media was created but publishing failed' };
					}
					returnItems.push({ json: { ...errorItem } });
					continue;
				}

				if (typeof publishResponse === 'string') {
					if (!this.continueOnFail()) {
						throw new NodeOperationError(this.getNode(), 'Media publish response body is not valid JSON.', {
							itemIndex,
						});
					}
					returnItems.push({ json: { message: publishResponse } });
					continue;
				}

				// Return the publish response
				returnItems.push({ json: publishResponse });
			} catch (error) {
				if (!this.continueOnFail()) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}

				let errorItem;
				if ((error as any).response !== undefined) {
					const graphApiErrors = (error as any).response.body?.error ?? {};
					errorItem = {
						statusCode: (error as any).statusCode,
						...graphApiErrors,
						headers: (error as any).response.headers,
					};
				} else {
					errorItem = error;
				}
				returnItems.push({ json: { ...errorItem } });
			}
		}

		return [returnItems];
	}
}
