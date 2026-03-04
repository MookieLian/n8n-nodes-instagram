import type { Event } from '@sentry/node';
export type ErrorLevel = 'fatal' | 'error' | 'warning' | 'info';
export type ErrorTags = NonNullable<Event['tags']>;
export type ReportingOptions = {
    shouldReport?: boolean;
    shouldBeLogged?: boolean;
    level?: ErrorLevel;
    tags?: ErrorTags;
    extra?: Event['extra'];
    executionId?: string;
};
