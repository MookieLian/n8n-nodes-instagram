import type { IDataObject, IExecuteFunctions, INodeProperties, INodePropertyOptions } from 'n8n-workflow';
export type InstagramResourceType = 'image' | 'reels' | 'stories';
export interface ResourceHandler {
    value: InstagramResourceType;
    option: INodePropertyOptions;
    fields: INodeProperties[];
    pollIntervalMs: number;
    maxPollAttempts: number;
    publishRetryDelay: number;
    publishMaxAttempts: number;
    buildMediaPayload(this: IExecuteFunctions, itemIndex: number): IDataObject;
}
