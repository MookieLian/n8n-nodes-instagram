import type { ICredentialTestRequest, ICredentialType, INodeProperties, Icon } from 'n8n-workflow';
export declare class InstagramWebhookApi implements ICredentialType {
    name: string;
    displayName: string;
    icon: Icon;
    documentationUrl: string;
    test: ICredentialTestRequest;
    properties: INodeProperties[];
}
