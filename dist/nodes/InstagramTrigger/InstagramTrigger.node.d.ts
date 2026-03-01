import type { INodeType, INodeTypeDescription, IWebhookResponseData } from 'n8n-workflow';
import type { IWebhookFunctions } from 'n8n-workflow';
export declare class InstagramTrigger implements INodeType {
    description: INodeTypeDescription;
    webhook(this: IWebhookFunctions): Promise<IWebhookResponseData>;
}
