import { AST_NODE_TYPES } from '@typescript-eslint/utils';
import { distance } from 'fastest-levenshtein';
function implementsInterface(node, interfaceName) {
    return (node.implements?.some((impl) => impl.type === AST_NODE_TYPES.TSClassImplements &&
        impl.expression.type === AST_NODE_TYPES.Identifier &&
        impl.expression.name === interfaceName) ?? false);
}
export function isNodeTypeClass(node) {
    if (implementsInterface(node, 'INodeType')) {
        return true;
    }
    if (node.superClass?.type === AST_NODE_TYPES.Identifier && node.superClass.name === 'Node') {
        return true;
    }
    return false;
}
export function isCredentialTypeClass(node) {
    return implementsInterface(node, 'ICredentialType');
}
export function findClassProperty(node, propertyName) {
    const property = node.body.body.find((member) => member.type === AST_NODE_TYPES.PropertyDefinition &&
        member.key?.type === AST_NODE_TYPES.Identifier &&
        member.key.name === propertyName);
    return property?.type === AST_NODE_TYPES.PropertyDefinition ? property : null;
}
export function findObjectProperty(obj, propertyName) {
    const property = obj.properties.find((prop) => prop.type === AST_NODE_TYPES.Property &&
        prop.key.type === AST_NODE_TYPES.Identifier &&
        prop.key.name === propertyName);
    return property?.type === AST_NODE_TYPES.Property ? property : null;
}
export function getLiteralValue(node) {
    if (node?.type === AST_NODE_TYPES.Literal) {
        return node.value;
    }
    return null;
}
export function getStringLiteralValue(node) {
    const value = getLiteralValue(node);
    return typeof value === 'string' ? value : null;
}
export function getModulePath(node) {
    const stringValue = getStringLiteralValue(node);
    if (stringValue) {
        return stringValue;
    }
    if (node?.type === AST_NODE_TYPES.TemplateLiteral &&
        node.expressions.length === 0 &&
        node.quasis.length === 1) {
        return node.quasis[0]?.value.cooked ?? null;
    }
    return null;
}
export function getBooleanLiteralValue(node) {
    const value = getLiteralValue(node);
    return typeof value === 'boolean' ? value : null;
}
export function findArrayLiteralProperty(obj, propertyName) {
    const property = findObjectProperty(obj, propertyName);
    if (property?.value.type === AST_NODE_TYPES.ArrayExpression) {
        return property.value;
    }
    return null;
}
export function hasArrayLiteralValue(node, searchValue) {
    if (node.value?.type !== AST_NODE_TYPES.ArrayExpression)
        return false;
    return node.value.elements.some((element) => element?.type === AST_NODE_TYPES.Literal &&
        typeof element.value === 'string' &&
        element.value === searchValue);
}
export function getTopLevelObjectInJson(node) {
    if (node.parent?.type === AST_NODE_TYPES.Property) {
        return null;
    }
    return node;
}
export function isFileType(filename, extension) {
    return filename.endsWith(extension);
}
export function isDirectRequireCall(node) {
    return (node.callee.type === AST_NODE_TYPES.Identifier &&
        node.callee.name === 'require' &&
        node.arguments.length > 0);
}
export function isRequireMemberCall(node) {
    return (node.callee.type === AST_NODE_TYPES.MemberExpression &&
        node.callee.object.type === AST_NODE_TYPES.Identifier &&
        node.callee.object.name === 'require' &&
        node.arguments.length > 0);
}
export function extractCredentialInfoFromArray(element) {
    if (!element)
        return null;
    const stringValue = getStringLiteralValue(element);
    if (stringValue) {
        return { name: stringValue, node: element };
    }
    if (element.type === AST_NODE_TYPES.ObjectExpression) {
        const nameProperty = findObjectProperty(element, 'name');
        const testedByProperty = findObjectProperty(element, 'testedBy');
        if (nameProperty) {
            const nameValue = getStringLiteralValue(nameProperty.value);
            const testedByValue = testedByProperty
                ? getStringLiteralValue(testedByProperty.value)
                : undefined;
            if (nameValue) {
                return {
                    name: nameValue,
                    testedBy: testedByValue ?? undefined,
                    node: nameProperty.value,
                };
            }
        }
    }
    return null;
}
export function extractCredentialNameFromArray(element) {
    const info = extractCredentialInfoFromArray(element);
    return info ? { name: info.name, node: info.node } : null;
}
export function findSimilarStrings(target, candidates, maxDistance = 3, maxResults = 3) {
    const matches = [];
    for (const candidate of candidates) {
        const levenshteinDistance = distance(target.toLowerCase(), candidate.toLowerCase());
        if (levenshteinDistance <= maxDistance) {
            matches.push({ name: candidate, distance: levenshteinDistance });
        }
    }
    return matches
        .sort((a, b) => a.distance - b.distance)
        .slice(0, maxResults)
        .map((match) => match.name);
}
//# sourceMappingURL=ast-utils.js.map