import { TSESTree } from '@typescript-eslint/types';
import { createRule } from '../utils/index.js';
const restrictedGlobals = [
    'clearInterval',
    'clearTimeout',
    'global',
    'globalThis',
    'process',
    'setInterval',
    'setTimeout',
    'setImmediate',
    'clearImmediate',
    '__dirname',
    '__filename',
];
export const NoRestrictedGlobalsRule = createRule({
    name: 'no-restricted-globals',
    meta: {
        type: 'problem',
        docs: {
            description: 'Disallow usage of restricted global variables in community nodes.',
        },
        messages: {
            restrictedGlobal: "Use of restricted global '{{ name }}' is not allowed",
        },
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        function checkReference(ref, name) {
            const { parent } = ref.identifier;
            // Skip property access (like console.process - we want process.exit but not obj.process)
            if (parent?.type === TSESTree.AST_NODE_TYPES.MemberExpression &&
                parent.property === ref.identifier &&
                !parent.computed) {
                return;
            }
            context.report({
                node: ref.identifier,
                messageId: 'restrictedGlobal',
                data: { name },
            });
        }
        return {
            Program() {
                const globalScope = context.sourceCode.getScope(context.sourceCode.ast);
                const allReferences = [
                    ...globalScope.variables
                        .filter((variable) => restrictedGlobals.includes(variable.name) && variable.defs.length === 0)
                        .flatMap((variable) => variable.references.map((ref) => ({ ref, name: variable.name }))),
                    ...globalScope.through
                        .filter((ref) => restrictedGlobals.includes(ref.identifier.name))
                        .map((ref) => ({ ref, name: ref.identifier.name })),
                ];
                allReferences.forEach(({ ref, name }) => checkReference(ref, name));
            },
        };
    },
});
//# sourceMappingURL=no-restricted-globals.js.map