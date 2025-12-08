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
                    description: 'The Instagram Business Account ID or User ID on which to publish the media',
                    placeholder: 'me',
                    required: true,
                },
                ...resources_1.instagramResourceFields,
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
    }
    async execute() {
        var _a, _b, _c, _d, _e, _f;
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
                const handler = resources_1.instagramResourceHandlers[resource];
                if (!handler) {
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Unsupported resource: ${resource}`, {
                        itemIndex,
                    });
                }
                const node = this.getNodeParameter('node', itemIndex);
                const caption = this.getNodeParameter('caption', itemIndex);
                const hostUrl = 'graph.facebook.com';
                const graphApiVersion = 'v22.0';
                const httpRequestMethod = 'POST';
                const mediaUri = `https://${hostUrl}/${graphApiVersion}/${node}/media`;
                const mediaPayload = handler.buildMediaPayload.call(this, itemIndex);
                const mediaQs = {
                    caption,
                    ...mediaPayload,
                };
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
                        const graphApiErrors = (_b = (_a = err.response.body) === null || _a === void 0 ? void 0 : _a.error) !== null && _b !== void 0 ? _b : {};
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
                            const graphApiErrors = (_d = (_c = err.response.body) === null || _c === void 0 ? void 0 : _c.error) !== null && _d !== void 0 ? _d : {};
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
            }
        }
        return [returnItems];
    }
}
exports.Instagram = Instagram;
//# sourceMappingURL=Instagram.node.js.map