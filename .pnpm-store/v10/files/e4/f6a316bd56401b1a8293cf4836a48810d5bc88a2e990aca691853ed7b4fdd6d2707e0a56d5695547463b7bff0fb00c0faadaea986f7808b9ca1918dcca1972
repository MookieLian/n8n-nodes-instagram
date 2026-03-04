import type { BaseErrorOptions } from './base.error';
import { BaseError } from './base.error';
export type UserErrorOptions = Omit<BaseErrorOptions, 'level'> & {
    level?: 'info' | 'warning';
    description?: string | null | undefined;
};
/**
 * Error that indicates the user performed an action that caused an error.
 * E.g. provided invalid input, tried to access a resource they’re not
 * authorized to, or violates a business rule.
 *
 * Default level: info
 */
export declare class UserError extends BaseError {
    readonly description: string | null | undefined;
    constructor(message: string, opts?: UserErrorOptions);
}
//# sourceMappingURL=user.error.d.ts.map