import type { AssignmentCollectionValue, FilterValue, IconOrEmoji, INodeCredentials, INodeCredentialsDetails, INodeParameterResourceLocator, INodeParameters, NodeConnectionType, NodeParameterValueType, OnError, ResourceMapperValue, ResourceMapperField, FieldType, INodePropertyOptions, IDisplayOptions, INodePropertyRouting, FilterOptionsValue, FilterOperatorValue, FilterConditionValue, FilterOperatorType, AssignmentValue, DisplayCondition, INode, IN8nRequestOperations, IN8nRequestOperationPaginationGeneric, IDataObject, IN8nRequestOperationPaginationOffset, DeclarativeRestApiSettings, INodeRequestOutput, PostReceiveAction, IPostReceiveBinaryData, IPostReceiveFilter, IPostReceiveLimit, IPostReceiveRootProperty, IPostReceiveSet, IPostReceiveSetKeyValue, IPostReceiveSort, INodeRequestSend, GenericValue } from './interfaces';
import { z } from 'zod';
export declare const INodeParameterResourceLocatorSchema: z.ZodType<INodeParameterResourceLocator>;
export declare const FieldTypeSchema: z.ZodType<FieldType>;
export declare const GenericValueSchema: z.ZodType<GenericValue>;
export declare const IDataObjectSchema: z.ZodType<IDataObject>;
export declare const IRequestOptionsSimplifiedAuthSchema: z.ZodObject<{
    auth: z.ZodOptional<z.ZodObject<{
        username: z.ZodString;
        password: z.ZodString;
        sendImmediately: z.ZodOptional<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        password: string;
        username: string;
        sendImmediately?: boolean | undefined;
    }, {
        password: string;
        username: string;
        sendImmediately?: boolean | undefined;
    }>>;
    body: z.ZodOptional<z.ZodObject<{}, "strip", z.ZodTypeAny, {}, {}>>;
    headers: z.ZodOptional<z.ZodType<IDataObject, z.ZodTypeDef, IDataObject>>;
    qs: z.ZodOptional<z.ZodType<IDataObject, z.ZodTypeDef, IDataObject>>;
    url: z.ZodOptional<z.ZodString>;
    skipSslCertificateValidation: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodString]>>;
}, "strip", z.ZodTypeAny, {
    url?: string | undefined;
    body?: {} | undefined;
    headers?: IDataObject | undefined;
    qs?: IDataObject | undefined;
    auth?: {
        password: string;
        username: string;
        sendImmediately?: boolean | undefined;
    } | undefined;
    skipSslCertificateValidation?: string | boolean | undefined;
}, {
    url?: string | undefined;
    body?: {} | undefined;
    headers?: IDataObject | undefined;
    qs?: IDataObject | undefined;
    auth?: {
        password: string;
        username: string;
        sendImmediately?: boolean | undefined;
    } | undefined;
    skipSslCertificateValidation?: string | boolean | undefined;
}>;
export declare const IN8nRequestOperationPaginationBaseSchema: z.ZodObject<{
    type: z.ZodString;
    properties: z.ZodRecord<z.ZodString, z.ZodUnknown>;
}, "strip", z.ZodTypeAny, {
    type: string;
    properties: Record<string, unknown>;
}, {
    type: string;
    properties: Record<string, unknown>;
}>;
export declare const IN8nRequestOperationPaginationGenericSchema: z.ZodType<IN8nRequestOperationPaginationGeneric>;
export declare const IN8nRequestOperationPaginationOffsetSchema: z.ZodType<IN8nRequestOperationPaginationOffset>;
export declare const IN8nRequestOperationsSchema: z.ZodType<IN8nRequestOperations>;
export declare const IPostReceiveBaseSchema: z.ZodObject<{
    type: z.ZodString;
    enabled: z.ZodOptional<z.ZodUnion<[z.ZodBoolean, z.ZodString]>>;
    properties: z.ZodRecord<z.ZodString, z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodType<IDataObject, z.ZodTypeDef, IDataObject>]>>;
    errorMessage: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    type: string;
    properties: Record<string, string | number | boolean | IDataObject>;
    errorMessage?: string | undefined;
    enabled?: string | boolean | undefined;
}, {
    type: string;
    properties: Record<string, string | number | boolean | IDataObject>;
    errorMessage?: string | undefined;
    enabled?: string | boolean | undefined;
}>;
export declare const IPostReceiveBinaryDataSchema: z.ZodType<IPostReceiveBinaryData>;
export declare const IPostReceiveFilterSchema: z.ZodType<IPostReceiveFilter>;
export declare const IPostReceiveLimitSchema: z.ZodType<IPostReceiveLimit>;
export declare const IPostReceiveRootPropertySchema: z.ZodType<IPostReceiveRootProperty>;
export declare const IPostReceiveSetSchema: z.ZodType<IPostReceiveSet>;
export declare const IPostReceiveSetKeyValueSchema: z.ZodType<IPostReceiveSetKeyValue>;
export declare const IPostReceiveSortSchema: z.ZodType<IPostReceiveSort>;
export declare const PostReceiveActionSchema: z.ZodType<PostReceiveAction>;
export declare const INodeRequestOutputSchema: z.ZodType<INodeRequestOutput>;
export declare const HttpRequestOptionsSchema: z.ZodType<DeclarativeRestApiSettings.HttpRequestOptions>;
export declare const INodeRequestSendSchema: z.ZodType<INodeRequestSend>;
export declare const INodePropertyRoutingSchema: z.ZodType<INodePropertyRouting>;
export declare const NumberOrStringSchema: z.ZodUnion<[z.ZodNumber, z.ZodString]>;
export declare const DisplayConditionSchema: z.ZodType<DisplayCondition>;
export declare const IDisplayOptionsSchema: z.ZodType<IDisplayOptions>;
export declare const NodeConnectionTypeSchema: z.ZodType<NodeConnectionType>;
export declare const INodePropertyOptionsSchema: z.ZodType<INodePropertyOptions>;
export declare const ResourceMapperFieldSchema: z.ZodType<ResourceMapperField>;
export declare const ResourceMapperValueSchema: z.ZodType<ResourceMapperValue>;
export declare const FilterOptionsValueSchema: z.ZodType<FilterOptionsValue>;
export declare const FilterOperatorTypeSchema: z.ZodType<FilterOperatorType>;
export declare const FilterOperatorValueSchema: z.ZodType<FilterOperatorValue>;
export declare const FilterConditionValueSchema: z.ZodType<FilterConditionValue>;
export declare const FilterTypeCombinatorSchema: z.ZodEnum<["and", "or"]>;
export declare const FilterValueSchema: z.ZodType<FilterValue>;
export declare const AssignmentValueSchema: z.ZodType<AssignmentValue>;
export declare const AssignmentCollectionValueSchema: z.ZodType<AssignmentCollectionValue>;
export declare const IconOrEmojiSchema: z.ZodType<IconOrEmoji>;
export declare const NodeParameterValueTypeSchema: z.ZodType<NodeParameterValueType>;
export declare const INodeParametersSchema: z.ZodType<INodeParameters>;
export declare const OnErrorSchema: z.ZodType<OnError>;
export declare const INodeCredentialsDetailsSchema: z.ZodType<INodeCredentialsDetails>;
export declare const INodeCredentialsSchema: z.ZodType<INodeCredentials>;
export declare const INodeSchema: z.ZodType<INode>;
export declare const INodesSchema: z.ZodType<INode[]>;
//# sourceMappingURL=schemas.d.ts.map