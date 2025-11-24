"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instagram = void 0;
const sleep = (ms) => new Promise((resolve) => {
    globalThis.setTimeout(() => resolve(), ms);
});
const n8n_workflow_1 = require("n8n-workflow");
const resources_1 = require("./resources");
const READY_STATUSES = new Set(['FINISHED', 'PUBLISHED', 'READY']);
const ERROR_STATUSES = new Set(['ERROR', 'FAILED']);
class Instagram {
    constructor() {
        this.description = {
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
            inputs: [n8n_workflow_1.NodeConnectionTypes.Main],
            outputs: [n8n_workflow_1.NodeConnectionTypes.Main],
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
                    options: resources_1.instagramResourceOptions,
                    default: 'image',
                    description: 'Select the Instagram media type to publish.',
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
        const waitForContainerReady = async ({ creationId, hostUrl, graphApiVersion, accessToken, itemIndex, pollIntervalMs, maxPollAttempts, }) => {
            const statusUri = `https://${hostUrl}/${graphApiVersion}/${creationId}`;
            const statusFields = ['status_code', 'status'];
            const pollRequestOptions = {
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
            let lastStatus;
            for (let attempt = 1; attempt <= maxPollAttempts; attempt++) {
                const statusResponse = (await this.helpers.request(pollRequestOptions));
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
                await sleep(pollIntervalMs);
            }
            throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Timed out waiting for container to become ready. Last known status: ${lastStatus !== null && lastStatus !== void 0 ? lastStatus : 'unknown'}.`, { itemIndex });
        };
        const isMediaNotReadyError = (error) => {
            var _a, _b, _c, _d;
            const graphError = (_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.body) === null || _b === void 0 ? void 0 : _b.error;
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
                const graphApiCredentials = await this.getCredentials('facebookGraphApi');
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
                    access_token: graphApiCredentials.accessToken,
                    caption,
                    ...mediaPayload,
                };
                const mediaRequestOptions = {
                    headers: {
                        accept: 'application/json,text/*;q=0.99',
                    },
                    method: httpRequestMethod,
                    uri: mediaUri,
                    qs: mediaQs,
                    json: true,
                    gzip: true,
                };
                let mediaResponse;
                try {
                    mediaResponse = await this.helpers.request(mediaRequestOptions);
                }
                catch (error) {
                    if (!this.continueOnFail()) {
                        throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                    }
                    let errorItem;
                    if (error.response !== undefined) {
                        const graphApiErrors = (_b = (_a = error.response.body) === null || _a === void 0 ? void 0 : _a.error) !== null && _b !== void 0 ? _b : {};
                        errorItem = {
                            statusCode: error.statusCode,
                            ...graphApiErrors,
                            headers: error.response.headers,
                        };
                    }
                    else {
                        errorItem = error;
                    }
                    returnItems.push({ json: { ...errorItem } });
                    continue;
                }
                if (typeof mediaResponse === 'string') {
                    if (!this.continueOnFail()) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Media creation response body is not valid JSON.', {
                            itemIndex,
                        });
                    }
                    returnItems.push({ json: { message: mediaResponse } });
                    continue;
                }
                const creationId = mediaResponse.id;
                if (!creationId) {
                    if (!this.continueOnFail()) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Media creation response did not contain an id (creation_id).', { itemIndex });
                    }
                    returnItems.push({ json: { error: 'No creation_id in response', response: mediaResponse } });
                    continue;
                }
                await waitForContainerReady({
                    creationId,
                    hostUrl,
                    graphApiVersion,
                    accessToken: graphApiCredentials.accessToken,
                    itemIndex,
                    pollIntervalMs: handler.pollIntervalMs,
                    maxPollAttempts: handler.maxPollAttempts,
                });
                const publishUri = `https://${hostUrl}/${graphApiVersion}/${node}/media_publish`;
                const publishQs = {
                    access_token: graphApiCredentials.accessToken,
                    creation_id: creationId,
                };
                const publishRequestOptions = {
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
                let publishResponse;
                let publishSucceeded = false;
                let publishFailedWithError = false;
                for (let attempt = 1; attempt <= publishMaxAttempts; attempt++) {
                    try {
                        publishResponse = await this.helpers.request(publishRequestOptions);
                        publishSucceeded = true;
                        break;
                    }
                    catch (error) {
                        if (isMediaNotReadyError(error) && attempt < publishMaxAttempts) {
                            await sleep(publishRetryDelay);
                            continue;
                        }
                        if (!this.continueOnFail()) {
                            throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                        }
                        let errorItem;
                        if (error.response !== undefined) {
                            const graphApiErrors = (_d = (_c = error.response.body) === null || _c === void 0 ? void 0 : _c.error) !== null && _d !== void 0 ? _d : {};
                            errorItem = {
                                statusCode: error.statusCode,
                                ...graphApiErrors,
                                headers: error.response.headers,
                                creation_id: creationId,
                                note: 'Media was created but publishing failed',
                            };
                        }
                        else {
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
                    throw new n8n_workflow_1.NodeOperationError(this.getNode(), `Failed to publish media after ${publishMaxAttempts} attempts due to container not being ready.`, { itemIndex });
                }
                if (typeof publishResponse === 'string') {
                    if (!this.continueOnFail()) {
                        throw new n8n_workflow_1.NodeOperationError(this.getNode(), 'Media publish response body is not valid JSON.', {
                            itemIndex,
                        });
                    }
                    returnItems.push({ json: { message: publishResponse } });
                    continue;
                }
                returnItems.push({ json: publishResponse });
            }
            catch (error) {
                if (!this.continueOnFail()) {
                    throw new n8n_workflow_1.NodeApiError(this.getNode(), error);
                }
                let errorItem;
                if (error.response !== undefined) {
                    const graphApiErrors = (_f = (_e = error.response.body) === null || _e === void 0 ? void 0 : _e.error) !== null && _f !== void 0 ? _f : {};
                    errorItem = {
                        statusCode: error.statusCode,
                        ...graphApiErrors,
                        headers: error.response.headers,
                    };
                }
                else {
                    errorItem = error;
                }
                returnItems.push({ json: { ...errorItem } });
            }
        }
        return [returnItems];
    }
}
exports.Instagram = Instagram;
//# sourceMappingURL=Instagram.node.js.map