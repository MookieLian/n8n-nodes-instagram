import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import { createRule } from '../utils/index.js';
export const PackageNameConventionRule = createRule({
    name: 'package-name-convention',
    meta: {
        type: 'problem',
        docs: {
            description: 'Enforce correct package naming convention for n8n community nodes',
        },
        messages: {
            renameTo: "Rename to '{{suggestedName}}'",
            invalidPackageName: 'Package name "{{ packageName }}" must follow the convention "n8n-nodes-[PACKAGE-NAME]" or "@[AUTHOR]/n8n-nodes-[PACKAGE-NAME]"',
        },
        schema: [],
        hasSuggestions: true,
    },
    defaultOptions: [],
    create(context) {
        if (!context.filename.endsWith('package.json')) {
            return {};
        }
        return {
            ObjectExpression(node) {
                if (node.parent?.type === AST_NODE_TYPES.Property) {
                    return;
                }
                const nameProperty = node.properties.find((property) => property.type === AST_NODE_TYPES.Property &&
                    property.key.type === AST_NODE_TYPES.Literal &&
                    property.key.value === 'name');
                if (!nameProperty || nameProperty.type !== AST_NODE_TYPES.Property) {
                    return;
                }
                if (nameProperty.value.type !== AST_NODE_TYPES.Literal) {
                    return;
                }
                const packageName = nameProperty.value.value;
                const packageNameStr = typeof packageName === 'string' ? packageName : null;
                if (!packageNameStr || !isValidPackageName(packageNameStr)) {
                    const suggestions = [];
                    // Generate package name suggestions if we have a valid string
                    if (packageNameStr) {
                        const suggestedNames = generatePackageNameSuggestions(packageNameStr);
                        for (const suggestedName of suggestedNames) {
                            suggestions.push({
                                messageId: 'renameTo',
                                data: { suggestedName },
                                fix(fixer) {
                                    return fixer.replaceText(nameProperty.value, `"${suggestedName}"`);
                                },
                            });
                        }
                    }
                    context.report({
                        node: nameProperty,
                        messageId: 'invalidPackageName',
                        data: {
                            packageName: packageNameStr ?? 'undefined',
                        },
                        suggest: suggestions,
                    });
                }
            },
        };
    },
});
function isValidPackageName(name) {
    const unscoped = /^n8n-nodes-.+$/;
    const scoped = /^@.+\/n8n-nodes-.+$/;
    return unscoped.test(name) || scoped.test(name);
}
function generatePackageNameSuggestions(invalidName) {
    const cleanName = (name) => {
        return name
            .replace(/^nodes?-?n8n-?/, '')
            .replace(/^n8n-/, '')
            .replace(/^nodes?-?/, '')
            .replace(/^node-/, '')
            .replace(/-nodes$/, '');
    };
    if (invalidName.startsWith('@')) {
        const [scope, packagePart] = invalidName.split('/');
        const clean = cleanName(packagePart ?? '');
        return clean ? [`${scope}/n8n-nodes-${clean}`] : [];
    }
    const clean = cleanName(invalidName);
    return clean ? [`n8n-nodes-${clean}`] : [];
}
//# sourceMappingURL=package-name-convention.js.map