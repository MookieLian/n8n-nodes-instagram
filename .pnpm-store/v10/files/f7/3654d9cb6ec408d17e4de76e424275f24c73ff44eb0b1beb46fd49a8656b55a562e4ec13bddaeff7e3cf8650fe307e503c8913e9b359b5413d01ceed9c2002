import type { TSESTree } from '@typescript-eslint/utils';
export declare function isNodeTypeClass(node: TSESTree.ClassDeclaration): boolean;
export declare function isCredentialTypeClass(node: TSESTree.ClassDeclaration): boolean;
export declare function findClassProperty(node: TSESTree.ClassDeclaration, propertyName: string): TSESTree.PropertyDefinition | null;
export declare function findObjectProperty(obj: TSESTree.ObjectExpression, propertyName: string): TSESTree.Property | null;
export declare function getLiteralValue(node: TSESTree.Node | null): string | boolean | number | null;
export declare function getStringLiteralValue(node: TSESTree.Node | null): string | null;
export declare function getModulePath(node: TSESTree.Node | null): string | null;
export declare function getBooleanLiteralValue(node: TSESTree.Node | null): boolean | null;
export declare function findArrayLiteralProperty(obj: TSESTree.ObjectExpression, propertyName: string): TSESTree.ArrayExpression | null;
export declare function hasArrayLiteralValue(node: TSESTree.PropertyDefinition, searchValue: string): boolean;
export declare function getTopLevelObjectInJson(node: TSESTree.ObjectExpression): TSESTree.ObjectExpression | null;
export declare function isFileType(filename: string, extension: string): boolean;
export declare function isDirectRequireCall(node: TSESTree.CallExpression): boolean;
export declare function isRequireMemberCall(node: TSESTree.CallExpression): boolean;
export declare function extractCredentialInfoFromArray(element: TSESTree.ArrayExpression['elements'][number]): {
    name: string;
    testedBy?: string;
    node: TSESTree.Node;
} | null;
export declare function extractCredentialNameFromArray(element: TSESTree.ArrayExpression['elements'][number]): {
    name: string;
    node: TSESTree.Node;
} | null;
export declare function findSimilarStrings(target: string, candidates: Set<string>, maxDistance?: number, maxResults?: number): string[];
//# sourceMappingURL=ast-utils.d.ts.map