"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instagram = void 0;
const n8n_workflow_1 = require("n8n-workflow");
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
                    description: 'The Instagram Business Account ID or User ID on which to publish the media',
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
    }
    async execute() {
        var _a, _b, _c, _d, _e, _f;
        const items = this.getInputData();
        const returnItems = [];
        for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            try {
                const graphApiCredentials = await this.getCredentials('facebookGraphApi');
                const node = this.getNodeParameter('node', itemIndex);
                const imageUrl = this.getNodeParameter('imageUrl', itemIndex);
                const caption = this.getNodeParameter('caption', itemIndex);
                const hostUrl = 'graph.facebook.com';
                const graphApiVersion = 'v22.0';
                const httpRequestMethod = 'POST';
                const mediaUri = `https://${hostUrl}/${graphApiVersion}/${node}/media`;
                const mediaQs = {
                    access_token: graphApiCredentials.accessToken,
                    image_url: imageUrl,
                    caption: caption,
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
                const publishUri = `https://${hostUrl}/${graphApiVersion}/${node}/media_publish`;
                const publishQs = {
                    access_token: graphApiCredentials.accessToken,
                    creation_id: creationId,
                    image_url: imageUrl,
                    caption: caption,
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
                let publishResponse;
                try {
                    publishResponse = await this.helpers.request(publishRequestOptions);
                }
                catch (error) {
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
                    continue;
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