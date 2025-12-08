import type {
	IDataObject,
	IExecuteFunctions,
	IHttpRequestOptions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
} from 'n8n-workflow';
import { NodeApiError, NodeConnectionTypes, NodeOperationError, sleep } from 'n8n-workflow';
import { instagramResourceFields, instagramResourceHandlers } from './resources';
import type { InstagramResourceType } from './resources/types';

const READY_STATUSES = new Set(['FINISHED', 'PUBLISHED', 'READY']);
const ERROR_STATUSES = new Set(['ERROR', 'FAILED']);

export class Instagram implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Instagram',
		name: 'instagram',
		icon: { light: 'file:instagram.svg', dark: 'file:instagram.dark.svg' },
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
				name: 'instagramApi',
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
				noDataExpression: true,
				options: [
					{
						name: 'Image',
						value: 'image',
						description: 'Publish an image post',
					},
					{
						name: 'Reel',
						value: 'reels',
						description: 'Publish a reel',
					},
					{
						name: 'Story',
						value: 'stories',
						description: 'Publish a story',
					},
				],
				default: 'image',
				description: 'Select the Instagram media type to publish',
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
			itemIndex,
			pollIntervalMs,
			maxPollAttempts,
		}: {
			creationId: string;
			hostUrl: string;
			graphApiVersion: string;
			itemIndex: number;
			pollIntervalMs: number;
			maxPollAttempts: number;
		}) => {
			const statusUri = `https://${hostUrl}/${graphApiVersion}/${creationId}`;
			const statusFields = ['status_code', 'status'];

			const pollRequestOptions: IHttpRequestOptions = {
				headers: {
					accept: 'application/json,text/*;q=0.99',
				},
				method: 'GET',
				url: statusUri,
				qs: {
					fields: statusFields.join(','),
				},
				json: true,
			};

			let lastStatus: string | undefined;

			for (let attempt = 1; attempt <= maxPollAttempts; attempt++) {
				const statusResponse = (await this.helpers.httpRequestWithAuthentication.call(
					this,
					'instagramApi',
					pollRequestOptions,
				)) as IDataObject;
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
			type GraphError = {
				message?: string;
				code?: number;
				error_subcode?: number;
			};
			type ErrorWithGraph = {
				response?: {
					body?: {
						error?: GraphError;
					};
				};
			};
			const errorWithGraph = error as ErrorWithGraph;
			const graphError = errorWithGraph?.response?.body?.error;
			if (!graphError) return false;
			const message = graphError.message?.toLowerCase() ?? '';
			const code = graphError.code;
			const subcode = graphError.error_subcode;
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
					caption,
					...mediaPayload,
				};

				const mediaRequestOptions: IHttpRequestOptions = {
					headers: {
						accept: 'application/json,text/*;q=0.99',
					},
					method: httpRequestMethod,
					url: mediaUri,
					qs: mediaQs,
					json: true,
				};

				let mediaResponse: IDataObject;
				try {
					mediaResponse = await this.helpers.httpRequestWithAuthentication.call(
						this,
						'instagramApi',
						mediaRequestOptions,
					);
				} catch (error: unknown) {
					if (!this.continueOnFail()) {
						throw new NodeApiError(this.getNode(), error as JsonObject);
					}

					let errorItem: Record<string, unknown>;
					type ResponseErrorType = {
						statusCode?: number;
						response?: {
							body?: {
								error?: {
									[key: string]: unknown;
								};
							};
							headers?: Record<string, unknown>;
						};
					};
					const err = error as ResponseErrorType;
					if (err.response !== undefined) {
						const graphApiErrors = err.response.body?.error ?? {};
						errorItem = {
							statusCode: err.statusCode,
							...graphApiErrors,
							headers: err.response.headers,
						};
					} else {
						errorItem = err;
					}
					returnItems.push({ json: errorItem as IDataObject, pairedItem: { item: itemIndex } });
					continue;
				}

				if (typeof mediaResponse === 'string') {
					if (!this.continueOnFail()) {
						throw new NodeOperationError(this.getNode(), 'Media creation response body is not valid JSON.', {
							itemIndex,
						});
					}
					returnItems.push({ json: { message: mediaResponse }, pairedItem: { item: itemIndex } });
					continue;
				}

				// Extract creation_id from first response
				const creationId = mediaResponse.id as string | undefined;
				if (!creationId) {
					if (!this.continueOnFail()) {
						throw new NodeOperationError(
							this.getNode(),
							'Media creation response did not contain an id (creation_id).',
							{ itemIndex },
						);
					}
					returnItems.push({ json: { error: 'No creation_id in response', response: mediaResponse }, pairedItem: { item: itemIndex } });
					continue;
				}

				// Wait until the container is ready before publishing
				await waitForContainerReady({
					creationId,
					hostUrl,
					graphApiVersion,
					itemIndex,
					pollIntervalMs: handler.pollIntervalMs,
					maxPollAttempts: handler.maxPollAttempts,
				});

				// Second request: Publish media
				const publishUri = `https://${hostUrl}/${graphApiVersion}/${node}/media_publish`;
				const publishQs: IDataObject = {
					creation_id: creationId,
				};

				const publishRequestOptions: IHttpRequestOptions = {
					headers: {
						accept: 'application/json,text/*;q=0.99',
					},
					method: httpRequestMethod,
					url: publishUri,
					qs: publishQs,
					json: true,
				};

				const publishRetryDelay = handler.publishRetryDelay;
				const publishMaxAttempts = handler.publishMaxAttempts;
				let publishResponse: IDataObject | undefined;
				let publishSucceeded = false;
				let publishFailedWithError = false;

				for (let attempt = 1; attempt <= publishMaxAttempts; attempt++) {
					try {
						publishResponse = await this.helpers.httpRequestWithAuthentication.call(
							this,
							'instagramApi',
							publishRequestOptions,
						);
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
						type ErrorWithResponse = {
							response?: {
								body?: {
									error?: IDataObject;
								};
								headers?: IDataObject;
							};
							statusCode?: number;
						};
						const err = error as ErrorWithResponse;
						if (err.response !== undefined) {
							const graphApiErrors = err.response.body?.error ?? {};
							errorItem = {
								statusCode: err.statusCode,
								...graphApiErrors,
								headers: err.response.headers,
								creation_id: creationId,
								note: 'Media was created but publishing failed',
							};
						} else {
							errorItem = { ...(error as object), creation_id: creationId, note: 'Media was created but publishing failed' };
						}
						returnItems.push({ json: { ...errorItem }, pairedItem: { item: itemIndex } });
						publishFailedWithError = true;
						break;
					}
				}

				if (publishFailedWithError) {
					continue;
				}

				if (!publishSucceeded || publishResponse === undefined) {
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
					returnItems.push({ json: { message: publishResponse }, pairedItem: { item: itemIndex } });
					continue;
				}

				// Return the publish response
				returnItems.push({ json: publishResponse, pairedItem: { item: itemIndex } });
			} catch (error) {
				if (!this.continueOnFail()) {
					throw new NodeApiError(this.getNode(), error as JsonObject);
				}

				let errorItem;
				type GraphError = {
					message?: string;
					code?: number;
					error_subcode?: number;
				};
				type ErrorWithGraph = {
					response?: {
						body?: {
							error?: GraphError;
						};
						headers?: IDataObject;
					};
					statusCode?: number;
				};
				const errorWithGraph = error as ErrorWithGraph;
				if (errorWithGraph.response !== undefined) {
					const graphApiErrors = errorWithGraph.response.body?.error ?? {};
					errorItem = {
						statusCode: errorWithGraph.statusCode,
						...graphApiErrors,
						headers: errorWithGraph.response.headers,
					};
				} else {
					errorItem = error as IDataObject;
				}
				returnItems.push({ json: { ...errorItem }, pairedItem: { item: itemIndex } });
			}
		}

		return [returnItems];
	}
}
