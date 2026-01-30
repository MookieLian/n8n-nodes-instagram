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
                    options: [...resources_1.instagramResourceOptions],
                    default: 'image',
                    description: 'Select the Instagram media type to publish',
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
                    displayName: 'Node',
                    name: 'node',
                    type: 'string',
                    default: '',
                    description: 'The Instagram Business Account ID or User ID on which to publish the media',
                    placeholder: 'me',
                    required: true,
                    displayOptions: {
                        show: {
                            resource: ['image', 'reels', 'stories'],
                            operation: ['publish'],
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
                            resource: ['image', 'reels', 'stories'],
                            operation: ['publish'],
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
                            description: 'Facebook Page ID for a location to tag. Use Pages Search API to find location pages. Image and Reels only; not supported for Stories.',
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
                    ],
                },
            ],
        };
    }
    async execute() {
        var _a, _b, _c, _d, _e, _f, _g;
        const items = this.getInputData();
        const returnItems = [];
        const waitForContainerReady = async ({ creationId, hostUrl, graphApiVersion, itemIndex, pollIntervalMs, maxPollAttempts, }) => {
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
            for (let attempt = 1; attempt <= maxPollAttempts; attempt++) {
                const statusResponse = (await this.helpers.httpRequestWithAuthentication.call(this, 'instagramApi', pollRequestOptions));
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
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Media container reported error status (${statuses.join(', ')}) while waiting to publish.`, { itemIndex });
                }
                await (0, n8n_workflow_1.sleep)(pollIntervalMs);
            }
            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Timed out waiting for container to become ready. Last known status: ${lastStatus !== null && lastStatus !== void 0 ? lastStatus : 'unknown'}.`, { itemIndex });
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
                const resource = this.getNodeParameter('resource', itemIndex);
                const operation = this.getNodeParameter('operation', itemIndex);
                if (operation !== 'publish') {
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Unsupported operation: ${operation}`, {
                        itemIndex,
                    });
                }
                const handler = resources_1.instagramResourceHandlers[resource];
                if (!handler) {
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Unsupported resource: ${resource}`, {
                        itemIndex,
                    });
                }
                const node = this.getNodeParameter('node', itemIndex);
                const graphApiVersion = this.getNodeParameter('graphApiVersion', itemIndex);
                const caption = this.getNodeParameter('caption', itemIndex);
                const additionalFields = this.getNodeParameter('additionalFields', itemIndex, {});
                const altText = (_a = additionalFields.altText) !== null && _a !== void 0 ? _a : '';
                const rawLocationId = additionalFields.locationId;
                const userTagsCollection = additionalFields.userTags;
                const productTagsCollection = additionalFields.productTags;
                const hostUrl = 'graph.facebook.com';
                const httpRequestMethod = 'POST';
                const mediaUri = `https://${hostUrl}/${graphApiVersion}/${node}/media`;
                const mediaPayload = handler.buildMediaPayload.call(this, itemIndex);
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
                    mediaResponse = await this.helpers.httpRequestWithAuthentication.call(this, 'instagramApi', mediaRequestOptions);
                }
                catch (error) {
                    if (!this.continueOnFail()) {
                        throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                    }
                    let errorItem;
                    const err = error;
                    if (err.response !== undefined) {
                        const graphApiErrors = (_c = (_b = err.response.body) === null || _b === void 0 ? void 0 : _b.error) !== null && _c !== void 0 ? _c : {};
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
                    if (!this.continueOnFail()) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Media creation response body is not valid JSON.', {
                            itemIndex,
                        });
                    }
                    returnItems.push({ json: { message: mediaResponse }, pairedItem: { item: itemIndex } });
                    continue;
                }
                const creationId = mediaResponse.id;
                if (!creationId) {
                    if (!this.continueOnFail()) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Media creation response did not contain an id (creation_id).', { itemIndex });
                    }
                    returnItems.push({ json: { error: 'No creation_id in response', response: mediaResponse }, pairedItem: { item: itemIndex } });
                    continue;
                }
                await waitForContainerReady({
                    creationId,
                    hostUrl,
                    graphApiVersion,
                    itemIndex,
                    pollIntervalMs: handler.pollIntervalMs,
                    maxPollAttempts: handler.maxPollAttempts,
                });
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
                        publishResponse = await this.helpers.httpRequestWithAuthentication.call(this, 'instagramApi', publishRequestOptions);
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
                            const graphApiErrors = (_e = (_d = err.response.body) === null || _d === void 0 ? void 0 : _d.error) !== null && _e !== void 0 ? _e : {};
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
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Media publish response body is not valid JSON.', {
                            itemIndex,
                        });
                    }
                    returnItems.push({ json: { message: publishResponse }, pairedItem: { item: itemIndex } });
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
                    const graphApiErrors = (_g = (_f = errorWithGraph.response.body) === null || _f === void 0 ? void 0 : _f.error) !== null && _g !== void 0 ? _g : {};
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