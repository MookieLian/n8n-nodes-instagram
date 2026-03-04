import z, { type ZodType } from 'zod/v4';
declare const CredentialContextSchemaV1: z.ZodObject<{
    version: z.ZodLiteral<1>;
    identity: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.core.$strip>;
export type ICredentialContextV1 = z.output<typeof CredentialContextSchemaV1>;
export declare const CredentialContextSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    version: z.ZodLiteral<1>;
    identity: z.ZodString;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.core.$strip>]>;
/**
 * Decrypted structure of credentials field
 * Never stored in this form - always encrypted in IExecutionContext
 */
export type ICredentialContext = z.output<typeof CredentialContextSchema>;
declare const WorkflowExecuteModeSchema: z.ZodUnion<readonly [z.ZodLiteral<"cli">, z.ZodLiteral<"error">, z.ZodLiteral<"integrated">, z.ZodLiteral<"internal">, z.ZodLiteral<"manual">, z.ZodLiteral<"retry">, z.ZodLiteral<"trigger">, z.ZodLiteral<"webhook">, z.ZodLiteral<"evaluation">, z.ZodLiteral<"chat">]>;
export type WorkflowExecuteModeValues = z.infer<typeof WorkflowExecuteModeSchema>;
declare const ExecutionContextSchemaV1: z.ZodObject<{
    version: z.ZodLiteral<1>;
    establishedAt: z.ZodNumber;
    source: z.ZodUnion<readonly [z.ZodLiteral<"cli">, z.ZodLiteral<"error">, z.ZodLiteral<"integrated">, z.ZodLiteral<"internal">, z.ZodLiteral<"manual">, z.ZodLiteral<"retry">, z.ZodLiteral<"trigger">, z.ZodLiteral<"webhook">, z.ZodLiteral<"evaluation">, z.ZodLiteral<"chat">]>;
    triggerNode: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodString;
    }, z.core.$strip>>;
    parentExecutionId: z.ZodOptional<z.ZodString>;
    credentials: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type IExecutionContextV1 = z.output<typeof ExecutionContextSchemaV1>;
export declare const ExecutionContextSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    version: z.ZodLiteral<1>;
    establishedAt: z.ZodNumber;
    source: z.ZodUnion<readonly [z.ZodLiteral<"cli">, z.ZodLiteral<"error">, z.ZodLiteral<"integrated">, z.ZodLiteral<"internal">, z.ZodLiteral<"manual">, z.ZodLiteral<"retry">, z.ZodLiteral<"trigger">, z.ZodLiteral<"webhook">, z.ZodLiteral<"evaluation">, z.ZodLiteral<"chat">]>;
    triggerNode: z.ZodOptional<z.ZodObject<{
        name: z.ZodString;
        type: z.ZodString;
    }, z.core.$strip>>;
    parentExecutionId: z.ZodOptional<z.ZodString>;
    credentials: z.ZodOptional<z.ZodString>;
}, z.core.$strip>]>;
/**
 * Execution context carries per-execution metadata throughout workflow lifecycle
 * Established at execution start and propagated to sub-workflows/error workflows
 */
export type IExecutionContext = z.output<typeof ExecutionContextSchema>;
/**
 * Runtime representation of execution context with decrypted credential data.
 *
 * This type is identical to IExecutionContext except the `credentials` field
 * contains the decrypted ICredentialContext object instead of an encrypted string.
 *
 * **Usage contexts:**
 * - Hook execution: Hooks work with plaintext context to extract/merge credential data
 * - Credential resolution: Resolvers need decrypted identity tokens
 * - Internal processing: Runtime operations that need access to credential context
 *
 * **Security notes:**
 * - Never persist this type to database - use IExecutionContext with encrypted credentials
 * - Never expose in API responses or logs
 * - Only exists in-memory during workflow execution
 * - Should be cleared from memory after use
 *
 * **Lifecycle:**
 * 1. Load IExecutionContext from storage (credentials encrypted)
 * 2. Decrypt credentials field → PlaintextExecutionContext (runtime only)
 * 3. Use for hook execution, credential resolution, etc.
 * 4. Encrypt credentials → IExecutionContext before persistence
 *
 * @see IExecutionContext - Persisted form with encrypted credentials
 * @see ICredentialContext - Decrypted credential structure
 * @see IExecutionContextUpdate - Partial updates during hook execution
 *
 * @example
 * ```typescript
 * // During hook execution:
 * const plaintextContext: PlaintextExecutionContext = {
 *   ...context,
 *   credentials: decryptCredentials(context.credentials) // Decrypt for runtime use
 * };
 *
 * // Hook can now access plaintext credential data
 * const identity = plaintextContext.credentials?.identity;
 *
 * // Before storage, re-encrypt:
 * const storableContext: IExecutionContext = {
 *   ...plaintextContext,
 *   credentials: encryptCredentials(plaintextContext.credentials)
 * };
 * ```
 */
export type PlaintextExecutionContext = Omit<IExecutionContext, 'credentials'> & {
    credentials?: ICredentialContext;
};
export declare const safeParse: <T extends ZodType>(value: string | object, schema: T) => z.core.output<T>;
/**
 * Safely parses an execution context from an
 * @param obj
 * @returns
 */
export declare const toExecutionContext: (value: string | object) => IExecutionContext;
/**
 * Safely parses a credential context from either an object or a string to an
 * ICredentialContext. This can be used to safely parse a decrypted context for
 * example.
 * @param value The object or string to be parsed
 * @returns ICredentialContext
 * @throws Error in case parsing fails for any reason
 */
export declare const toCredentialContext: (value: string | object) => ICredentialContext;
export {};
//# sourceMappingURL=execution-context.d.ts.map