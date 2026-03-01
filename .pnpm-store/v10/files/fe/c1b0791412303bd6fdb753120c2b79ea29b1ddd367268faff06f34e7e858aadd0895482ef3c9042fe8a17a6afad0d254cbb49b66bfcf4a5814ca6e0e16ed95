import type { DateTime } from 'luxon';
import { z } from 'zod';
import type { INodeCredentials } from './interfaces';
export declare const enum EventMessageTypeNames {
    generic = "$$EventMessage",
    audit = "$$EventMessageAudit",
    confirm = "$$EventMessageConfirm",
    workflow = "$$EventMessageWorkflow",
    node = "$$EventMessageNode",
    execution = "$$EventMessageExecution",
    aiNode = "$$EventMessageAiNode",
    runner = "$$EventMessageRunner",
    queue = "$$EventMessageQueue"
}
export declare const enum MessageEventBusDestinationTypeNames {
    abstract = "$$AbstractMessageEventBusDestination",
    webhook = "$$MessageEventBusDestinationWebhook",
    sentry = "$$MessageEventBusDestinationSentry",
    syslog = "$$MessageEventBusDestinationSyslog"
}
export declare const messageEventBusDestinationTypeNames: MessageEventBusDestinationTypeNames[];
export interface IAbstractEventMessage {
    __type: EventMessageTypeNames;
    id: string;
    ts: DateTime;
    eventName: string;
    message: string;
    payload: any;
}
declare const webhookParameterItemSchema: z.ZodObject<{
    parameters: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        value: z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        value: string | number | boolean | null;
    }, {
        name: string;
        value: string | number | boolean | null;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    parameters: {
        name: string;
        value: string | number | boolean | null;
    }[];
}, {
    parameters: {
        name: string;
        value: string | number | boolean | null;
    }[];
}>;
declare const webhookParameterOptionsSchema: z.ZodOptional<z.ZodObject<{
    batch: z.ZodOptional<z.ZodObject<{
        batchSize: z.ZodOptional<z.ZodNumber>;
        batchInterval: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        batchSize?: number | undefined;
        batchInterval?: number | undefined;
    }, {
        batchSize?: number | undefined;
        batchInterval?: number | undefined;
    }>>;
    allowUnauthorizedCerts: z.ZodOptional<z.ZodBoolean>;
    queryParameterArrays: z.ZodOptional<z.ZodEnum<["indices", "brackets", "repeat"]>>;
    redirect: z.ZodOptional<z.ZodObject<{
        followRedirects: z.ZodOptional<z.ZodBoolean>;
        maxRedirects: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        followRedirects?: boolean | undefined;
        maxRedirects?: number | undefined;
    }, {
        followRedirects?: boolean | undefined;
        maxRedirects?: number | undefined;
    }>>;
    response: z.ZodOptional<z.ZodObject<{
        response: z.ZodOptional<z.ZodObject<{
            fullResponse: z.ZodOptional<z.ZodBoolean>;
            neverError: z.ZodOptional<z.ZodBoolean>;
            responseFormat: z.ZodOptional<z.ZodString>;
            outputPropertyName: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            fullResponse?: boolean | undefined;
            neverError?: boolean | undefined;
            responseFormat?: string | undefined;
            outputPropertyName?: string | undefined;
        }, {
            fullResponse?: boolean | undefined;
            neverError?: boolean | undefined;
            responseFormat?: string | undefined;
            outputPropertyName?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        response?: {
            fullResponse?: boolean | undefined;
            neverError?: boolean | undefined;
            responseFormat?: string | undefined;
            outputPropertyName?: string | undefined;
        } | undefined;
    }, {
        response?: {
            fullResponse?: boolean | undefined;
            neverError?: boolean | undefined;
            responseFormat?: string | undefined;
            outputPropertyName?: string | undefined;
        } | undefined;
    }>>;
    proxy: z.ZodOptional<z.ZodObject<{
        protocol: z.ZodEnum<["https", "http"]>;
        host: z.ZodString;
        port: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        protocol: "https" | "http";
        host: string;
        port: number;
    }, {
        protocol: "https" | "http";
        host: string;
        port: number;
    }>>;
    timeout: z.ZodOptional<z.ZodNumber>;
    socket: z.ZodOptional<z.ZodObject<{
        keepAlive: z.ZodOptional<z.ZodBoolean>;
        maxSockets: z.ZodOptional<z.ZodNumber>;
        maxFreeSockets: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        keepAlive?: boolean | undefined;
        maxSockets?: number | undefined;
        maxFreeSockets?: number | undefined;
    }, {
        keepAlive?: boolean | undefined;
        maxSockets?: number | undefined;
        maxFreeSockets?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    timeout?: number | undefined;
    response?: {
        response?: {
            fullResponse?: boolean | undefined;
            neverError?: boolean | undefined;
            responseFormat?: string | undefined;
            outputPropertyName?: string | undefined;
        } | undefined;
    } | undefined;
    proxy?: {
        protocol: "https" | "http";
        host: string;
        port: number;
    } | undefined;
    batch?: {
        batchSize?: number | undefined;
        batchInterval?: number | undefined;
    } | undefined;
    allowUnauthorizedCerts?: boolean | undefined;
    queryParameterArrays?: "repeat" | "indices" | "brackets" | undefined;
    redirect?: {
        followRedirects?: boolean | undefined;
        maxRedirects?: number | undefined;
    } | undefined;
    socket?: {
        keepAlive?: boolean | undefined;
        maxSockets?: number | undefined;
        maxFreeSockets?: number | undefined;
    } | undefined;
}, {
    timeout?: number | undefined;
    response?: {
        response?: {
            fullResponse?: boolean | undefined;
            neverError?: boolean | undefined;
            responseFormat?: string | undefined;
            outputPropertyName?: string | undefined;
        } | undefined;
    } | undefined;
    proxy?: {
        protocol: "https" | "http";
        host: string;
        port: number;
    } | undefined;
    batch?: {
        batchSize?: number | undefined;
        batchInterval?: number | undefined;
    } | undefined;
    allowUnauthorizedCerts?: boolean | undefined;
    queryParameterArrays?: "repeat" | "indices" | "brackets" | undefined;
    redirect?: {
        followRedirects?: boolean | undefined;
        maxRedirects?: number | undefined;
    } | undefined;
    socket?: {
        keepAlive?: boolean | undefined;
        maxSockets?: number | undefined;
        maxFreeSockets?: number | undefined;
    } | undefined;
}>>;
export declare const MessageEventBusDestinationOptionsSchema: z.ZodObject<{
    __type: z.ZodOptional<z.ZodEnum<["$$AbstractMessageEventBusDestination", "$$MessageEventBusDestinationWebhook", "$$MessageEventBusDestinationSentry", "$$MessageEventBusDestinationSyslog"]>>;
    id: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodString>;
    enabled: z.ZodOptional<z.ZodBoolean>;
    subscribedEvents: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    credentials: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    anonymizeAuditMessages: z.ZodOptional<z.ZodBoolean>;
    circuitBreaker: z.ZodOptional<z.ZodObject<{
        maxFailures: z.ZodOptional<z.ZodNumber>;
        maxDuration: z.ZodOptional<z.ZodNumber>;
        halfOpenRequests: z.ZodOptional<z.ZodNumber>;
        failureWindow: z.ZodOptional<z.ZodNumber>;
        maxConcurrentHalfOpenRequests: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        maxFailures?: number | undefined;
        maxDuration?: number | undefined;
        halfOpenRequests?: number | undefined;
        failureWindow?: number | undefined;
        maxConcurrentHalfOpenRequests?: number | undefined;
    }, {
        maxFailures?: number | undefined;
        maxDuration?: number | undefined;
        halfOpenRequests?: number | undefined;
        failureWindow?: number | undefined;
        maxConcurrentHalfOpenRequests?: number | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    id?: string | undefined;
    credentials?: Record<string, unknown> | undefined;
    enabled?: boolean | undefined;
    __type?: "$$AbstractMessageEventBusDestination" | "$$MessageEventBusDestinationWebhook" | "$$MessageEventBusDestinationSentry" | "$$MessageEventBusDestinationSyslog" | undefined;
    label?: string | undefined;
    subscribedEvents?: string[] | undefined;
    anonymizeAuditMessages?: boolean | undefined;
    circuitBreaker?: {
        maxFailures?: number | undefined;
        maxDuration?: number | undefined;
        halfOpenRequests?: number | undefined;
        failureWindow?: number | undefined;
        maxConcurrentHalfOpenRequests?: number | undefined;
    } | undefined;
}, {
    id?: string | undefined;
    credentials?: Record<string, unknown> | undefined;
    enabled?: boolean | undefined;
    __type?: "$$AbstractMessageEventBusDestination" | "$$MessageEventBusDestinationWebhook" | "$$MessageEventBusDestinationSentry" | "$$MessageEventBusDestinationSyslog" | undefined;
    label?: string | undefined;
    subscribedEvents?: string[] | undefined;
    anonymizeAuditMessages?: boolean | undefined;
    circuitBreaker?: {
        maxFailures?: number | undefined;
        maxDuration?: number | undefined;
        halfOpenRequests?: number | undefined;
        failureWindow?: number | undefined;
        maxConcurrentHalfOpenRequests?: number | undefined;
    } | undefined;
}>;
export declare const MessageEventBusDestinationWebhookOptionsSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodString>;
    enabled: z.ZodOptional<z.ZodBoolean>;
    subscribedEvents: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    credentials: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    anonymizeAuditMessages: z.ZodOptional<z.ZodBoolean>;
    circuitBreaker: z.ZodOptional<z.ZodObject<{
        maxFailures: z.ZodOptional<z.ZodNumber>;
        maxDuration: z.ZodOptional<z.ZodNumber>;
        halfOpenRequests: z.ZodOptional<z.ZodNumber>;
        failureWindow: z.ZodOptional<z.ZodNumber>;
        maxConcurrentHalfOpenRequests: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        maxFailures?: number | undefined;
        maxDuration?: number | undefined;
        halfOpenRequests?: number | undefined;
        failureWindow?: number | undefined;
        maxConcurrentHalfOpenRequests?: number | undefined;
    }, {
        maxFailures?: number | undefined;
        maxDuration?: number | undefined;
        halfOpenRequests?: number | undefined;
        failureWindow?: number | undefined;
        maxConcurrentHalfOpenRequests?: number | undefined;
    }>>;
} & {
    __type: z.ZodLiteral<"$$MessageEventBusDestinationWebhook">;
    url: z.ZodString;
    responseCodeMustMatch: z.ZodOptional<z.ZodBoolean>;
    expectedStatusCode: z.ZodOptional<z.ZodNumber>;
    method: z.ZodOptional<z.ZodString>;
    authentication: z.ZodOptional<z.ZodEnum<["predefinedCredentialType", "genericCredentialType", "none"]>>;
    sendQuery: z.ZodOptional<z.ZodBoolean>;
    sendHeaders: z.ZodOptional<z.ZodBoolean>;
    genericAuthType: z.ZodOptional<z.ZodString>;
    nodeCredentialType: z.ZodOptional<z.ZodString>;
    specifyHeaders: z.ZodOptional<z.ZodString>;
    specifyQuery: z.ZodOptional<z.ZodString>;
    jsonQuery: z.ZodOptional<z.ZodString>;
    jsonHeaders: z.ZodOptional<z.ZodString>;
    headerParameters: z.ZodOptional<z.ZodObject<{
        parameters: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            value: z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            value: string | number | boolean | null;
        }, {
            name: string;
            value: string | number | boolean | null;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        parameters: {
            name: string;
            value: string | number | boolean | null;
        }[];
    }, {
        parameters: {
            name: string;
            value: string | number | boolean | null;
        }[];
    }>>;
    queryParameters: z.ZodOptional<z.ZodObject<{
        parameters: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            value: z.ZodNullable<z.ZodUnion<[z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
        }, "strip", z.ZodTypeAny, {
            name: string;
            value: string | number | boolean | null;
        }, {
            name: string;
            value: string | number | boolean | null;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        parameters: {
            name: string;
            value: string | number | boolean | null;
        }[];
    }, {
        parameters: {
            name: string;
            value: string | number | boolean | null;
        }[];
    }>>;
    sendPayload: z.ZodOptional<z.ZodBoolean>;
    options: z.ZodOptional<z.ZodObject<{
        batch: z.ZodOptional<z.ZodObject<{
            batchSize: z.ZodOptional<z.ZodNumber>;
            batchInterval: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            batchSize?: number | undefined;
            batchInterval?: number | undefined;
        }, {
            batchSize?: number | undefined;
            batchInterval?: number | undefined;
        }>>;
        allowUnauthorizedCerts: z.ZodOptional<z.ZodBoolean>;
        queryParameterArrays: z.ZodOptional<z.ZodEnum<["indices", "brackets", "repeat"]>>;
        redirect: z.ZodOptional<z.ZodObject<{
            followRedirects: z.ZodOptional<z.ZodBoolean>;
            maxRedirects: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            followRedirects?: boolean | undefined;
            maxRedirects?: number | undefined;
        }, {
            followRedirects?: boolean | undefined;
            maxRedirects?: number | undefined;
        }>>;
        response: z.ZodOptional<z.ZodObject<{
            response: z.ZodOptional<z.ZodObject<{
                fullResponse: z.ZodOptional<z.ZodBoolean>;
                neverError: z.ZodOptional<z.ZodBoolean>;
                responseFormat: z.ZodOptional<z.ZodString>;
                outputPropertyName: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                fullResponse?: boolean | undefined;
                neverError?: boolean | undefined;
                responseFormat?: string | undefined;
                outputPropertyName?: string | undefined;
            }, {
                fullResponse?: boolean | undefined;
                neverError?: boolean | undefined;
                responseFormat?: string | undefined;
                outputPropertyName?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            response?: {
                fullResponse?: boolean | undefined;
                neverError?: boolean | undefined;
                responseFormat?: string | undefined;
                outputPropertyName?: string | undefined;
            } | undefined;
        }, {
            response?: {
                fullResponse?: boolean | undefined;
                neverError?: boolean | undefined;
                responseFormat?: string | undefined;
                outputPropertyName?: string | undefined;
            } | undefined;
        }>>;
        proxy: z.ZodOptional<z.ZodObject<{
            protocol: z.ZodEnum<["https", "http"]>;
            host: z.ZodString;
            port: z.ZodNumber;
        }, "strip", z.ZodTypeAny, {
            protocol: "https" | "http";
            host: string;
            port: number;
        }, {
            protocol: "https" | "http";
            host: string;
            port: number;
        }>>;
        timeout: z.ZodOptional<z.ZodNumber>;
        socket: z.ZodOptional<z.ZodObject<{
            keepAlive: z.ZodOptional<z.ZodBoolean>;
            maxSockets: z.ZodOptional<z.ZodNumber>;
            maxFreeSockets: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            keepAlive?: boolean | undefined;
            maxSockets?: number | undefined;
            maxFreeSockets?: number | undefined;
        }, {
            keepAlive?: boolean | undefined;
            maxSockets?: number | undefined;
            maxFreeSockets?: number | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        timeout?: number | undefined;
        response?: {
            response?: {
                fullResponse?: boolean | undefined;
                neverError?: boolean | undefined;
                responseFormat?: string | undefined;
                outputPropertyName?: string | undefined;
            } | undefined;
        } | undefined;
        proxy?: {
            protocol: "https" | "http";
            host: string;
            port: number;
        } | undefined;
        batch?: {
            batchSize?: number | undefined;
            batchInterval?: number | undefined;
        } | undefined;
        allowUnauthorizedCerts?: boolean | undefined;
        queryParameterArrays?: "repeat" | "indices" | "brackets" | undefined;
        redirect?: {
            followRedirects?: boolean | undefined;
            maxRedirects?: number | undefined;
        } | undefined;
        socket?: {
            keepAlive?: boolean | undefined;
            maxSockets?: number | undefined;
            maxFreeSockets?: number | undefined;
        } | undefined;
    }, {
        timeout?: number | undefined;
        response?: {
            response?: {
                fullResponse?: boolean | undefined;
                neverError?: boolean | undefined;
                responseFormat?: string | undefined;
                outputPropertyName?: string | undefined;
            } | undefined;
        } | undefined;
        proxy?: {
            protocol: "https" | "http";
            host: string;
            port: number;
        } | undefined;
        batch?: {
            batchSize?: number | undefined;
            batchInterval?: number | undefined;
        } | undefined;
        allowUnauthorizedCerts?: boolean | undefined;
        queryParameterArrays?: "repeat" | "indices" | "brackets" | undefined;
        redirect?: {
            followRedirects?: boolean | undefined;
            maxRedirects?: number | undefined;
        } | undefined;
        socket?: {
            keepAlive?: boolean | undefined;
            maxSockets?: number | undefined;
            maxFreeSockets?: number | undefined;
        } | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    url: string;
    __type: "$$MessageEventBusDestinationWebhook";
    id?: string | undefined;
    options?: {
        timeout?: number | undefined;
        response?: {
            response?: {
                fullResponse?: boolean | undefined;
                neverError?: boolean | undefined;
                responseFormat?: string | undefined;
                outputPropertyName?: string | undefined;
            } | undefined;
        } | undefined;
        proxy?: {
            protocol: "https" | "http";
            host: string;
            port: number;
        } | undefined;
        batch?: {
            batchSize?: number | undefined;
            batchInterval?: number | undefined;
        } | undefined;
        allowUnauthorizedCerts?: boolean | undefined;
        queryParameterArrays?: "repeat" | "indices" | "brackets" | undefined;
        redirect?: {
            followRedirects?: boolean | undefined;
            maxRedirects?: number | undefined;
        } | undefined;
        socket?: {
            keepAlive?: boolean | undefined;
            maxSockets?: number | undefined;
            maxFreeSockets?: number | undefined;
        } | undefined;
    } | undefined;
    credentials?: Record<string, unknown> | undefined;
    enabled?: boolean | undefined;
    method?: string | undefined;
    authentication?: "none" | "predefinedCredentialType" | "genericCredentialType" | undefined;
    genericAuthType?: string | undefined;
    nodeCredentialType?: string | undefined;
    sendHeaders?: boolean | undefined;
    specifyHeaders?: string | undefined;
    jsonHeaders?: string | undefined;
    sendQuery?: boolean | undefined;
    specifyQuery?: string | undefined;
    jsonQuery?: string | undefined;
    label?: string | undefined;
    subscribedEvents?: string[] | undefined;
    anonymizeAuditMessages?: boolean | undefined;
    circuitBreaker?: {
        maxFailures?: number | undefined;
        maxDuration?: number | undefined;
        halfOpenRequests?: number | undefined;
        failureWindow?: number | undefined;
        maxConcurrentHalfOpenRequests?: number | undefined;
    } | undefined;
    responseCodeMustMatch?: boolean | undefined;
    expectedStatusCode?: number | undefined;
    headerParameters?: {
        parameters: {
            name: string;
            value: string | number | boolean | null;
        }[];
    } | undefined;
    queryParameters?: {
        parameters: {
            name: string;
            value: string | number | boolean | null;
        }[];
    } | undefined;
    sendPayload?: boolean | undefined;
}, {
    url: string;
    __type: "$$MessageEventBusDestinationWebhook";
    id?: string | undefined;
    options?: {
        timeout?: number | undefined;
        response?: {
            response?: {
                fullResponse?: boolean | undefined;
                neverError?: boolean | undefined;
                responseFormat?: string | undefined;
                outputPropertyName?: string | undefined;
            } | undefined;
        } | undefined;
        proxy?: {
            protocol: "https" | "http";
            host: string;
            port: number;
        } | undefined;
        batch?: {
            batchSize?: number | undefined;
            batchInterval?: number | undefined;
        } | undefined;
        allowUnauthorizedCerts?: boolean | undefined;
        queryParameterArrays?: "repeat" | "indices" | "brackets" | undefined;
        redirect?: {
            followRedirects?: boolean | undefined;
            maxRedirects?: number | undefined;
        } | undefined;
        socket?: {
            keepAlive?: boolean | undefined;
            maxSockets?: number | undefined;
            maxFreeSockets?: number | undefined;
        } | undefined;
    } | undefined;
    credentials?: Record<string, unknown> | undefined;
    enabled?: boolean | undefined;
    method?: string | undefined;
    authentication?: "none" | "predefinedCredentialType" | "genericCredentialType" | undefined;
    genericAuthType?: string | undefined;
    nodeCredentialType?: string | undefined;
    sendHeaders?: boolean | undefined;
    specifyHeaders?: string | undefined;
    jsonHeaders?: string | undefined;
    sendQuery?: boolean | undefined;
    specifyQuery?: string | undefined;
    jsonQuery?: string | undefined;
    label?: string | undefined;
    subscribedEvents?: string[] | undefined;
    anonymizeAuditMessages?: boolean | undefined;
    circuitBreaker?: {
        maxFailures?: number | undefined;
        maxDuration?: number | undefined;
        halfOpenRequests?: number | undefined;
        failureWindow?: number | undefined;
        maxConcurrentHalfOpenRequests?: number | undefined;
    } | undefined;
    responseCodeMustMatch?: boolean | undefined;
    expectedStatusCode?: number | undefined;
    headerParameters?: {
        parameters: {
            name: string;
            value: string | number | boolean | null;
        }[];
    } | undefined;
    queryParameters?: {
        parameters: {
            name: string;
            value: string | number | boolean | null;
        }[];
    } | undefined;
    sendPayload?: boolean | undefined;
}>;
export declare const MessageEventBusDestinationSentryOptionsSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodString>;
    enabled: z.ZodOptional<z.ZodBoolean>;
    subscribedEvents: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    credentials: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    anonymizeAuditMessages: z.ZodOptional<z.ZodBoolean>;
    circuitBreaker: z.ZodOptional<z.ZodObject<{
        maxFailures: z.ZodOptional<z.ZodNumber>;
        maxDuration: z.ZodOptional<z.ZodNumber>;
        halfOpenRequests: z.ZodOptional<z.ZodNumber>;
        failureWindow: z.ZodOptional<z.ZodNumber>;
        maxConcurrentHalfOpenRequests: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        maxFailures?: number | undefined;
        maxDuration?: number | undefined;
        halfOpenRequests?: number | undefined;
        failureWindow?: number | undefined;
        maxConcurrentHalfOpenRequests?: number | undefined;
    }, {
        maxFailures?: number | undefined;
        maxDuration?: number | undefined;
        halfOpenRequests?: number | undefined;
        failureWindow?: number | undefined;
        maxConcurrentHalfOpenRequests?: number | undefined;
    }>>;
} & {
    __type: z.ZodLiteral<"$$MessageEventBusDestinationSentry">;
    dsn: z.ZodString;
    tracesSampleRate: z.ZodOptional<z.ZodNumber>;
    sendPayload: z.ZodOptional<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    __type: "$$MessageEventBusDestinationSentry";
    dsn: string;
    id?: string | undefined;
    credentials?: Record<string, unknown> | undefined;
    enabled?: boolean | undefined;
    label?: string | undefined;
    subscribedEvents?: string[] | undefined;
    anonymizeAuditMessages?: boolean | undefined;
    circuitBreaker?: {
        maxFailures?: number | undefined;
        maxDuration?: number | undefined;
        halfOpenRequests?: number | undefined;
        failureWindow?: number | undefined;
        maxConcurrentHalfOpenRequests?: number | undefined;
    } | undefined;
    sendPayload?: boolean | undefined;
    tracesSampleRate?: number | undefined;
}, {
    __type: "$$MessageEventBusDestinationSentry";
    dsn: string;
    id?: string | undefined;
    credentials?: Record<string, unknown> | undefined;
    enabled?: boolean | undefined;
    label?: string | undefined;
    subscribedEvents?: string[] | undefined;
    anonymizeAuditMessages?: boolean | undefined;
    circuitBreaker?: {
        maxFailures?: number | undefined;
        maxDuration?: number | undefined;
        halfOpenRequests?: number | undefined;
        failureWindow?: number | undefined;
        maxConcurrentHalfOpenRequests?: number | undefined;
    } | undefined;
    sendPayload?: boolean | undefined;
    tracesSampleRate?: number | undefined;
}>;
export declare const MessageEventBusDestinationSyslogOptionsSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    label: z.ZodOptional<z.ZodString>;
    enabled: z.ZodOptional<z.ZodBoolean>;
    subscribedEvents: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
    credentials: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    anonymizeAuditMessages: z.ZodOptional<z.ZodBoolean>;
    circuitBreaker: z.ZodOptional<z.ZodObject<{
        maxFailures: z.ZodOptional<z.ZodNumber>;
        maxDuration: z.ZodOptional<z.ZodNumber>;
        halfOpenRequests: z.ZodOptional<z.ZodNumber>;
        failureWindow: z.ZodOptional<z.ZodNumber>;
        maxConcurrentHalfOpenRequests: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        maxFailures?: number | undefined;
        maxDuration?: number | undefined;
        halfOpenRequests?: number | undefined;
        failureWindow?: number | undefined;
        maxConcurrentHalfOpenRequests?: number | undefined;
    }, {
        maxFailures?: number | undefined;
        maxDuration?: number | undefined;
        halfOpenRequests?: number | undefined;
        failureWindow?: number | undefined;
        maxConcurrentHalfOpenRequests?: number | undefined;
    }>>;
} & {
    __type: z.ZodLiteral<"$$MessageEventBusDestinationSyslog">;
    expectedStatusCode: z.ZodOptional<z.ZodNumber>;
    host: z.ZodString;
    port: z.ZodOptional<z.ZodNumber>;
    protocol: z.ZodOptional<z.ZodEnum<["udp", "tcp", "tls"]>>;
    facility: z.ZodOptional<z.ZodNumber>;
    app_name: z.ZodOptional<z.ZodString>;
    eol: z.ZodOptional<z.ZodString>;
    tlsCa: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    host: string;
    __type: "$$MessageEventBusDestinationSyslog";
    id?: string | undefined;
    credentials?: Record<string, unknown> | undefined;
    enabled?: boolean | undefined;
    protocol?: "udp" | "tcp" | "tls" | undefined;
    port?: number | undefined;
    label?: string | undefined;
    subscribedEvents?: string[] | undefined;
    anonymizeAuditMessages?: boolean | undefined;
    circuitBreaker?: {
        maxFailures?: number | undefined;
        maxDuration?: number | undefined;
        halfOpenRequests?: number | undefined;
        failureWindow?: number | undefined;
        maxConcurrentHalfOpenRequests?: number | undefined;
    } | undefined;
    expectedStatusCode?: number | undefined;
    facility?: number | undefined;
    app_name?: string | undefined;
    eol?: string | undefined;
    tlsCa?: string | undefined;
}, {
    host: string;
    __type: "$$MessageEventBusDestinationSyslog";
    id?: string | undefined;
    credentials?: Record<string, unknown> | undefined;
    enabled?: boolean | undefined;
    protocol?: "udp" | "tcp" | "tls" | undefined;
    port?: number | undefined;
    label?: string | undefined;
    subscribedEvents?: string[] | undefined;
    anonymizeAuditMessages?: boolean | undefined;
    circuitBreaker?: {
        maxFailures?: number | undefined;
        maxDuration?: number | undefined;
        halfOpenRequests?: number | undefined;
        failureWindow?: number | undefined;
        maxConcurrentHalfOpenRequests?: number | undefined;
    } | undefined;
    expectedStatusCode?: number | undefined;
    facility?: number | undefined;
    app_name?: string | undefined;
    eol?: string | undefined;
    tlsCa?: string | undefined;
}>;
export type MessageEventBusDestinationOptions = Omit<z.infer<typeof MessageEventBusDestinationOptionsSchema>, '__type' | 'credentials'> & {
    __type?: MessageEventBusDestinationTypeNames;
    credentials?: INodeCredentials;
};
export type MessageEventBusDestinationWebhookParameterItem = z.infer<typeof webhookParameterItemSchema>;
export type MessageEventBusDestinationWebhookParameterOptions = z.infer<typeof webhookParameterOptionsSchema>;
export type MessageEventBusDestinationWebhookOptions = Omit<z.infer<typeof MessageEventBusDestinationWebhookOptionsSchema>, '__type' | 'credentials'> & {
    __type?: MessageEventBusDestinationTypeNames;
    credentials?: INodeCredentials;
};
export type MessageEventBusDestinationSyslogOptions = Omit<z.infer<typeof MessageEventBusDestinationSyslogOptionsSchema>, '__type' | 'credentials'> & {
    __type?: MessageEventBusDestinationTypeNames;
    credentials?: INodeCredentials;
};
export type MessageEventBusDestinationSentryOptions = Omit<z.infer<typeof MessageEventBusDestinationSentryOptionsSchema>, '__type' | 'credentials'> & {
    __type?: MessageEventBusDestinationTypeNames;
    credentials?: INodeCredentials;
};
export declare const defaultMessageEventBusDestinationOptions: MessageEventBusDestinationOptions;
export declare const defaultMessageEventBusDestinationSyslogOptions: MessageEventBusDestinationSyslogOptions;
export declare const defaultMessageEventBusDestinationWebhookOptions: MessageEventBusDestinationWebhookOptions;
export declare const defaultMessageEventBusDestinationSentryOptions: MessageEventBusDestinationSentryOptions;
export {};
//# sourceMappingURL=message-event-bus.d.ts.map