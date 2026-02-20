"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instagram = void 0;
const n8n_workflow_1 = require("n8n-workflow");
const resources_1 = require("./resources");
const READY_STATUSES = new Set(['FINISHED', 'PUBLISHED', 'READY']);
const ERROR_STATUSES = new Set(['ERROR', 'FAILED']);
class Instagram {
    constructor() {
        this.description = {
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
            inputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
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
                            name: 'Carousel',
                            value: 'carousel',
                            description: 'Publish a carousel (album) post with up to 10 images or videos',
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
                            name: 'Page',
                            value: 'page',
                            description: 'Work with the connected Facebook Page and its Instagram account',
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
                            description: 'Publish the selected media type (image, reel, or story) to Instagram',
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
                            resource: ['page'],
                        },
                    },
                    options: [
                        {
                            name: 'Get Instagram Account',
                            value: 'getInstagramAccount',
                            action: 'Get instagram account',
                            description: 'Get the Instagram business/creator account connected to a Facebook Page',
                        },
                    ],
                    default: 'getInstagramAccount',
                    required: true,
                },
                {
                    displayName: 'Operation',
                    name: 'operation',
                    type: 'options',
                    noDataExpression: true,
                    displayOptions: {
                        show: {
                            resource: ['carousel'],
                        },
                    },
                    options: [
                        {
                            name: 'Publish',
                            value: 'publish',
                            action: 'Publish',
                            description: 'Publish a carousel (album) post with up to 10 images or videos',
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
                            description: 'Exchange a short-lived Instagram User access token for a long-lived token using the Instagram Platform access token endpoint',
                        },
                        {
                            name: 'Get Me',
                            value: 'getMe',
                            action: 'Get me profile',
                            description: 'Call the Graph API /me endpoint using the access token from the Instagram API credential',
                        },
                        {
                            name: 'Refresh Access Token',
                            value: 'refreshAccessToken',
                            action: 'Refresh access token',
                            description: 'Refresh a long-lived Instagram User access token using the Instagram Platform refresh endpoint',
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
                    description: 'The Instagram Business Account ID or User ID on which to publish the media, or the professional account that owns the commented media, or the IG User to read data for, or the IG User performing a hashtag or messaging query',
                    placeholder: 'me',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['image', 'reels', 'stories', 'carousel', 'comments', 'igUser', 'igHashtag', 'messaging'],
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
                    description: 'The long-lived Instagram User access token to refresh. Leave empty to use the access token from the Instagram API credential.',
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
                    description: 'The short-lived Instagram User access token to exchange for a long-lived token. This is usually obtained from the login flow.',
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
                    description: 'Instagram App Secret from the Meta App Dashboard. Required to securely exchange a short-lived access token for a long-lived token.',
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
                            resource: ['image', 'reels', 'stories', 'carousel', 'comments', 'igUser', 'igHashtag', 'auth', 'messaging', 'page'],
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
                                'getInstagramAccount',
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
                    description: 'The Instagram-scoped user ID (IGSID) of the recipient. This is provided in webhook events or other Messaging API responses.',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['messaging'],
                            operation: ['sendMessage'],
                        },
                    },
                },
                {
                    displayName: 'Page ID',
                    name: 'pageId',
                    type: 'string',
                    default: '',
                    description: 'The Facebook Page ID that is connected to an Instagram business or creator account',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['page'],
                            operation: ['getInstagramAccount'],
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
                ...resources_1.instagramResourceFields,
                {
                    displayName: 'Caption',
                    name: 'caption',
                    type: 'string',
                    default: '',
                    description: 'The caption text for the Instagram post',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['image', 'reels', 'stories', 'carousel'],
                            operation: ['publish'],
                        },
                    },
                },
                {
                    displayName: 'Carousel Media',
                    name: 'carouselMedia',
                    type: 'fixedCollection',
                    typeOptions: {
                        multipleValues: true,
                        minValue: 2,
                        maxValue: 10,
                    },
                    default: { mediaItem: [] },
                    placeholder: 'Add media item',
                    description: 'Up to 10 images or videos for the carousel. Order is preserved.',
                    displayOptions: {
                        show: {
                            resource: ['carousel'],
                            operation: ['publish'],
                        },
                    },
                    options: [
                        {
                            displayName: 'Media Item',
                            name: 'mediaItem',
                            values: [
                                {
                                    displayName: 'Media Type',
                                    name: 'mediaType',
                                    type: 'options',
                                    default: 'image',
                                    options: [
                                        { name: 'Image', value: 'image' },
                                        { name: 'Video', value: 'video' },
                                    ],
                                },
                                {
                                    displayName: 'Image URL',
                                    name: 'imageUrl',
                                    type: 'string',
                                    default: '',
                                    description: 'URL of the image. Required when Media Type is Image.',
                                    displayOptions: {
                                        show: { mediaType: ['image'] },
                                    },
                                },
                                {
                                    displayName: 'Video URL',
                                    name: 'videoUrl',
                                    type: 'string',
                                    default: '',
                                    description: 'URL of the video. Required when Media Type is Video.',
                                    displayOptions: {
                                        show: { mediaType: ['video'] },
                                    },
                                },
                            ],
                        },
                    ],
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
                            description: 'Facebook Page ID for a location to tag. Use Pages Search API to find location pages. Image and Reels only; not supported for Stories.',
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
                            description: 'Products to tag in the media. product_id required; x and y coordinates (0–1) optional. Image and Reels only; not supported for Stories. Max 5 tags.',
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
                                            description: 'Horizontal position (0–1). Optional. 0 = left edge, 1 = right edge',
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
                                            description: 'Vertical position (0–1). Optional. 0 = top edge, 1 = bottom edge',
                                        },
                                    ],
                                },
                            ],
                        },
                        {
                            displayName: 'Trial Reel - Graduation Strategy',
                            name: 'trialReelGraduationStrategy',
                            type: 'options',
                            default: 'MANUAL',
                            description: 'Configure Trial Reels graduation strategy. Applies only to Reels; ignored for Images and Stories.',
                            options: [
                                {
                                    name: 'Manual',
                                    value: 'MANUAL',
                                    description: 'You manually decide in the Instagram app when (or if) to graduate the trial reel',
                                },
                                {
                                    name: 'Performance-Based (SS_PERFORMANCE)',
                                    value: 'SS_PERFORMANCE',
                                    description: 'Instagram automatically graduates the trial reel if it performs well with non-followers',
                                },
                            ],
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
                            description: 'Users to tag in the media. username required; x and y coordinates (0–1) required for images, optional for stories. Supported for Image, Reels, and Stories.',
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
                                            description: 'Horizontal position (0–1). Required for images, optional for stories. 0 = left edge, 1 = right edge',
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
                                            description: 'Vertical position (0–1). Required for images, optional for stories. 0 = top edge, 1 = bottom edge',
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        };
    }
    async execute() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10;
        const items = this.getInputData();
        const returnItems = [];
        const hostUrl = 'graph.facebook.com';
        const waitForContainerReady = async ({ creationId, hostUrl, graphApiVersion, itemIndex, pollIntervalMs, maxPollAttempts, }) => {
            if (!creationId || typeof creationId !== 'string') {
                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid creation ID provided: ${creationId}. Creation ID must be a non-empty string.`, { itemIndex });
            }
            if (!graphApiVersion || typeof graphApiVersion !== 'string') {
                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid Graph API version provided: ${graphApiVersion}. Graph API version must be a non-empty string.`, { itemIndex });
            }
            const statusUri = `https://${hostUrl}/${graphApiVersion}/${creationId}`;
            const statusFields = ['status_code', 'status'];
            const pollRequestOptions = {
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
            let lastStatus;
            let lastError;
            let consecutiveErrors = 0;
            const maxConsecutiveErrors = 3;
            const startTime = Date.now();
            const maxTotalTimeMs = 90000;
            for (let attempt = 1; attempt <= maxPollAttempts; attempt++) {
                const elapsedTime = Date.now() - startTime;
                if (elapsedTime > maxTotalTimeMs) {
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Polling timeout: Exceeded maximum polling time of ${maxTotalTimeMs / 1000} seconds. Container ID: ${creationId}, Last known status: ${lastStatus !== null && lastStatus !== void 0 ? lastStatus : 'unknown'}, Attempts: ${attempt}/${maxPollAttempts}.`, { itemIndex });
                }
                try {
                    const statusResponse = (await this.helpers.httpRequestWithAuthentication.call(this, 'instagramApi', pollRequestOptions));
                    if (!statusResponse || typeof statusResponse !== 'object') {
                        consecutiveErrors++;
                        if (consecutiveErrors >= maxConsecutiveErrors) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid response format received while polling container status (${consecutiveErrors} consecutive errors). Expected object, got: ${typeof statusResponse}. Response: ${JSON.stringify(statusResponse)}. Container ID: ${creationId}.`, { itemIndex });
                        }
                        const errorInterval = Math.min(pollIntervalMs, 1000);
                        await (0, n8n_workflow_1.sleep)(errorInterval);
                        continue;
                    }
                    consecutiveErrors = 0;
                    const statuses = statusFields
                        .map((field) => statusResponse[field])
                        .filter((value) => typeof value === 'string')
                        .map((value) => value.toUpperCase());
                    if (statuses.length > 0) {
                        lastStatus = statuses[0];
                    }
                    if (statuses.some((status) => READY_STATUSES.has(status))) {
                        return;
                    }
                    if (statuses.some((status) => ERROR_STATUSES.has(status))) {
                        const errorMessage = statusResponse.error_message;
                        const errorDetails = errorMessage
                            ? ` Error details: ${errorMessage}`
                            : '';
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Media container reported error status (${statuses.join(', ')}) while waiting to publish. Container ID: ${creationId}, Attempt: ${attempt}/${maxPollAttempts}.${errorDetails}`, { itemIndex });
                    }
                    let effectiveInterval;
                    if (attempt <= 10) {
                        effectiveInterval = 500;
                    }
                    else if (attempt <= 20) {
                        effectiveInterval = 1000;
                    }
                    else {
                        effectiveInterval = pollIntervalMs;
                    }
                    await (0, n8n_workflow_1.sleep)(effectiveInterval);
                }
                catch (error) {
                    lastError = error;
                    consecutiveErrors++;
                    if (error instanceof n8n_workflow_1.NodeOperationError) {
                        throw error;
                    }
                    const errorMessage = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase();
                    if (errorMessage.includes('invalid') ||
                        errorMessage.includes('not found') ||
                        errorMessage.includes('404') ||
                        errorMessage.includes('does not exist') ||
                        (consecutiveErrors >= maxConsecutiveErrors)) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to poll container status after ${attempt} attempts (${consecutiveErrors} consecutive errors). Container may be invalid or failed. Last error: ${error instanceof Error ? error.message : String(error)}. Container ID: ${creationId}, Last known status: ${lastStatus !== null && lastStatus !== void 0 ? lastStatus : 'unknown'}.`, { itemIndex });
                    }
                    if (attempt < maxPollAttempts) {
                        const errorInterval = Math.min(pollIntervalMs, 1000);
                        await (0, n8n_workflow_1.sleep)(errorInterval);
                        continue;
                    }
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to poll container status after ${maxPollAttempts} attempts. Last error: ${error instanceof Error ? error.message : String(error)}. Container ID: ${creationId}, Last known status: ${lastStatus !== null && lastStatus !== void 0 ? lastStatus : 'unknown'}.`, { itemIndex });
                }
            }
            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Timed out waiting for container to become ready after ${maxPollAttempts} attempts. Last known status: ${lastStatus !== null && lastStatus !== void 0 ? lastStatus : 'unknown'}. Container ID: ${creationId}. Last error: ${lastError instanceof Error ? lastError.message : lastError ? String(lastError) : 'none'}.`, { itemIndex });
        };
        const isMediaNotReadyError = (error) => {
            var _a, _b, _c, _d;
            const errorWithGraph = error;
            const graphError = (_b = (_a = errorWithGraph === null || errorWithGraph === void 0 ? void 0 : errorWithGraph.response) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.error;
            if (!graphError)
                return false;
            const message = (_d = (_c = graphError.message) === null || _c === void 0 ? void 0 : _c.toLowerCase()) !== null && _d !== void 0 ? _d : '';
            const code = graphError.code;
            const subcode = graphError.error_subcode;
            return (message.includes('not ready') ||
                message.includes('not finished') ||
                message.includes('not yet') ||
                code === 900 ||
                subcode === 2207055);
        };
        for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            try {
                let resource;
                let operation;
                try {
                    resource = this.getNodeParameter('resource', itemIndex);
                    if (!resource || typeof resource !== 'string') {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing resource parameter at item index ${itemIndex}. Resource must be a non-empty string.`, { itemIndex });
                    }
                }
                catch (error) {
                    if (error instanceof n8n_workflow_1.NodeOperationError) {
                        throw error;
                    }
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get resource parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                }
                try {
                    operation = this.getNodeParameter('operation', itemIndex);
                    if (!operation || typeof operation !== 'string') {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing operation parameter at item index ${itemIndex}. Operation must be a non-empty string.`, { itemIndex });
                    }
                }
                catch (error) {
                    if (error instanceof n8n_workflow_1.NodeOperationError) {
                        throw error;
                    }
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get operation parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                }
                if (resource === 'messaging') {
                    let graphApiVersion;
                    let accountId;
                    try {
                        graphApiVersion = this.getNodeParameter('graphApiVersion', itemIndex);
                        if (!graphApiVersion || typeof graphApiVersion !== 'string') {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing Graph API version parameter at item index ${itemIndex}. Graph API version must be a non-empty string (e.g., 'v22.0').`, { itemIndex });
                        }
                    }
                    catch (error) {
                        if (error instanceof n8n_workflow_1.NodeOperationError) {
                            throw error;
                        }
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get Graph API version parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                    }
                    try {
                        accountId = this.getNodeParameter('node', itemIndex);
                        if (!accountId || typeof accountId !== 'string') {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing account ID (node) parameter at item index ${itemIndex}. Account ID must be a non-empty string.`, { itemIndex });
                        }
                    }
                    catch (error) {
                        if (error instanceof n8n_workflow_1.NodeOperationError) {
                            throw error;
                        }
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get account ID (node) parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                    }
                    try {
                        if (operation === 'sendMessage') {
                            let recipientId;
                            let text;
                            try {
                                recipientId = this.getNodeParameter('recipientId', itemIndex);
                                if (!recipientId || typeof recipientId !== 'string') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing recipient ID parameter at item index ${itemIndex}. Recipient ID must be a non-empty string.`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get recipient ID parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            try {
                                text = this.getNodeParameter('messageText', itemIndex);
                                if (!text || typeof text !== 'string') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing message text parameter at item index ${itemIndex}. Message text must be a non-empty string.`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get message text parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            const url = `https://${hostUrl}/${graphApiVersion}/${accountId}/messages`;
                            const requestOptions = {
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
                            let response;
                            try {
                                response = (await this.helpers.httpRequestWithAuthentication.call(this, 'instagramApi', requestOptions));
                                if (!response || typeof response !== 'object') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid response format received from send message API. Expected object, got: ${typeof response}. Response: ${JSON.stringify(response)}`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to send message via Instagram Messaging API. Account ID: ${accountId}, Recipient ID: ${recipientId}. Error: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            returnItems.push({ json: response, pairedItem: { item: itemIndex } });
                            continue;
                        }
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Unsupported messaging operation: ${operation}`, { itemIndex });
                    }
                    catch (error) {
                        if (!this.continueOnFail()) {
                            throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                        }
                        let errorItem;
                        const errorWithGraph = error;
                        if (errorWithGraph.response !== undefined) {
                            const graphApiErrors = (_b = (_a = errorWithGraph.response.body) === null || _a === void 0 ? void 0 : _a.error) !== null && _b !== void 0 ? _b : {};
                            errorItem = {
                                statusCode: errorWithGraph.statusCode,
                                ...graphApiErrors,
                                headers: errorWithGraph.response.headers,
                            };
                        }
                        else {
                            errorItem = error;
                        }
                        returnItems.push({ json: { ...errorItem }, pairedItem: { item: itemIndex } });
                        continue;
                    }
                }
                if (resource === 'auth') {
                    try {
                        if (operation === 'refreshAccessToken') {
                            let token = (_c = this.getNodeParameter('accessToken', itemIndex, '')) !== null && _c !== void 0 ? _c : '';
                            if (!token) {
                                let credentials;
                                try {
                                    credentials = (await this.getCredentials('instagramApi'));
                                }
                                catch (error) {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to retrieve Instagram API credentials: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                                }
                                if (!credentials) {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Instagram API credentials not found. Please configure the Instagram API credential.', { itemIndex });
                                }
                                token = (_d = credentials === null || credentials === void 0 ? void 0 : credentials.accessToken) !== null && _d !== void 0 ? _d : '';
                            }
                            if (!token || typeof token !== 'string') {
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'No access token provided and no access token found in the Instagram API credential. Please provide an access token or configure it in the credential.', { itemIndex });
                            }
                            const url = 'https://graph.instagram.com/refresh_access_token';
                            const requestOptions = {
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
                            let response;
                            try {
                                response = (await this.helpers.httpRequest.call(this, requestOptions));
                                if (!response || typeof response !== 'object') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid response format received from refresh access token API. Expected object, got: ${typeof response}. Response: ${JSON.stringify(response)}`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to refresh access token: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            returnItems.push({ json: response, pairedItem: { item: itemIndex } });
                            continue;
                        }
                        if (operation === 'exchangeAccessToken') {
                            let shortLivedToken;
                            let appSecret;
                            try {
                                shortLivedToken = this.getNodeParameter('shortLivedAccessToken', itemIndex);
                                if (!shortLivedToken || typeof shortLivedToken !== 'string') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing short-lived access token parameter at item index ${itemIndex}. Short-lived access token must be a non-empty string.`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get short-lived access token parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            try {
                                appSecret = this.getNodeParameter('appSecret', itemIndex);
                                if (!appSecret || typeof appSecret !== 'string') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing app secret parameter at item index ${itemIndex}. App secret must be a non-empty string.`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get app secret parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            const url = 'https://graph.instagram.com/access_token';
                            const requestOptions = {
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
                            let response;
                            try {
                                response = (await this.helpers.httpRequest.call(this, requestOptions));
                                if (!response || typeof response !== 'object') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid response format received from exchange access token API. Expected object, got: ${typeof response}. Response: ${JSON.stringify(response)}`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to exchange access token: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            returnItems.push({ json: response, pairedItem: { item: itemIndex } });
                            continue;
                        }
                        if (operation === 'getMe') {
                            const url = 'https://graph.facebook.com/v22.0/me';
                            const requestOptions = {
                                headers: {
                                    accept: 'application/json,text/*;q=0.99',
                                },
                                method: 'GET',
                                url,
                                json: true,
                            };
                            let response;
                            try {
                                response = (await this.helpers.httpRequestWithAuthentication.call(this, 'instagramApi', requestOptions));
                                if (!response || typeof response !== 'object') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid response format received from /me endpoint. Expected object, got: ${typeof response}. Response: ${JSON.stringify(response)}`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get user profile from /me endpoint: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            returnItems.push({ json: response, pairedItem: { item: itemIndex } });
                            continue;
                        }
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Unsupported auth operation: ${operation}`, { itemIndex });
                    }
                    catch (error) {
                        if (!this.continueOnFail()) {
                            throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                        }
                        let errorItem;
                        const errorWithGraph = error;
                        if (errorWithGraph.response !== undefined) {
                            const graphApiErrors = (_f = (_e = errorWithGraph.response.body) === null || _e === void 0 ? void 0 : _e.error) !== null && _f !== void 0 ? _f : {};
                            errorItem = {
                                statusCode: errorWithGraph.statusCode,
                                ...graphApiErrors,
                                headers: errorWithGraph.response.headers,
                            };
                        }
                        else {
                            errorItem = error;
                        }
                        returnItems.push({ json: { ...errorItem }, pairedItem: { item: itemIndex } });
                        continue;
                    }
                }
                if (resource === 'carousel' && operation === 'publish') {
                    const getCarouselErrorMessage = (error) => {
                        var _a, _b, _c, _d;
                        const e = error;
                        const apiMsg = (_c = (_b = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.message;
                        return typeof apiMsg === 'string' ? apiMsg : (_d = e === null || e === void 0 ? void 0 : e.message) !== null && _d !== void 0 ? _d : String(error);
                    };
                    try {
                        let node;
                        let graphApiVersion;
                        let caption;
                        let carouselMedia;
                        try {
                            node = this.getNodeParameter('node', itemIndex);
                            if (!node || typeof node !== 'string') {
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing node (account ID) parameter at item index ${itemIndex}. Node must be a non-empty string.`, { itemIndex });
                            }
                        }
                        catch (error) {
                            if (error instanceof n8n_workflow_1.NodeOperationError) {
                                throw error;
                            }
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get node parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                        }
                        try {
                            graphApiVersion = this.getNodeParameter('graphApiVersion', itemIndex);
                            if (!graphApiVersion || typeof graphApiVersion !== 'string') {
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing Graph API version parameter at item index ${itemIndex}. Graph API version must be a non-empty string (e.g., 'v22.0').`, { itemIndex });
                            }
                        }
                        catch (error) {
                            if (error instanceof n8n_workflow_1.NodeOperationError) {
                                throw error;
                            }
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get Graph API version parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                        }
                        try {
                            caption = this.getNodeParameter('caption', itemIndex);
                            if (typeof caption !== 'string') {
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid caption parameter at item index ${itemIndex}. Caption must be a string.`, { itemIndex });
                            }
                        }
                        catch (error) {
                            if (error instanceof n8n_workflow_1.NodeOperationError) {
                                throw error;
                            }
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get caption parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                        }
                        try {
                            carouselMedia = this.getNodeParameter('carouselMedia', itemIndex, { mediaItem: [] });
                            if (!carouselMedia || typeof carouselMedia !== 'object') {
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid carousel media parameter at item index ${itemIndex}. Carousel media must be an object.`, { itemIndex });
                            }
                        }
                        catch (error) {
                            if (error instanceof n8n_workflow_1.NodeOperationError) {
                                throw error;
                            }
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get carousel media parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                        }
                        const mediaItems = (_g = carouselMedia === null || carouselMedia === void 0 ? void 0 : carouselMedia.mediaItem) !== null && _g !== void 0 ? _g : [];
                        if (!Array.isArray(mediaItems)) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid carousel media items format at item index ${itemIndex}. Media items must be an array.`, { itemIndex });
                        }
                        if (mediaItems.length < 2 || mediaItems.length > 10) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Carousel must have between 2 and 10 media items. Found ${mediaItems.length} items at item index ${itemIndex}.`, { itemIndex });
                        }
                        const pollIntervalMs = 1500;
                        const maxPollAttempts = 20;
                        const childIds = [];
                        const mediaUri = `https://${hostUrl}/${graphApiVersion}/${node}/media`;
                        for (let i = 0; i < mediaItems.length; i++) {
                            const item = mediaItems[i];
                            if (!item || typeof item !== 'object') {
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid carousel media item at index ${i} (item ${i + 1} of ${mediaItems.length}) at item index ${itemIndex}. Media item must be an object.`, { itemIndex });
                            }
                            const isVideo = item.mediaType === 'video';
                            const mediaLabel = `Carousel item ${i + 1} (${isVideo ? 'video' : 'image'})`;
                            if (!item.mediaType || typeof item.mediaType !== 'string') {
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `${mediaLabel}: Media type is required and must be either 'image' or 'video'.`, { itemIndex });
                            }
                            if (item.mediaType !== 'image' && item.mediaType !== 'video') {
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `${mediaLabel}: Invalid media type '${item.mediaType}'. Media type must be either 'image' or 'video'.`, { itemIndex });
                            }
                            const url = isVideo ? ((_h = item.videoUrl) !== null && _h !== void 0 ? _h : '').trim() : ((_j = item.imageUrl) !== null && _j !== void 0 ? _j : '').trim();
                            if (!url || typeof url !== 'string') {
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `${mediaLabel}: ${isVideo ? 'Video URL' : 'Image URL'} is required and must be a non-empty string.`, { itemIndex });
                            }
                            const childQs = isVideo
                                ? { media_type: 'VIDEO', video_url: url, is_carousel_item: true }
                                : { image_url: url, is_carousel_item: true };
                            const createChildOptions = {
                                headers: { accept: 'application/json,text/*;q=0.99' },
                                method: 'POST',
                                url: mediaUri,
                                qs: childQs,
                                json: true,
                            };
                            let childResponse;
                            try {
                                childResponse = (await this.helpers.httpRequestWithAuthentication.call(this, 'instagramApi', createChildOptions));
                            }
                            catch (err) {
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `${mediaLabel}: container creation failed — ${getCarouselErrorMessage(err)}`, { itemIndex });
                            }
                            const childId = childResponse.id;
                            if (!childId || typeof childId !== 'string') {
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `${mediaLabel}: Container creation did not return a valid ID. Response: ${JSON.stringify(childResponse)}`, { itemIndex });
                            }
                            try {
                                await waitForContainerReady({
                                    creationId: childId,
                                    hostUrl,
                                    graphApiVersion,
                                    itemIndex,
                                    pollIntervalMs,
                                    maxPollAttempts,
                                });
                            }
                            catch (err) {
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `${mediaLabel}: container did not become ready — ${getCarouselErrorMessage(err)}`, { itemIndex });
                            }
                            childIds.push(childId);
                        }
                        const carouselQs = {
                            media_type: 'CAROUSEL',
                            children: childIds.join(','),
                            caption,
                        };
                        const createCarouselOptions = {
                            headers: { accept: 'application/json,text/*;q=0.99' },
                            method: 'POST',
                            url: mediaUri,
                            qs: carouselQs,
                            json: true,
                        };
                        let carouselResponse;
                        try {
                            carouselResponse = (await this.helpers.httpRequestWithAuthentication.call(this, 'instagramApi', createCarouselOptions));
                        }
                        catch (err) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Carousel container (create): ${getCarouselErrorMessage(err)}`, { itemIndex });
                        }
                        const carouselContainerId = carouselResponse.id;
                        if (!carouselContainerId || typeof carouselContainerId !== 'string') {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Carousel container creation did not return a valid ID. Response: ${JSON.stringify(carouselResponse)}`, { itemIndex });
                        }
                        try {
                            await waitForContainerReady({
                                creationId: carouselContainerId,
                                hostUrl,
                                graphApiVersion,
                                itemIndex,
                                pollIntervalMs,
                                maxPollAttempts,
                            });
                        }
                        catch (err) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Carousel container (ready): ${getCarouselErrorMessage(err)}`, { itemIndex });
                        }
                        const publishUri = `https://${hostUrl}/${graphApiVersion}/${node}/media_publish`;
                        const publishOptions = {
                            headers: { accept: 'application/json,text/*;q=0.99' },
                            method: 'POST',
                            url: publishUri,
                            qs: { creation_id: carouselContainerId },
                            json: true,
                        };
                        let publishResponse;
                        try {
                            publishResponse = (await this.helpers.httpRequestWithAuthentication.call(this, 'instagramApi', publishOptions));
                        }
                        catch (err) {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Carousel publish: ${getCarouselErrorMessage(err)}`, { itemIndex });
                        }
                        returnItems.push({ json: publishResponse, pairedItem: { item: itemIndex } });
                        continue;
                    }
                    catch (error) {
                        if (!this.continueOnFail()) {
                            throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                        }
                        const errorWithGraph = error;
                        const errorItem = errorWithGraph.response !== undefined
                            ? {
                                statusCode: errorWithGraph.statusCode,
                                ...((_l = (_k = errorWithGraph.response.body) === null || _k === void 0 ? void 0 : _k.error) !== null && _l !== void 0 ? _l : {}),
                                headers: errorWithGraph.response.headers,
                            }
                            : error;
                        const contextMessage = error instanceof Error ? error.message : String((_m = error.message) !== null && _m !== void 0 ? _m : error);
                        returnItems.push({
                            json: { ...errorItem, carouselErrorContext: contextMessage },
                            pairedItem: { item: itemIndex },
                        });
                        continue;
                    }
                }
                if (resource === 'igHashtag') {
                    let graphApiVersion;
                    let accountId;
                    try {
                        graphApiVersion = this.getNodeParameter('graphApiVersion', itemIndex);
                        if (!graphApiVersion || typeof graphApiVersion !== 'string') {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing Graph API version parameter at item index ${itemIndex}. Graph API version must be a non-empty string (e.g., 'v22.0').`, { itemIndex });
                        }
                    }
                    catch (error) {
                        if (error instanceof n8n_workflow_1.NodeOperationError) {
                            throw error;
                        }
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get Graph API version parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                    }
                    try {
                        accountId = this.getNodeParameter('node', itemIndex);
                        if (!accountId || typeof accountId !== 'string') {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing account ID (node) parameter at item index ${itemIndex}. Account ID must be a non-empty string.`, { itemIndex });
                        }
                    }
                    catch (error) {
                        if (error instanceof n8n_workflow_1.NodeOperationError) {
                            throw error;
                        }
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get account ID (node) parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                    }
                    try {
                        if (operation === 'search') {
                            let hashtagName;
                            try {
                                hashtagName = this.getNodeParameter('hashtagName', itemIndex);
                                if (!hashtagName || typeof hashtagName !== 'string') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing hashtag name parameter at item index ${itemIndex}. Hashtag name must be a non-empty string (without the # symbol).`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get hashtag name parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            const url = `https://${hostUrl}/${graphApiVersion}/ig_hashtag_search`;
                            const requestOptions = {
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
                            let response;
                            try {
                                response = (await this.helpers.httpRequestWithAuthentication.call(this, 'instagramApi', requestOptions));
                                if (!response || typeof response !== 'object') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid response format received from hashtag search API. Expected object, got: ${typeof response}. Response: ${JSON.stringify(response)}`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to search hashtag '${hashtagName}' for account ${accountId}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            returnItems.push({ json: response, pairedItem: { item: itemIndex } });
                            continue;
                        }
                        if (operation === 'getRecentMedia' || operation === 'getTopMedia') {
                            let hashtagId;
                            let returnAll;
                            let limit;
                            try {
                                hashtagId = this.getNodeParameter('hashtagId', itemIndex);
                                if (!hashtagId || typeof hashtagId !== 'string') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing hashtag ID parameter at item index ${itemIndex}. Hashtag ID must be a non-empty string.`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get hashtag ID parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            try {
                                returnAll = this.getNodeParameter('returnAll', itemIndex, false);
                                if (typeof returnAll !== 'boolean') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid returnAll parameter at item index ${itemIndex}. ReturnAll must be a boolean.`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get returnAll parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            try {
                                limit = this.getNodeParameter('limit', itemIndex, 0);
                                if (typeof limit !== 'number' || limit < 0) {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid limit parameter at item index ${itemIndex}. Limit must be a non-negative number.`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get limit parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
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
                            const accumulated = [];
                            let after;
                            const hardCap = returnAll ? 5000 : limit;
                            let hasMore = true;
                            let pageNumber = 0;
                            while (hasMore) {
                                pageNumber++;
                                const remaining = returnAll ? undefined : hardCap - accumulated.length;
                                const pageLimit = remaining !== undefined ? Math.min(remaining, 50) : 50;
                                const qs = {
                                    user_id: accountId,
                                    fields,
                                    limit: pageLimit,
                                };
                                if (after) {
                                    qs.after = after;
                                }
                                const requestOptions = {
                                    headers: {
                                        accept: 'application/json,text/*;q=0.99',
                                    },
                                    method: 'GET',
                                    url: baseUrl,
                                    qs,
                                    json: true,
                                };
                                let response;
                                try {
                                    response = (await this.helpers.httpRequestWithAuthentication.call(this, 'instagramApi', requestOptions));
                                    if (!response || typeof response !== 'object') {
                                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid response format received from ${edge} API at page ${pageNumber}. Expected object, got: ${typeof response}. Response: ${JSON.stringify(response)}`, { itemIndex });
                                    }
                                }
                                catch (error) {
                                    if (error instanceof n8n_workflow_1.NodeOperationError) {
                                        throw error;
                                    }
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to fetch ${edge} for hashtag ${hashtagId} at page ${pageNumber}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                                }
                                const pageData = (_o = response.data) !== null && _o !== void 0 ? _o : [];
                                if (!Array.isArray(pageData)) {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid data format in response from ${edge} API at page ${pageNumber}. Expected array, got: ${typeof pageData}. Response: ${JSON.stringify(response)}`, { itemIndex });
                                }
                                accumulated.push(...pageData);
                                const paging = response.paging;
                                after = (_p = paging === null || paging === void 0 ? void 0 : paging.cursors) === null || _p === void 0 ? void 0 : _p.after;
                                if ((!returnAll && accumulated.length >= hardCap) || !after) {
                                    hasMore = false;
                                }
                            }
                            const finalData = !returnAll && hardCap > 0 ? accumulated.slice(0, hardCap) : accumulated;
                            returnItems.push({ json: { data: finalData }, pairedItem: { item: itemIndex } });
                            continue;
                        }
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Unsupported IG Hashtag operation: ${operation}`, { itemIndex });
                    }
                    catch (error) {
                        if (!this.continueOnFail()) {
                            throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                        }
                        let errorItem;
                        const errorWithGraph = error;
                        if (errorWithGraph.response !== undefined) {
                            const graphApiErrors = (_r = (_q = errorWithGraph.response.body) === null || _q === void 0 ? void 0 : _q.error) !== null && _r !== void 0 ? _r : {};
                            errorItem = {
                                statusCode: errorWithGraph.statusCode,
                                ...graphApiErrors,
                                headers: errorWithGraph.response.headers,
                            };
                        }
                        else {
                            errorItem = error;
                        }
                        returnItems.push({ json: { ...errorItem }, pairedItem: { item: itemIndex } });
                        continue;
                    }
                }
                if (resource === 'page') {
                    let graphApiVersion;
                    let pageId;
                    try {
                        graphApiVersion = this.getNodeParameter('graphApiVersion', itemIndex);
                        if (!graphApiVersion || typeof graphApiVersion !== 'string') {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing Graph API version parameter at item index ${itemIndex}. Graph API version must be a non-empty string (e.g., 'v22.0').`, { itemIndex });
                        }
                    }
                    catch (error) {
                        if (error instanceof n8n_workflow_1.NodeOperationError) {
                            throw error;
                        }
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get Graph API version parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                    }
                    try {
                        pageId = this.getNodeParameter('pageId', itemIndex);
                        if (!pageId || typeof pageId !== 'string') {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing page ID parameter at item index ${itemIndex}. Page ID must be a non-empty string.`, { itemIndex });
                        }
                    }
                    catch (error) {
                        if (error instanceof n8n_workflow_1.NodeOperationError) {
                            throw error;
                        }
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get page ID parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                    }
                    try {
                        if (operation === 'getInstagramAccount') {
                            const url = `https://${hostUrl}/${graphApiVersion}/${pageId}`;
                            const requestOptions = {
                                headers: {
                                    accept: 'application/json,text/*;q=0.99',
                                },
                                method: 'GET',
                                url,
                                qs: {
                                    fields: 'instagram_business_account',
                                },
                                json: true,
                            };
                            let response;
                            try {
                                response = (await this.helpers.httpRequestWithAuthentication.call(this, 'instagramApi', requestOptions));
                                if (!response || typeof response !== 'object') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid response format received from page API. Expected object, got: ${typeof response}. Response: ${JSON.stringify(response)}`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get Instagram account for page ${pageId}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            returnItems.push({ json: response, pairedItem: { item: itemIndex } });
                            continue;
                        }
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Unsupported page operation: ${operation}`, { itemIndex });
                    }
                    catch (error) {
                        if (!this.continueOnFail()) {
                            throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                        }
                        let errorItem;
                        const errorWithGraph = error;
                        if (errorWithGraph.response !== undefined) {
                            const graphApiErrors = (_t = (_s = errorWithGraph.response.body) === null || _s === void 0 ? void 0 : _s.error) !== null && _t !== void 0 ? _t : {};
                            errorItem = {
                                statusCode: errorWithGraph.statusCode,
                                ...graphApiErrors,
                                headers: errorWithGraph.response.headers,
                            };
                        }
                        else {
                            errorItem = error;
                        }
                        returnItems.push({ json: { ...errorItem }, pairedItem: { item: itemIndex } });
                        continue;
                    }
                }
                if (resource === 'igUser') {
                    let graphApiVersion;
                    let accountId;
                    try {
                        graphApiVersion = this.getNodeParameter('graphApiVersion', itemIndex);
                        if (!graphApiVersion || typeof graphApiVersion !== 'string') {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing Graph API version parameter at item index ${itemIndex}. Graph API version must be a non-empty string (e.g., 'v22.0').`, { itemIndex });
                        }
                    }
                    catch (error) {
                        if (error instanceof n8n_workflow_1.NodeOperationError) {
                            throw error;
                        }
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get Graph API version parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                    }
                    try {
                        accountId = this.getNodeParameter('node', itemIndex);
                        if (!accountId || typeof accountId !== 'string') {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing account ID (node) parameter at item index ${itemIndex}. Account ID must be a non-empty string.`, { itemIndex });
                        }
                    }
                    catch (error) {
                        if (error instanceof n8n_workflow_1.NodeOperationError) {
                            throw error;
                        }
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get account ID (node) parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                    }
                    try {
                        if (operation === 'get') {
                            const url = `https://${hostUrl}/${graphApiVersion}/${accountId}`;
                            const requestOptions = {
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
                            let response;
                            try {
                                response = (await this.helpers.httpRequestWithAuthentication.call(this, 'instagramApi', requestOptions));
                                if (!response || typeof response !== 'object') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid response format received from IG User API. Expected object, got: ${typeof response}. Response: ${JSON.stringify(response)}`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get IG User profile for account ${accountId}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            returnItems.push({ json: response, pairedItem: { item: itemIndex } });
                            continue;
                        }
                        if (operation === 'getMedia') {
                            let returnAll;
                            let limit;
                            try {
                                returnAll = this.getNodeParameter('returnAll', itemIndex, false);
                                if (typeof returnAll !== 'boolean') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid returnAll parameter at item index ${itemIndex}. ReturnAll must be a boolean.`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get returnAll parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            try {
                                limit = this.getNodeParameter('limit', itemIndex, 0);
                                if (typeof limit !== 'number' || limit < 0) {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid limit parameter at item index ${itemIndex}. Limit must be a non-negative number.`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get limit parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
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
                            const accumulated = [];
                            let after;
                            const hardCap = returnAll ? 5000 : limit;
                            let hasMore = true;
                            let pageNumber = 0;
                            while (hasMore) {
                                pageNumber++;
                                const remaining = returnAll ? undefined : hardCap - accumulated.length;
                                const pageLimit = remaining !== undefined ? Math.min(remaining, 100) : 100;
                                const qs = {
                                    fields,
                                    limit: pageLimit,
                                };
                                if (after) {
                                    qs.after = after;
                                }
                                const requestOptions = {
                                    headers: {
                                        accept: 'application/json,text/*;q=0.99',
                                    },
                                    method: 'GET',
                                    url: baseUrl,
                                    qs,
                                    json: true,
                                };
                                let response;
                                try {
                                    response = (await this.helpers.httpRequestWithAuthentication.call(this, 'instagramApi', requestOptions));
                                    if (!response || typeof response !== 'object') {
                                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid response format received from IG User media API at page ${pageNumber}. Expected object, got: ${typeof response}. Response: ${JSON.stringify(response)}`, { itemIndex });
                                    }
                                }
                                catch (error) {
                                    if (error instanceof n8n_workflow_1.NodeOperationError) {
                                        throw error;
                                    }
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to fetch media for account ${accountId} at page ${pageNumber}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                                }
                                const pageData = (_u = response.data) !== null && _u !== void 0 ? _u : [];
                                if (!Array.isArray(pageData)) {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid data format in response from IG User media API at page ${pageNumber}. Expected array, got: ${typeof pageData}. Response: ${JSON.stringify(response)}`, { itemIndex });
                                }
                                accumulated.push(...pageData);
                                const paging = response.paging;
                                after = (_v = paging === null || paging === void 0 ? void 0 : paging.cursors) === null || _v === void 0 ? void 0 : _v.after;
                                if ((!returnAll && accumulated.length >= hardCap) || !after) {
                                    hasMore = false;
                                }
                            }
                            const finalData = !returnAll && hardCap > 0 ? accumulated.slice(0, hardCap) : accumulated;
                            returnItems.push({ json: { data: finalData }, pairedItem: { item: itemIndex } });
                            continue;
                        }
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Unsupported IG User operation: ${operation}`, { itemIndex });
                    }
                    catch (error) {
                        if (!this.continueOnFail()) {
                            throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                        }
                        let errorItem;
                        const errorWithGraph = error;
                        if (errorWithGraph.response !== undefined) {
                            const graphApiErrors = (_x = (_w = errorWithGraph.response.body) === null || _w === void 0 ? void 0 : _w.error) !== null && _x !== void 0 ? _x : {};
                            errorItem = {
                                statusCode: errorWithGraph.statusCode,
                                ...graphApiErrors,
                                headers: errorWithGraph.response.headers,
                            };
                        }
                        else {
                            errorItem = error;
                        }
                        returnItems.push({ json: { ...errorItem }, pairedItem: { item: itemIndex } });
                        continue;
                    }
                }
                if (resource === 'comments') {
                    let graphApiVersion;
                    try {
                        graphApiVersion = this.getNodeParameter('graphApiVersion', itemIndex);
                        if (!graphApiVersion || typeof graphApiVersion !== 'string') {
                            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing Graph API version parameter at item index ${itemIndex}. Graph API version must be a non-empty string (e.g., 'v22.0').`, { itemIndex });
                        }
                    }
                    catch (error) {
                        if (error instanceof n8n_workflow_1.NodeOperationError) {
                            throw error;
                        }
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get Graph API version parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                    }
                    try {
                        if (operation === 'list') {
                            let mediaId;
                            try {
                                mediaId = this.getNodeParameter('mediaId', itemIndex);
                                if (!mediaId || typeof mediaId !== 'string') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing media ID parameter at item index ${itemIndex}. Media ID must be a non-empty string.`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get media ID parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            const url = `https://${hostUrl}/${graphApiVersion}/${mediaId}/comments`;
                            const requestOptions = {
                                headers: {
                                    accept: 'application/json,text/*;q=0.99',
                                },
                                method: 'GET',
                                url,
                                json: true,
                            };
                            let response;
                            try {
                                response = (await this.helpers.httpRequestWithAuthentication.call(this, 'instagramApi', requestOptions));
                                if (!response || typeof response !== 'object') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid response format received from comments list API. Expected object, got: ${typeof response}. Response: ${JSON.stringify(response)}`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to list comments for media ${mediaId}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            returnItems.push({ json: response, pairedItem: { item: itemIndex } });
                            continue;
                        }
                        if (operation === 'hideComment' || operation === 'unhideComment') {
                            let commentId;
                            try {
                                commentId = this.getNodeParameter('commentId', itemIndex);
                                if (!commentId || typeof commentId !== 'string') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing comment ID parameter at item index ${itemIndex}. Comment ID must be a non-empty string.`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get comment ID parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            const hideValue = operation === 'hideComment';
                            const url = `https://${hostUrl}/${graphApiVersion}/${commentId}`;
                            const requestOptions = {
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
                            let response;
                            try {
                                response = (await this.helpers.httpRequestWithAuthentication.call(this, 'instagramApi', requestOptions));
                                if (!response || typeof response !== 'object') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid response format received from ${operation} API. Expected object, got: ${typeof response}. Response: ${JSON.stringify(response)}`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to ${operation} for comment ${commentId}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            returnItems.push({ json: response, pairedItem: { item: itemIndex } });
                            continue;
                        }
                        if (operation === 'deleteComment') {
                            let commentId;
                            try {
                                commentId = this.getNodeParameter('commentId', itemIndex);
                                if (!commentId || typeof commentId !== 'string') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing comment ID parameter at item index ${itemIndex}. Comment ID must be a non-empty string.`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get comment ID parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            const url = `https://${hostUrl}/${graphApiVersion}/${commentId}`;
                            const requestOptions = {
                                headers: {
                                    accept: 'application/json,text/*;q=0.99',
                                },
                                method: 'DELETE',
                                url,
                                json: true,
                            };
                            let response;
                            try {
                                response = (await this.helpers.httpRequestWithAuthentication.call(this, 'instagramApi', requestOptions));
                                if (!response || typeof response !== 'object') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid response format received from delete comment API. Expected object, got: ${typeof response}. Response: ${JSON.stringify(response)}`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to delete comment ${commentId}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            returnItems.push({ json: response, pairedItem: { item: itemIndex } });
                            continue;
                        }
                        if (operation === 'disableComments' || operation === 'enableComments') {
                            let mediaId;
                            try {
                                mediaId = this.getNodeParameter('mediaId', itemIndex);
                                if (!mediaId || typeof mediaId !== 'string') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing media ID parameter at item index ${itemIndex}. Media ID must be a non-empty string.`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get media ID parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            const commentEnabled = operation === 'enableComments';
                            const url = `https://${hostUrl}/${graphApiVersion}/${mediaId}`;
                            const requestOptions = {
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
                            let response;
                            try {
                                response = (await this.helpers.httpRequestWithAuthentication.call(this, 'instagramApi', requestOptions));
                                if (!response || typeof response !== 'object') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid response format received from ${operation} API. Expected object, got: ${typeof response}. Response: ${JSON.stringify(response)}`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to ${operation} for media ${mediaId}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            returnItems.push({ json: response, pairedItem: { item: itemIndex } });
                            continue;
                        }
                        if (operation === 'sendPrivateReply') {
                            let accountId;
                            let commentId;
                            let text;
                            try {
                                accountId = this.getNodeParameter('node', itemIndex);
                                if (!accountId || typeof accountId !== 'string') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing account ID (node) parameter at item index ${itemIndex}. Account ID must be a non-empty string.`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get account ID (node) parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            try {
                                commentId = this.getNodeParameter('commentId', itemIndex);
                                if (!commentId || typeof commentId !== 'string') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing comment ID parameter at item index ${itemIndex}. Comment ID must be a non-empty string.`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get comment ID parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            try {
                                text = this.getNodeParameter('privateReplyText', itemIndex);
                                if (!text || typeof text !== 'string') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing private reply text parameter at item index ${itemIndex}. Private reply text must be a non-empty string.`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get private reply text parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            const url = `https://${hostUrl}/${graphApiVersion}/${accountId}/messages`;
                            const requestOptions = {
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
                            let response;
                            try {
                                response = (await this.helpers.httpRequestWithAuthentication.call(this, 'instagramApi', requestOptions));
                                if (!response || typeof response !== 'object') {
                                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid response format received from send private reply API. Expected object, got: ${typeof response}. Response: ${JSON.stringify(response)}`, { itemIndex });
                                }
                            }
                            catch (error) {
                                if (error instanceof n8n_workflow_1.NodeOperationError) {
                                    throw error;
                                }
                                throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to send private reply to comment ${commentId} for account ${accountId}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                            }
                            returnItems.push({ json: response, pairedItem: { item: itemIndex } });
                            continue;
                        }
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Unsupported comments operation: ${operation}`, { itemIndex });
                    }
                    catch (error) {
                        if (!this.continueOnFail()) {
                            throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                        }
                        let errorItem;
                        const errorWithGraph = error;
                        if (errorWithGraph.response !== undefined) {
                            const graphApiErrors = (_z = (_y = errorWithGraph.response.body) === null || _y === void 0 ? void 0 : _y.error) !== null && _z !== void 0 ? _z : {};
                            errorItem = {
                                statusCode: errorWithGraph.statusCode,
                                ...graphApiErrors,
                                headers: errorWithGraph.response.headers,
                            };
                        }
                        else {
                            errorItem = error;
                        }
                        returnItems.push({ json: { ...errorItem }, pairedItem: { item: itemIndex } });
                        continue;
                    }
                }
                if (operation !== 'publish') {
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Unsupported operation: ${operation}`, {
                        itemIndex,
                    });
                }
                const handler = resources_1.instagramResourceHandlers[resource];
                if (!handler) {
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Unsupported resource: ${resource}. Supported resources are: ${Object.keys(resources_1.instagramResourceHandlers).join(', ')}.`, { itemIndex });
                }
                let node;
                let graphApiVersion;
                let caption;
                let additionalFields;
                try {
                    node = this.getNodeParameter('node', itemIndex);
                    if (!node || typeof node !== 'string') {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing node (account ID) parameter at item index ${itemIndex}. Node must be a non-empty string.`, { itemIndex });
                    }
                }
                catch (error) {
                    if (error instanceof n8n_workflow_1.NodeOperationError) {
                        throw error;
                    }
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get node parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                }
                try {
                    graphApiVersion = this.getNodeParameter('graphApiVersion', itemIndex);
                    if (!graphApiVersion || typeof graphApiVersion !== 'string') {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid or missing Graph API version parameter at item index ${itemIndex}. Graph API version must be a non-empty string (e.g., 'v22.0').`, { itemIndex });
                    }
                }
                catch (error) {
                    if (error instanceof n8n_workflow_1.NodeOperationError) {
                        throw error;
                    }
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get Graph API version parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                }
                try {
                    caption = this.getNodeParameter('caption', itemIndex);
                    if (typeof caption !== 'string') {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid caption parameter at item index ${itemIndex}. Caption must be a string.`, { itemIndex });
                    }
                }
                catch (error) {
                    if (error instanceof n8n_workflow_1.NodeOperationError) {
                        throw error;
                    }
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get caption parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                }
                try {
                    additionalFields = this.getNodeParameter('additionalFields', itemIndex, {});
                    if (!additionalFields || typeof additionalFields !== 'object') {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid additional fields parameter at item index ${itemIndex}. Additional fields must be an object.`, { itemIndex });
                    }
                }
                catch (error) {
                    if (error instanceof n8n_workflow_1.NodeOperationError) {
                        throw error;
                    }
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to get additional fields parameter at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                }
                const altText = (_0 = additionalFields.altText) !== null && _0 !== void 0 ? _0 : '';
                const rawLocationId = additionalFields.locationId;
                const userTagsCollection = additionalFields.userTags;
                const productTagsCollection = additionalFields.productTags;
                const httpRequestMethod = 'POST';
                const mediaUri = `https://${hostUrl}/${graphApiVersion}/${node}/media`;
                let mediaPayload;
                try {
                    mediaPayload = handler.buildMediaPayload.call(this, itemIndex);
                    if (!mediaPayload || typeof mediaPayload !== 'object') {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid media payload returned from handler for resource '${resource}' at item index ${itemIndex}. Expected object, got: ${typeof mediaPayload}.`, { itemIndex });
                    }
                }
                catch (error) {
                    if (error instanceof n8n_workflow_1.NodeOperationError) {
                        throw error;
                    }
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to build media payload for resource '${resource}' at item index ${itemIndex}: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                }
                const videoUrl = mediaPayload.video_url;
                const imageUrl = mediaPayload.image_url;
                if (videoUrl) {
                    const trimmedUrl = videoUrl.trim();
                    if (!trimmedUrl) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Video URL is empty for resource '${resource}' at item index ${itemIndex}. Please provide a valid video URL.`, { itemIndex });
                    }
                    const urlPattern = /^https?:\/\/.+/i;
                    if (!urlPattern.test(trimmedUrl)) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid video URL format for resource '${resource}' at item index ${itemIndex}. URL must be a valid HTTP/HTTPS URL starting with http:// or https://. Provided URL: ${trimmedUrl.substring(0, 100)}${trimmedUrl.length > 100 ? '...' : ''}`, { itemIndex });
                    }
                }
                if (imageUrl) {
                    const trimmedUrl = imageUrl.trim();
                    if (!trimmedUrl) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Image URL is empty for resource '${resource}' at item index ${itemIndex}. Please provide a valid image URL.`, { itemIndex });
                    }
                    const urlPattern = /^https?:\/\/.+/i;
                    if (!urlPattern.test(trimmedUrl)) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid image URL format for resource '${resource}' at item index ${itemIndex}. URL must be a valid HTTP/HTTPS URL starting with http:// or https://. Provided URL: ${trimmedUrl.substring(0, 100)}${trimmedUrl.length > 100 ? '...' : ''}`, { itemIndex });
                    }
                }
                const mediaQs = {
                    caption,
                    ...mediaPayload,
                };
                if (altText) {
                    mediaQs.alt_text = altText;
                }
                const locationId = rawLocationId === null || rawLocationId === void 0 ? void 0 : rawLocationId.trim();
                if (locationId) {
                    mediaQs.location_id = locationId;
                }
                if ((userTagsCollection === null || userTagsCollection === void 0 ? void 0 : userTagsCollection.tag) && Array.isArray(userTagsCollection.tag) && userTagsCollection.tag.length > 0) {
                    const userTags = userTagsCollection.tag
                        .filter((tag) => tag.username)
                        .map((tag) => {
                        const tagObj = {
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
                if ((productTagsCollection === null || productTagsCollection === void 0 ? void 0 : productTagsCollection.tag) &&
                    Array.isArray(productTagsCollection.tag) &&
                    productTagsCollection.tag.length > 0) {
                    const productTags = productTagsCollection.tag
                        .filter((tag) => tag.product_id)
                        .map((tag) => {
                        const tagObj = {
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
                const graduationStrategy = additionalFields.trialReelGraduationStrategy;
                if (graduationStrategy) {
                    if (resource !== 'reels') {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Trial Reels are only supported for the Reels resource. Remove Trial Reel options or switch the resource to Reels.', { itemIndex });
                    }
                    mediaQs.trial_params = JSON.stringify({
                        graduation_strategy: graduationStrategy,
                    });
                }
                const mediaRequestOptions = {
                    headers: {
                        accept: 'application/json,text/*;q=0.99',
                    },
                    method: httpRequestMethod,
                    url: mediaUri,
                    qs: mediaQs,
                    json: true,
                };
                let mediaResponse;
                try {
                    mediaResponse = (await this.helpers.httpRequestWithAuthentication.call(this, 'instagramApi', mediaRequestOptions));
                }
                catch (error) {
                    let errorMessage = 'Unknown error';
                    let errorCode;
                    let errorType;
                    const err = error;
                    if ((_2 = (_1 = err.response) === null || _1 === void 0 ? void 0 : _1.body) === null || _2 === void 0 ? void 0 : _2.error) {
                        const graphError = err.response.body.error;
                        errorMessage = graphError.message || errorMessage;
                        errorCode = graphError.code;
                        errorType = graphError.type;
                    }
                    else if (err.message) {
                        errorMessage = err.message;
                    }
                    else if (error instanceof Error) {
                        errorMessage = error.message;
                    }
                    else {
                        errorMessage = String(error);
                    }
                    const lowerErrorMessage = errorMessage.toLowerCase();
                    if (lowerErrorMessage.includes('invalid url') ||
                        lowerErrorMessage.includes('url') ||
                        lowerErrorMessage.includes('not found') ||
                        lowerErrorMessage.includes('404') ||
                        lowerErrorMessage.includes('cannot access') ||
                        lowerErrorMessage.includes('unreachable')) {
                        const urlToCheck = videoUrl || imageUrl || 'provided URL';
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to create media container: The ${videoUrl ? 'video' : 'image'} URL appears to be invalid or unreachable. Error: ${errorMessage}${errorCode ? ` (Code: ${errorCode})` : ''}. Please verify that the URL is accessible and points to a valid ${videoUrl ? 'video' : 'image'} file. URL: ${urlToCheck.substring(0, 100)}${urlToCheck.length > 100 ? '...' : ''}`, { itemIndex });
                    }
                    if (!this.continueOnFail()) {
                        const errorObj = (_4 = (_3 = err.response) === null || _3 === void 0 ? void 0 : _3.body) === null || _4 === void 0 ? void 0 : _4.error;
                        const detailedError = {
                            message: errorMessage,
                            ...(errorCode && { code: errorCode }),
                            ...(errorType && { type: errorType }),
                            ...(err.statusCode && { statusCode: err.statusCode }),
                        };
                        if (errorObj && typeof errorObj === 'object' && !Array.isArray(errorObj)) {
                            Object.keys(errorObj).forEach((key) => {
                                const value = errorObj[key];
                                if (value !== undefined &&
                                    value !== null &&
                                    (typeof value === 'string' ||
                                        typeof value === 'number' ||
                                        typeof value === 'boolean')) {
                                    detailedError[`error_${key}`] = value;
                                }
                            });
                        }
                        throw new n8n_workflow_1.NodeApiError(this.getNode(), detailedError);
                    }
                    let errorItem;
                    if (err.response !== undefined) {
                        const graphApiErrors = (_6 = (_5 = err.response.body) === null || _5 === void 0 ? void 0 : _5.error) !== null && _6 !== void 0 ? _6 : {};
                        errorItem = {
                            statusCode: err.statusCode,
                            ...graphApiErrors,
                            headers: err.response.headers,
                        };
                    }
                    else {
                        errorItem = err;
                    }
                    returnItems.push({ json: errorItem, pairedItem: { item: itemIndex } });
                    continue;
                }
                if (typeof mediaResponse === 'string') {
                    const responseStr = mediaResponse;
                    if (!this.continueOnFail()) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Media creation response body is not valid JSON. Received string response: ${responseStr.substring(0, 200)}${responseStr.length > 200 ? '...' : ''}`, { itemIndex });
                    }
                    returnItems.push({ json: { message: responseStr }, pairedItem: { item: itemIndex } });
                    continue;
                }
                const creationId = mediaResponse.id;
                if (!creationId || typeof creationId !== 'string') {
                    const responseData = mediaResponse;
                    const errorObj = responseData.error;
                    const errorMessage = errorObj && typeof errorObj === 'object' && !Array.isArray(errorObj)
                        ? errorObj.message
                        : undefined;
                    const errorCode = errorObj && typeof errorObj === 'object' && !Array.isArray(errorObj)
                        ? errorObj.code
                        : undefined;
                    if (!this.continueOnFail()) {
                        const errorDetails = errorMessage
                            ? ` API Error: ${errorMessage}${errorCode ? ` (Code: ${errorCode})` : ''}`
                            : '';
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Media creation response did not contain a valid id (creation_id).${errorDetails} Response: ${JSON.stringify(mediaResponse)}`, { itemIndex });
                    }
                    returnItems.push({
                        json: {
                            error: 'No creation_id in response',
                            response: mediaResponse,
                            resource,
                            itemIndex,
                            ...(errorMessage && { apiError: errorMessage }),
                            ...(errorCode && { apiErrorCode: errorCode }),
                        },
                        pairedItem: { item: itemIndex },
                    });
                    continue;
                }
                const responseData = mediaResponse;
                const responseError = responseData.error;
                if (responseError && typeof responseError === 'object' && !Array.isArray(responseError)) {
                    const errorObj = responseError;
                    const errorMsg = errorObj.message;
                    const errorCode = errorObj.code;
                    if (!this.continueOnFail()) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Media container creation returned an error despite providing an ID. Error: ${errorMsg || 'Unknown error'}${errorCode ? ` (Code: ${errorCode})` : ''}. Container ID: ${creationId}. This may indicate the media URL is invalid or inaccessible.`, { itemIndex });
                    }
                }
                try {
                    await waitForContainerReady({
                        creationId,
                        hostUrl,
                        graphApiVersion,
                        itemIndex,
                        pollIntervalMs: handler.pollIntervalMs,
                        maxPollAttempts: handler.maxPollAttempts,
                    });
                }
                catch (error) {
                    if (error instanceof n8n_workflow_1.NodeOperationError) {
                        throw error;
                    }
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to wait for container to become ready. Creation ID: ${creationId}, Resource: ${resource}. Error: ${error instanceof Error ? error.message : String(error)}`, { itemIndex });
                }
                const publishUri = `https://${hostUrl}/${graphApiVersion}/${node}/media_publish`;
                const publishQs = {
                    creation_id: creationId,
                };
                const publishRequestOptions = {
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
                let publishResponse;
                let publishSucceeded = false;
                let publishFailedWithError = false;
                for (let attempt = 1; attempt <= publishMaxAttempts; attempt++) {
                    try {
                        publishResponse = (await this.helpers.httpRequestWithAuthentication.call(this, 'instagramApi', publishRequestOptions));
                        publishSucceeded = true;
                        break;
                    }
                    catch (error) {
                        if (isMediaNotReadyError(error) && attempt < publishMaxAttempts) {
                            await (0, n8n_workflow_1.sleep)(publishRetryDelay);
                            continue;
                        }
                        if (!this.continueOnFail()) {
                            throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                        }
                        let errorItem;
                        const err = error;
                        if (err.response !== undefined) {
                            const graphApiErrors = (_8 = (_7 = err.response.body) === null || _7 === void 0 ? void 0 : _7.error) !== null && _8 !== void 0 ? _8 : {};
                            errorItem = {
                                statusCode: err.statusCode,
                                ...graphApiErrors,
                                headers: err.response.headers,
                                creation_id: creationId,
                                note: 'Media was created but publishing failed',
                            };
                        }
                        else {
                            errorItem = { ...error, creation_id: creationId, note: 'Media was created but publishing failed' };
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
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to publish media after ${publishMaxAttempts} attempts due to container not being ready.`, { itemIndex });
                }
                if (typeof publishResponse === 'string') {
                    if (!this.continueOnFail()) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Media publish response body is not valid JSON. Received string response: ${publishResponse.substring(0, 200)}${publishResponse.length > 200 ? '...' : ''}`, { itemIndex });
                    }
                    returnItems.push({ json: { message: publishResponse }, pairedItem: { item: itemIndex } });
                    continue;
                }
                if (!publishResponse || typeof publishResponse !== 'object') {
                    if (!this.continueOnFail()) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Invalid publish response format. Expected object, got: ${typeof publishResponse}. Response: ${JSON.stringify(publishResponse)}`, { itemIndex });
                    }
                    returnItems.push({ json: { response: publishResponse }, pairedItem: { item: itemIndex } });
                    continue;
                }
                returnItems.push({ json: publishResponse, pairedItem: { item: itemIndex } });
            }
            catch (error) {
                if (!this.continueOnFail()) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
                let errorItem;
                const errorWithGraph = error;
                if (errorWithGraph.response !== undefined) {
                    const graphApiErrors = (_10 = (_9 = errorWithGraph.response.body) === null || _9 === void 0 ? void 0 : _9.error) !== null && _10 !== void 0 ? _10 : {};
                    errorItem = {
                        statusCode: errorWithGraph.statusCode,
                        ...graphApiErrors,
                        headers: errorWithGraph.response.headers,
                    };
                }
                else {
                    errorItem = error;
                }
                returnItems.push({ json: { ...errorItem }, pairedItem: { item: itemIndex } });
            }
        }
        return [returnItems];
    }
}
exports.Instagram = Instagram;
//# sourceMappingURL=Instagram.node.js.map