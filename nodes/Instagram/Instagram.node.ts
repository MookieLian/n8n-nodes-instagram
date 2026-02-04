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
						name: 'Auth',
						value: 'auth',
						description: 'Exchange and refresh Instagram access tokens; call /me',
					},
					{
						name: 'Comment',
						value: 'comments',
						description: 'Moderate comments on Instagram media',
					},
					{
						name: 'IG Hashtag',
						value: 'igHashtag',
						description: 'Search hashtags and fetch top or recent media for a hashtag',
					},
					{
						name: 'IG User',
						value: 'igUser',
						description: 'Read profile and media for an Instagram Business or Creator account',
					},
					{
						name: 'Image',
						value: 'image',
						description: 'Publish image posts to Instagram',
					},
					{
						name: 'Messaging',
						value: 'messaging',
						description: 'Send direct messages via the Instagram Messaging API',
					},
					{
						name: 'Reel',
						value: 'reels',
						description: 'Publish Reels videos to Instagram',
					},
					{
						name: 'Story',
						value: 'stories',
						description: 'Publish story videos to Instagram',
					},
				],
				default: 'image',
				description: 'Select what you want to do with the Instagram API',
				required: true,
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['image', 'reels', 'stories'],
					},
				},
				options: [
					{
						name: 'Publish',
						value: 'publish',
						action: 'Publish',
						description:
							'Publish the selected media type (image, reel, or story) to Instagram',
					},
				],
				default: 'publish',
				required: true,
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['comments'],
					},
				},
				options: [
					{
						name: 'Delete',
						value: 'deleteComment',
						action: 'Delete a comment',
						description: 'Delete a comment from an Instagram media object',
					},
					{
						name: 'Disable Comments',
						value: 'disableComments',
						action: 'Disable comments on media',
						description: 'Disable comments on an Instagram media object',
					},
					{
						name: 'Enable Comments',
						value: 'enableComments',
						action: 'Enable comments on media',
						description: 'Enable comments on an Instagram media object',
					},
					{
						name: 'Hide',
						value: 'hideComment',
						action: 'Hide a comment',
						description: 'Hide a comment from an Instagram media object',
					},
					{
						name: 'List',
						value: 'list',
						action: 'List comments',
						description: 'List comments on an Instagram media object',
					},
					{
						name: 'Send Private Reply',
						value: 'sendPrivateReply',
						action: 'Send a private reply',
						description: 'Send a private reply message to a commenter using the comment ID',
					},
					{
						name: 'Unhide',
						value: 'unhideComment',
						action: 'Unhide a comment',
						description: 'Unhide a previously hidden comment',
					},
				],
				default: 'list',
				required: true,
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['igUser'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get IG user',
						description: 'Get basic profile information for an Instagram Business or Creator account',
					},
					{
						name: 'Get Media',
						value: 'getMedia',
						action: 'Get media',
						description: 'List media objects owned by an Instagram Business or Creator account',
					},
				],
				default: 'get',
				required: true,
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['auth'],
					},
				},
				options: [
					{
						name: 'Exchange Access Token',
						value: 'exchangeAccessToken',
						action: 'Exchange short lived token',
						description:
							'Exchange a short-lived Instagram User access token for a long-lived token using the Instagram Platform access token endpoint',
					},
					{
						name: 'Get Me',
						value: 'getMe',
						action: 'Get me profile',
						description:
							'Call the Graph API /me endpoint using the access token from the Instagram API credential',
					},
					{
						name: 'Refresh Access Token',
						value: 'refreshAccessToken',
						action: 'Refresh access token',
						description:
							'Refresh a long-lived Instagram User access token using the Instagram Platform refresh endpoint',
					},
				],
				default: 'refreshAccessToken',
				required: true,
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['igHashtag'],
					},
				},
				options: [
					{
						name: 'Search',
						value: 'search',
						action: 'Search hashtags',
						description: 'Search for a hashtag by name and return its ID',
					},
					{
						name: 'Get Recent Media',
						value: 'getRecentMedia',
						action: 'Get recent media for hashtag',
						description: 'Get the most recent media tagged with a hashtag',
					},
					{
						name: 'Get Top Media',
						value: 'getTopMedia',
						action: 'Get top media for hashtag',
						description: 'Get the most popular media tagged with a hashtag',
					},
				],
				default: 'search',
				required: true,
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['messaging'],
					},
				},
				options: [
					{
						name: 'Send Message',
						value: 'sendMessage',
						action: 'Send direct message',
						description: 'Send a text message to an Instagram user via the Messaging API',
					},
				],
				default: 'sendMessage',
				required: true,
			},
			{
				displayName: 'Node',
				name: 'node',
				type: 'string',
				default: '',
				description:
					'The Instagram Business Account ID or User ID on which to publish the media, or the professional account that owns the commented media, or the IG User to read data for, or the IG User performing a hashtag or messaging query',
				placeholder: 'me',
				required: true,
				displayOptions: {
					show: {
						resource: ['image', 'reels', 'stories', 'comments', 'igUser', 'igHashtag', 'messaging'],
						operation: ['publish', 'sendPrivateReply', 'get', 'getMedia', 'search', 'getRecentMedia', 'getTopMedia', 'sendMessage'],
					},
				},
			},
			{
				displayName: 'Access Token',
				name: 'accessToken',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description:
					'The long-lived Instagram User access token to refresh. Leave empty to use the access token from the Instagram API credential.',
				displayOptions: {
					show: {
						resource: ['auth'],
						operation: ['refreshAccessToken'],
					},
				},
			},
			{
				displayName: 'Short-Lived Access Token',
				name: 'shortLivedAccessToken',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description:
					'The short-lived Instagram User access token to exchange for a long-lived token. This is usually obtained from the login flow.',
				required: true,
				displayOptions: {
					show: {
						resource: ['auth'],
						operation: ['exchangeAccessToken'],
					},
				},
			},
			{
				displayName: 'App Secret',
				name: 'appSecret',
				type: 'string',
				typeOptions: {
					password: true,
				},
				default: '',
				description:
					'Instagram App Secret from the Meta App Dashboard. Required to securely exchange a short-lived access token for a long-lived token.',
				required: true,
				displayOptions: {
					show: {
						resource: ['auth'],
						operation: ['exchangeAccessToken'],
					},
				},
			},
			{
				displayName: 'Graph API Version',
				name: 'graphApiVersion',
				type: 'string',
				default: 'v22.0',
				description: 'Facebook Graph API version to use when making requests, e.g. v22.0',
				required: true,
				displayOptions: {
					show: {
						resource: ['image', 'reels', 'stories', 'comments', 'igUser', 'igHashtag', 'auth', 'messaging'],
						operation: [
							'publish',
							'list',
							'hideComment',
							'unhideComment',
							'deleteComment',
							'disableComments',
							'enableComments',
							'get',
							'getMedia',
							'search',
							'getRecentMedia',
							'getTopMedia',
							'getMe',
							'sendMessage',
							'sendPrivateReply',
						],
					},
				},
			},
			{
				displayName: 'Return All',
				name: 'returnAll',
				type: 'boolean',
				default: false,
				description: 'Whether to return all results or only up to a given limit',
				displayOptions: {
					show: {
						resource: ['igUser', 'igHashtag'],
						operation: ['getMedia', 'getRecentMedia', 'getTopMedia'],
					},
				},
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
					maxValue: 500,
				},
				default: 50,
				description: 'Max number of results to return',
				displayOptions: {
					show: {
						resource: ['igUser', 'igHashtag'],
						operation: ['getMedia', 'getRecentMedia', 'getTopMedia'],
						returnAll: [false],
					},
				},
			},
			{
				displayName: 'Recipient IG User ID',
				name: 'recipientId',
				type: 'string',
				default: '',
				description:
					'The Instagram-scoped user ID (IGSID) of the recipient. This is provided in webhook events or other Messaging API responses.',
				required: true,
				displayOptions: {
					show: {
						resource: ['messaging'],
						operation: ['sendMessage'],
					},
				},
			},
			{
				displayName: 'Message Text',
				name: 'messageText',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'The text content of the direct message to send',
				required: true,
				displayOptions: {
					show: {
						resource: ['messaging'],
						operation: ['sendMessage'],
					},
				},
			},
			{
				displayName: 'Hashtag Name',
				name: 'hashtagName',
				type: 'string',
				default: '',
				description: 'The hashtag name to search for, without the # symbol',
				required: true,
				displayOptions: {
					show: {
						resource: ['igHashtag'],
						operation: ['search'],
					},
				},
			},
			{
				displayName: 'Hashtag ID',
				name: 'hashtagId',
				type: 'string',
				default: '',
				description: 'The IG Hashtag ID returned by the hashtag search',
				required: true,
				displayOptions: {
					show: {
						resource: ['igHashtag'],
						operation: ['getRecentMedia', 'getTopMedia'],
					},
				},
			},
			{
				displayName: 'Media ID',
				name: 'mediaId',
				type: 'string',
				default: '',
				description: 'The IG Media ID whose comments you want to manage',
				required: true,
				displayOptions: {
					show: {
						resource: ['comments'],
						operation: ['list', 'disableComments', 'enableComments'],
					},
				},
			},
			{
				displayName: 'Comment ID',
				name: 'commentId',
				type: 'string',
				default: '',
				description: 'The IG Comment ID you want to moderate',
				required: true,
				displayOptions: {
					show: {
						resource: ['comments'],
						operation: ['hideComment', 'unhideComment', 'deleteComment', 'sendPrivateReply'],
					},
				},
			},
			{
				displayName: 'Message',
				name: 'privateReplyText',
				type: 'string',
				typeOptions: {
					rows: 4,
				},
				default: '',
				description: 'The text of the private reply message',
				required: true,
				displayOptions: {
					show: {
						resource: ['comments'],
						operation: ['sendPrivateReply'],
					},
				},
			},
			...instagramResourceFields,
			{
				displayName: 'Caption',
				name: 'caption',
				type: 'string',
				default: '',
				description: 'The caption text for the Instagram post',
				required: true,
				displayOptions: {
					show: {
						resource: ['image', 'reels', 'stories'],
						operation: ['publish'],
					},
				},
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['image', 'reels', 'stories'],
						operation: ['publish'],
					},
				},
				options: [
					{
						displayName: 'Alt Text',
						name: 'altText',
						type: 'string',
						default: '',
						description: 'Alternative text for image posts (for accessibility). Image only; not supported for Reels or Stories.',
					},
					{
						displayName: 'Location ID',
						name: 'locationId',
						type: 'string',
						default: '',
						description:
							'Facebook Page ID for a location to tag. Use Pages Search API to find location pages. Image and Reels only; not supported for Stories.',
					},
					{
						displayName: 'User Tags',
						name: 'userTags',
						type: 'fixedCollection',
						typeOptions: {
							multipleValues: true,
						},
						placeholder: 'Add User Tag',
						default: {},
						description:
							'Users to tag in the media. username required; x and y coordinates (0–1) required for images, optional for stories. Supported for Image, Reels, and Stories.',
						options: [
							{
								displayName: 'Tag',
								name: 'tag',
								values: [
									{
										displayName: 'Username',
										name: 'username',
										type: 'string',
										default: '',
										description: 'Instagram username to tag (without @)',
										required: true,
									},
									{
										displayName: 'X Position',
										name: 'x',
										type: 'number',
										typeOptions: {
											minValue: 0,
											maxValue: 1,
											numberStepSize: 0.01,
										},
										default: 0.5,
										description:
											'Horizontal position (0–1). Required for images, optional for stories. 0 = left edge, 1 = right edge',
									},
									{
										displayName: 'Y Position',
										name: 'y',
										type: 'number',
										typeOptions: {
											minValue: 0,
											maxValue: 1,
											numberStepSize: 0.01,
										},
										default: 0.5,
										description:
											'Vertical position (0–1). Required for images, optional for stories. 0 = top edge, 1 = bottom edge',
									},
								],
							},
						],
					},
					{
						displayName: 'Product Tags',
						name: 'productTags',
						type: 'fixedCollection',
						typeOptions: {
							multipleValues: true,
						},
						placeholder: 'Add Product Tag',
						default: {},
						description:
							'Products to tag in the media. product_id required; x and y coordinates (0–1) optional. Image and Reels only; not supported for Stories. Max 5 tags.',
						options: [
							{
								displayName: 'Tag',
								name: 'tag',
								values: [
									{
										displayName: 'Product ID',
										name: 'product_id',
										type: 'string',
										default: '',
										description: 'Product ID from your catalog',
										required: true,
									},
									{
										displayName: 'X Position',
										name: 'x',
										type: 'number',
										typeOptions: {
											minValue: 0,
											maxValue: 1,
											numberStepSize: 0.01,
										},
										default: 0.5,
										description:
											'Horizontal position (0–1). Optional. 0 = left edge, 1 = right edge',
									},
									{
										displayName: 'Y Position',
										name: 'y',
										type: 'number',
										typeOptions: {
											minValue: 0,
											maxValue: 1,
											numberStepSize: 0.01,
										},
										default: 0.5,
										description:
											'Vertical position (0–1). Optional. 0 = top edge, 1 = bottom edge',
									},
								],
							},
						],
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnItems: INodeExecutionData[] = [];

		const hostUrl = 'graph.facebook.com';

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
				const resource = this.getNodeParameter('resource', itemIndex) as string;
				const operation = this.getNodeParameter('operation', itemIndex) as string;

				if (resource === 'messaging') {
					const graphApiVersion = this.getNodeParameter('graphApiVersion', itemIndex) as string;
					const accountId = this.getNodeParameter('node', itemIndex) as string;

					try {
						if (operation === 'sendMessage') {
							const recipientId = this.getNodeParameter('recipientId', itemIndex) as string;
							const text = this.getNodeParameter('messageText', itemIndex) as string;

							const url = `https://${hostUrl}/${graphApiVersion}/${accountId}/messages`;

							const requestOptions: IHttpRequestOptions = {
								headers: {
									accept: 'application/json,text/*;q=0.99',
									'Content-Type': 'application/json',
								},
								method: 'POST',
								url,
								body: {
									recipient: {
										id: recipientId,
									},
									message: {
										text,
									},
								},
								json: true,
							};

							const response = (await this.helpers.httpRequestWithAuthentication.call(
								this,
								'instagramApi',
								requestOptions,
							)) as IDataObject;

							returnItems.push({ json: response, pairedItem: { item: itemIndex } });
							continue;
						}

						throw new NodeOperationError(
							this.getNode(),
							`Unsupported messaging operation: ${operation}`,
							{ itemIndex },
						);
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
						continue;
					}
				}

				if (resource === 'auth') {
					try {
						if (operation === 'refreshAccessToken') {
							let token =
								(this.getNodeParameter('accessToken', itemIndex, '') as string | undefined) ?? '';

							if (!token) {
								const credentials = (await this.getCredentials('instagramApi')) as
									| {
											accessToken?: string;
									  }
									| null;

								token = credentials?.accessToken ?? '';
							}

							if (!token) {
								throw new NodeOperationError(
									this.getNode(),
									'No access token provided and no access token found in the Instagram API credential.',
									{ itemIndex },
								);
							}

							const url = 'https://graph.instagram.com/refresh_access_token';
							const requestOptions: IHttpRequestOptions = {
								headers: {
									accept: 'application/json,text/*;q=0.99',
								},
								method: 'GET',
								url,
								qs: {
									grant_type: 'ig_refresh_token',
									access_token: token,
								},
								json: true,
							};

							const response = (await this.helpers.httpRequest.call(
								this,
								requestOptions,
							)) as IDataObject;

							returnItems.push({ json: response, pairedItem: { item: itemIndex } });
							continue;
						}

						if (operation === 'exchangeAccessToken') {
							const shortLivedToken = this.getNodeParameter(
								'shortLivedAccessToken',
								itemIndex,
							) as string;
							const appSecret = this.getNodeParameter('appSecret', itemIndex) as string;

							const url = 'https://graph.instagram.com/access_token';
							const requestOptions: IHttpRequestOptions = {
								headers: {
									accept: 'application/json,text/*;q=0.99',
								},
								method: 'GET',
								url,
								qs: {
									grant_type: 'ig_exchange_token',
									client_secret: appSecret,
									access_token: shortLivedToken,
								},
								json: true,
							};

							const response = (await this.helpers.httpRequest.call(
								this,
								requestOptions,
							)) as IDataObject;

							returnItems.push({ json: response, pairedItem: { item: itemIndex } });
							continue;
						}

						if (operation === 'getMe') {
							// Use a fixed versioned /me endpoint so this operation
							// does not depend on any node parameters that may be
							// missing in older saved workflows or older node versions.
							const url = 'https://graph.facebook.com/v22.0/me';
							const requestOptions: IHttpRequestOptions = {
								headers: {
									accept: 'application/json,text/*;q=0.99',
								},
								method: 'GET',
								url,
								json: true,
							};

							const response = (await this.helpers.httpRequestWithAuthentication.call(
								this,
								'instagramApi',
								requestOptions,
							)) as IDataObject;

							returnItems.push({ json: response, pairedItem: { item: itemIndex } });
							continue;
						}

						throw new NodeOperationError(
							this.getNode(),
							`Unsupported auth operation: ${operation}`,
							{ itemIndex },
						);
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
						continue;
					}
				}

				if (resource === 'igHashtag') {
					const graphApiVersion = this.getNodeParameter('graphApiVersion', itemIndex) as string;
					const accountId = this.getNodeParameter('node', itemIndex) as string;

					try {
						if (operation === 'search') {
							const hashtagName = this.getNodeParameter('hashtagName', itemIndex) as string;

							const url = `https://${hostUrl}/${graphApiVersion}/ig_hashtag_search`;
							const requestOptions: IHttpRequestOptions = {
								headers: {
									accept: 'application/json,text/*;q=0.99',
								},
								method: 'GET',
								url,
								qs: {
									user_id: accountId,
									q: hashtagName,
								},
								json: true,
							};

							const response = (await this.helpers.httpRequestWithAuthentication.call(
								this,
								'instagramApi',
								requestOptions,
							)) as IDataObject;

							returnItems.push({ json: response, pairedItem: { item: itemIndex } });
							continue;
						}

						if (operation === 'getRecentMedia' || operation === 'getTopMedia') {
							const hashtagId = this.getNodeParameter('hashtagId', itemIndex) as string;
							const returnAll = this.getNodeParameter('returnAll', itemIndex, false) as boolean;
							const limit = this.getNodeParameter('limit', itemIndex, 0) as number;

							const edge = operation === 'getRecentMedia' ? 'recent_media' : 'top_media';
							const baseUrl = `https://${hostUrl}/${graphApiVersion}/${hashtagId}/${edge}`;

							const fields = [
								'id',
								'media_type',
								'media_url',
								'caption',
								'permalink',
								'timestamp',
								'comments_count',
								'like_count',
							].join(',');

							const accumulated: IDataObject[] = [];
							let after: string | undefined;

							// Basic safety limit to avoid infinite loops when returnAll is true
							const hardCap = returnAll ? 5000 : limit;

							let hasMore = true;
							while (hasMore) {
								const remaining = returnAll ? undefined : hardCap - accumulated.length;
								const pageLimit = remaining !== undefined ? Math.min(remaining, 50) : 50;

								const qs: IDataObject = {
									user_id: accountId,
									fields,
									limit: pageLimit,
								};

								if (after) {
									qs.after = after;
								}

								const requestOptions: IHttpRequestOptions = {
									headers: {
										accept: 'application/json,text/*;q=0.99',
									},
									method: 'GET',
									url: baseUrl,
									qs,
									json: true,
								};

								const response = (await this.helpers.httpRequestWithAuthentication.call(
									this,
									'instagramApi',
									requestOptions,
								)) as IDataObject;

								const pageData = (response.data as IDataObject[] | undefined) ?? [];
								accumulated.push(...pageData);

								const paging = response.paging as
									| {
											cursors?: { after?: string };
									  }
									| undefined;
								after = paging?.cursors?.after;

								if ((!returnAll && accumulated.length >= hardCap) || !after) {
									hasMore = false;
								}
							}

							const finalData = !returnAll && hardCap > 0 ? accumulated.slice(0, hardCap) : accumulated;

							returnItems.push({ json: { data: finalData }, pairedItem: { item: itemIndex } });
							continue;
						}

						throw new NodeOperationError(
							this.getNode(),
							`Unsupported IG Hashtag operation: ${operation}`,
							{ itemIndex },
						);
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
						continue;
					}
				}

				if (resource === 'igUser') {
					const graphApiVersion = this.getNodeParameter('graphApiVersion', itemIndex) as string;
					const accountId = this.getNodeParameter('node', itemIndex) as string;

					try {
						if (operation === 'get') {
							const url = `https://${hostUrl}/${graphApiVersion}/${accountId}`;
							const requestOptions: IHttpRequestOptions = {
								headers: {
									accept: 'application/json,text/*;q=0.99',
								},
								method: 'GET',
								url,
								qs: {
									fields: [
										'id',
										'username',
										'name',
										'biography',
										'website',
										'media_count',
										'followers_count',
										'follows_count',
										'profile_picture_url',
									].join(','),
								},
								json: true,
							};

							const response = (await this.helpers.httpRequestWithAuthentication.call(
								this,
								'instagramApi',
								requestOptions,
							)) as IDataObject;

							returnItems.push({ json: response, pairedItem: { item: itemIndex } });
							continue;
						}

						if (operation === 'getMedia') {
							const returnAll = this.getNodeParameter('returnAll', itemIndex, false) as boolean;
							const limit = this.getNodeParameter('limit', itemIndex, 0) as number;

							const baseUrl = `https://${hostUrl}/${graphApiVersion}/${accountId}/media`;
							const fields = [
								'id',
								'media_type',
								'media_url',
								'thumbnail_url',
								'caption',
								'permalink',
								'timestamp',
								'username',
							].join(',');

							const accumulated: IDataObject[] = [];
							let after: string | undefined;

							// Basic safety limit to avoid infinite loops when returnAll is true
							const hardCap = returnAll ? 5000 : limit;

							let hasMore = true;
							while (hasMore) {
								const remaining = returnAll ? undefined : hardCap - accumulated.length;
								const pageLimit = remaining !== undefined ? Math.min(remaining, 100) : 100;

								const qs: IDataObject = {
									fields,
									limit: pageLimit,
								};

								if (after) {
									qs.after = after;
								}

								const requestOptions: IHttpRequestOptions = {
									headers: {
										accept: 'application/json,text/*;q=0.99',
									},
									method: 'GET',
									url: baseUrl,
									qs,
									json: true,
								};

								const response = (await this.helpers.httpRequestWithAuthentication.call(
									this,
									'instagramApi',
									requestOptions,
								)) as IDataObject;

								const pageData = (response.data as IDataObject[] | undefined) ?? [];
								accumulated.push(...pageData);

								const paging = response.paging as
									| {
											cursors?: { after?: string };
									  }
									| undefined;
								after = paging?.cursors?.after;

								if ((!returnAll && accumulated.length >= hardCap) || !after) {
									hasMore = false;
								}
							}

							// Trim just in case we fetched over the requested limit
							const finalData = !returnAll && hardCap > 0 ? accumulated.slice(0, hardCap) : accumulated;

							returnItems.push({ json: { data: finalData }, pairedItem: { item: itemIndex } });
							continue;
						}

						throw new NodeOperationError(
							this.getNode(),
							`Unsupported IG User operation: ${operation}`,
							{ itemIndex },
						);
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
						continue;
					}
				}

				if (resource === 'comments') {
					const graphApiVersion = this.getNodeParameter('graphApiVersion', itemIndex) as string;

					try {
						if (operation === 'list') {
							const mediaId = this.getNodeParameter('mediaId', itemIndex) as string;

							const url = `https://${hostUrl}/${graphApiVersion}/${mediaId}/comments`;
							const requestOptions: IHttpRequestOptions = {
								headers: {
									accept: 'application/json,text/*;q=0.99',
								},
								method: 'GET',
								url,
								json: true,
							};

							const response = (await this.helpers.httpRequestWithAuthentication.call(
								this,
								'instagramApi',
								requestOptions,
							)) as IDataObject;

							returnItems.push({ json: response, pairedItem: { item: itemIndex } });
							continue;
						}

						if (operation === 'hideComment' || operation === 'unhideComment') {
							const commentId = this.getNodeParameter('commentId', itemIndex) as string;
							const hideValue = operation === 'hideComment';
							const url = `https://${hostUrl}/${graphApiVersion}/${commentId}`;

							const requestOptions: IHttpRequestOptions = {
								headers: {
									accept: 'application/json,text/*;q=0.99',
								},
								method: 'POST',
								url,
								qs: {
									hide: hideValue,
								},
								json: true,
							};

							const response = (await this.helpers.httpRequestWithAuthentication.call(
								this,
								'instagramApi',
								requestOptions,
							)) as IDataObject;

							returnItems.push({ json: response, pairedItem: { item: itemIndex } });
							continue;
						}

						if (operation === 'deleteComment') {
							const commentId = this.getNodeParameter('commentId', itemIndex) as string;
							const url = `https://${hostUrl}/${graphApiVersion}/${commentId}`;

							const requestOptions: IHttpRequestOptions = {
								headers: {
									accept: 'application/json,text/*;q=0.99',
								},
								method: 'DELETE',
								url,
								json: true,
							};

							const response = (await this.helpers.httpRequestWithAuthentication.call(
								this,
								'instagramApi',
								requestOptions,
							)) as IDataObject;

							returnItems.push({ json: response, pairedItem: { item: itemIndex } });
							continue;
						}

						if (operation === 'disableComments' || operation === 'enableComments') {
							const mediaId = this.getNodeParameter('mediaId', itemIndex) as string;
							const commentEnabled = operation === 'enableComments';
							const url = `https://${hostUrl}/${graphApiVersion}/${mediaId}`;

							const requestOptions: IHttpRequestOptions = {
								headers: {
									accept: 'application/json,text/*;q=0.99',
								},
								method: 'POST',
								url,
								qs: {
									comment_enabled: commentEnabled,
								},
								json: true,
							};

							const response = (await this.helpers.httpRequestWithAuthentication.call(
								this,
								'instagramApi',
								requestOptions,
							)) as IDataObject;

							returnItems.push({ json: response, pairedItem: { item: itemIndex } });
							continue;
						}

						if (operation === 'sendPrivateReply') {
							const accountId = this.getNodeParameter('node', itemIndex) as string;
							const commentId = this.getNodeParameter('commentId', itemIndex) as string;
							const text = this.getNodeParameter('privateReplyText', itemIndex) as string;

							const url = `https://${hostUrl}/${graphApiVersion}/${accountId}/messages`;

							const requestOptions: IHttpRequestOptions = {
								headers: {
									accept: 'application/json,text/*;q=0.99',
									'Content-Type': 'application/json',
								},
								method: 'POST',
								url,
								body: {
									recipient: {
										comment_id: commentId,
									},
									message: {
										text,
									},
								},
								json: true,
							};

							const response = (await this.helpers.httpRequestWithAuthentication.call(
								this,
								'instagramApi',
								requestOptions,
							)) as IDataObject;

							returnItems.push({ json: response, pairedItem: { item: itemIndex } });
							continue;
						}

						throw new NodeOperationError(
							this.getNode(),
							`Unsupported comments operation: ${operation}`,
							{ itemIndex },
						);
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
						continue;
					}
				}

				if (operation !== 'publish') {
					throw new NodeOperationError(this.getNode(), `Unsupported operation: ${operation}`, {
						itemIndex,
					});
				}

				const handler = instagramResourceHandlers[resource as InstagramResourceType];
				if (!handler) {
					throw new NodeOperationError(this.getNode(), `Unsupported resource: ${resource}`, {
						itemIndex,
					});
				}
				const node = this.getNodeParameter('node', itemIndex) as string;
				const graphApiVersion = this.getNodeParameter('graphApiVersion', itemIndex) as string;
				const caption = this.getNodeParameter('caption', itemIndex) as string;
				const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {}) as IDataObject;
				const altText = (additionalFields.altText as string) ?? '';
				const rawLocationId = additionalFields.locationId as string | undefined;
				const userTagsCollection = additionalFields.userTags as
					| { tag?: Array<{ username: string; x?: number; y?: number }> }
					| undefined;
				const productTagsCollection = additionalFields.productTags as
					| { tag?: Array<{ product_id: string; x?: number; y?: number }> }
					| undefined;

				// Graph host remains static; version is configurable by the user
				const httpRequestMethod = 'POST';

				// First request: Create media container
				const mediaUri = `https://${hostUrl}/${graphApiVersion}/${node}/media`;
				const mediaPayload = handler.buildMediaPayload.call(this, itemIndex);
				const mediaQs: IDataObject = {
					caption,
					...mediaPayload,
				};

				if (altText) {
					mediaQs.alt_text = altText;
				}
				const locationId = rawLocationId?.trim();
				if (locationId) {
					mediaQs.location_id = locationId;
				}
				if (userTagsCollection?.tag && Array.isArray(userTagsCollection.tag) && userTagsCollection.tag.length > 0) {
					const userTags = userTagsCollection.tag
						.filter((tag) => tag.username)
						.map((tag) => {
							const tagObj: IDataObject = {
								username: tag.username,
							};
							if (tag.x !== undefined && tag.x !== null) {
								tagObj.x = tag.x;
							}
							if (tag.y !== undefined && tag.y !== null) {
								tagObj.y = tag.y;
							}
							return tagObj;
						});
					if (userTags.length > 0) {
						mediaQs.user_tags = JSON.stringify(userTags);
					}
				}
				if (
					productTagsCollection?.tag &&
					Array.isArray(productTagsCollection.tag) &&
					productTagsCollection.tag.length > 0
				) {
					const productTags = productTagsCollection.tag
						.filter((tag) => tag.product_id)
						.map((tag) => {
							const tagObj: IDataObject = {
								product_id: tag.product_id,
							};
							if (tag.x !== undefined && tag.x !== null) {
								tagObj.x = tag.x;
							}
							if (tag.y !== undefined && tag.y !== null) {
								tagObj.y = tag.y;
							}
							return tagObj;
						});
					if (productTags.length > 0) {
						mediaQs.product_tags = JSON.stringify(productTags);
					}
				}

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
