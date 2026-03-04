var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "zod/v4", "./utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.toCredentialContext = exports.toExecutionContext = exports.safeParse = exports.ExecutionContextSchema = exports.CredentialContextSchema = void 0;
    const v4_1 = __importDefault(require("zod/v4"));
    const utils_1 = require("./utils");
    const CredentialContextSchemaV1 = v4_1.default.object({
        version: v4_1.default.literal(1),
        /**
         * Identity token/value used for credential resolution
         * Could be JWT, API key, session token, user ID, etc.
         */
        identity: v4_1.default.string(),
        /**
         * Optional metadata for credential resolution
         */
        metadata: v4_1.default.record(v4_1.default.string(), v4_1.default.unknown()).optional(),
    });
    exports.CredentialContextSchema = v4_1.default
        .discriminatedUnion('version', [CredentialContextSchemaV1])
        .meta({
        title: 'ICredentialContext',
    });
    const WorkflowExecuteModeSchema = v4_1.default.union([
        v4_1.default.literal('cli'),
        v4_1.default.literal('error'),
        v4_1.default.literal('integrated'),
        v4_1.default.literal('internal'),
        v4_1.default.literal('manual'),
        v4_1.default.literal('retry'),
        v4_1.default.literal('trigger'),
        v4_1.default.literal('webhook'),
        v4_1.default.literal('evaluation'),
        v4_1.default.literal('chat'),
    ]);
    const ExecutionContextSchemaV1 = v4_1.default.object({
        version: v4_1.default.literal(1),
        /**
         * When the context was established (Unix timestamp in milliseconds)
         */
        establishedAt: v4_1.default.number(),
        /**
         * The mode in which the workflow is being executed
         */
        source: WorkflowExecuteModeSchema,
        /**
         * Optional node where execution started
         */
        triggerNode: v4_1.default
            .object({
            name: v4_1.default.string(),
            type: v4_1.default.string(),
        })
            .optional(),
        /**
         * Optional ID of the parent execution, if this is set this
         * execution context inherited from the mentioned parent execution context.
         */
        parentExecutionId: v4_1.default.string().optional(),
        /**
         * Encrypted credential context for dynamic credential resolution
         * Always encrypted when stored, decrypted on-demand by credential resolver
         * @see ICredentialContext for decrypted structure
         */
        credentials: v4_1.default.string().optional().meta({
            description: 'Encrypted credential context for dynamic credential resolution Always encrypted when stored, decrypted on-demand by credential resolver @see ICredentialContext for decrypted structure',
        }),
    });
    exports.ExecutionContextSchema = v4_1.default
        .discriminatedUnion('version', [ExecutionContextSchemaV1])
        .meta({
        title: 'IExecutionContext',
    });
    const safeParse = (value, schema) => {
        const typeName = schema.meta()?.title ?? 'Object';
        try {
            const normalizedObject = typeof value === 'string' ? (0, utils_1.jsonParse)(value) : value;
            const parseResult = schema.safeParse(normalizedObject);
            if (parseResult.error) {
                throw parseResult.error;
            }
            // here we could implement a mgiration policy for migrating old execution context versions to newer ones
            return parseResult.data;
        }
        catch (error) {
            throw new Error(`Failed to parse to valid ${typeName}`, {
                cause: error,
            });
        }
    };
    exports.safeParse = safeParse;
    /**
     * Safely parses an execution context from an
     * @param obj
     * @returns
     */
    const toExecutionContext = (value) => {
        // here we could implement a mgiration policy for migrating old execution context versions to newer ones
        return (0, exports.safeParse)(value, exports.ExecutionContextSchema);
    };
    exports.toExecutionContext = toExecutionContext;
    /**
     * Safely parses a credential context from either an object or a string to an
     * ICredentialContext. This can be used to safely parse a decrypted context for
     * example.
     * @param value The object or string to be parsed
     * @returns ICredentialContext
     * @throws Error in case parsing fails for any reason
     */
    const toCredentialContext = (value) => {
        // here we could implement a mgiration policy for migrating old credential context versions to newer ones
        return (0, exports.safeParse)(value, exports.CredentialContextSchema);
    };
    exports.toCredentialContext = toCredentialContext;
});
//# sourceMappingURL=execution-context.js.map