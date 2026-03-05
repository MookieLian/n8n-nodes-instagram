import type { ICredentialType, INodeProperties, Icon } from 'n8n-workflow';
export declare class InstagramWebhook implements ICredentialType {
    name: string;
    displayName: string;
    icon: Icon;
    documentationUrl: string;
    properties: INodeProperties[];
}
