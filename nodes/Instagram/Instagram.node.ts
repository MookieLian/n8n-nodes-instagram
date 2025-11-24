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
import {
	instagramResourceFields,
	instagramResourceHandlers,
	instagramResourceOptions,
} from './resources';
import type { InstagramResourceType } from './resources/types';

const READY_STATUSES = new Set(['FINISHED', 'PUBLISHED', 'READY']);
const ERROR_STATUSES = new Set(['ERROR', 'FAILED']);

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
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				options: instagramResourceOptions,
				default: 'image',
				description: 'Select the Instagram media type to publish.',
				required: true,
			},
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
			...instagramResourceFields,
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

		const waitForContainerReady = async ({
			creationId,
			hostUrl,
			graphApiVersion,
			accessToken,
			itemIndex,
			pollIntervalMs,
			maxPollAttempts,
		}: {
			creationId: string;
			hostUrl: string;
			graphApiVersion: string;
			accessToken: string;
			itemIndex: number;
			pollIntervalMs: number;
			maxPollAttempts: number;
		}) => {
			const statusUri = `https://${hostUrl}/${graphApiVersion}/${creationId}`;
			const statusFields = ['status_code', 'status'];

			const pollRequestOptions: IRequestOptions = {
				headers: {
					accept: 'application/json,text/*;q=0.99',
				},
				method: 'GET',
				uri: statusUri,
				qs: {
					access_token: accessToken,
					fields: statusFields.join(','),
				},
				json: true,
				gzip: true,
			};

			let lastStatus: string | undefined;

			for (let attempt = 1; attempt <= maxPollAttempts; attempt++) {
				const statusResponse = (await this.helpers.request(pollRequestOptions)) as IDataObject;
				const statuses = statusFields
					.map((field) => statusResponse[field as keyof IDataObject])
					.filter((value): value is string => typeof value === 'string')
					.map((value) => value.toUpperCase());

				if (statuses.length > 0) {
					lastStatus = statuses[0];
				}

				if (statuses.some((status) => READY_STATUSES.has(status))) {
					return;
				}

				if (statuses.some((status) => ERROR_STATUSES.has(status))) {
					throw new NodeOperationError(
						this.getNode(),
						`Media container reported error status (${statuses.join(', ')}) while waiting to publish.`,
						{ itemIndex },
					);
				}

				await sleep(pollIntervalMs);
			}

			throw new NodeOperationError(
				this.getNode(),
				`Timed out waiting for container to become ready. Last known status: ${lastStatus ?? 'unknown'}.`,
				{ itemIndex },
			);
		};

		const isMediaNotReadyError = (error: unknown) => {
			const graphError = (error as any)?.response?.body?.error;
			if (!graphError) return false;
			const message = (graphError.message as string | undefined)?.toLowerCase() ?? '';
			const code = graphError.code as number | undefined;
			const subcode = graphError.error_subcode as number | undefined;
			return (
				message.includes('not ready') ||
				message.includes('not finished') ||
				message.includes('not yet') ||
				code === 900 ||
				subcode === 2207055
			);
		};

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				const graphApiCredentials = await this.getCredentials('facebookGraphApi');
				const resource = this.getNodeParameter('resource', itemIndex) as InstagramResourceType;
				const handler = instagramResourceHandlers[resource];
				if (!handler) {
					throw new NodeOperationError(this.getNode(), `Unsupported resource: ${resource}`, {
						itemIndex,
					});
				}
				const node = this.getNodeParameter('node', itemIndex) as string;
				const caption = this.getNodeParameter('caption', itemIndex) as string;

				// Hardcoded values as per requirements
				const hostUrl = 'graph.facebook.com';
				const graphApiVersion = 'v22.0';
				const httpRequestMethod = 'POST';

				// First request: Create media container
				const mediaUri = `https://${hostUrl}/${graphApiVersion}/${node}/media`;
				const mediaPayload = handler.buildMediaPayload.call(this, itemIndex);
				const mediaQs: IDataObject = {
					access_token: graphApiCredentials.accessToken,
					caption,
					...mediaPayload,
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

				// Wait until the container is ready before publishing
				await waitForContainerReady({
					creationId,
					hostUrl,
					graphApiVersion,
					accessToken: graphApiCredentials.accessToken as string,
					itemIndex,
					pollIntervalMs: handler.pollIntervalMs,
					maxPollAttempts: handler.maxPollAttempts,
				});

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

				const publishRetryDelay = handler.publishRetryDelay;
				const publishMaxAttempts = handler.publishMaxAttempts;
				let publishResponse: any;
				let publishSucceeded = false;
				let publishFailedWithError = false;

				for (let attempt = 1; attempt <= publishMaxAttempts; attempt++) {
					try {
						publishResponse = await this.helpers.request(publishRequestOptions);
						publishSucceeded = true;
						break;
					} catch (error) {
						if (isMediaNotReadyError(error) && attempt < publishMaxAttempts) {
							await sleep(publishRetryDelay);
							continue;
						}

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
						publishFailedWithError = true;
						break;
					}
				}

				if (publishFailedWithError) {
					continue;
				}

				if (!publishSucceeded) {
					throw new NodeOperationError(
						this.getNode(),
						`Failed to publish media after ${publishMaxAttempts} attempts due to container not being ready.`,
						{ itemIndex },
					);
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
