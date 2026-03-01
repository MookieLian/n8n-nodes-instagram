"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNodeAst = updateNodeAst;
exports.updateCredentialAst = updateCredentialAst;
exports.addCredentialToNode = addCredentialToNode;
const change_case_1 = require("change-case");
const ts_morph_1 = require("ts-morph");
const ast_1 = require("../../../../utils/ast");
function updateNodeAst({ nodePath, className, baseUrl, }) {
    const sourceFile = (0, ast_1.loadSingleSourceFile)(nodePath);
    const classDecl = sourceFile.getClasses()[0];
    classDecl.rename(className);
    const nodeDescriptionObj = classDecl
        .getPropertyOrThrow('description')
        .getInitializerIfKindOrThrow(ts_morph_1.SyntaxKind.ObjectLiteralExpression);
    (0, ast_1.updateStringProperty)({
        obj: nodeDescriptionObj,
        key: 'displayName',
        value: (0, change_case_1.capitalCase)(className),
    });
    (0, ast_1.updateStringProperty)({
        obj: nodeDescriptionObj,
        key: 'name',
        value: (0, change_case_1.camelCase)(className),
    });
    (0, ast_1.updateStringProperty)({
        obj: nodeDescriptionObj,
        key: 'description',
        value: `Interact with the ${(0, change_case_1.capitalCase)(className)} API`,
    });
    const icon = (0, ast_1.getChildObjectLiteral)({ obj: nodeDescriptionObj, key: 'icon' });
    (0, ast_1.updateStringProperty)({
        obj: icon,
        key: 'light',
        value: `file:${(0, change_case_1.camelCase)(className)}.svg`,
    });
    (0, ast_1.updateStringProperty)({
        obj: icon,
        key: 'dark',
        value: `file:${(0, change_case_1.camelCase)(className)}.dark.svg`,
    });
    const requestDefaults = (0, ast_1.getChildObjectLiteral)({
        obj: nodeDescriptionObj,
        key: 'requestDefaults',
    });
    (0, ast_1.updateStringProperty)({
        obj: requestDefaults,
        key: 'baseURL',
        value: baseUrl,
    });
    const defaults = (0, ast_1.getChildObjectLiteral)({
        obj: nodeDescriptionObj,
        key: 'defaults',
    });
    (0, ast_1.updateStringProperty)({ obj: defaults, key: 'name', value: (0, change_case_1.capitalCase)(className) });
    return sourceFile;
}
function updateCredentialAst({ repoName, baseUrl, credentialPath, credentialName, credentialDisplayName, credentialClassName, }) {
    const sourceFile = (0, ast_1.loadSingleSourceFile)(credentialPath);
    const classDecl = sourceFile.getClasses()[0];
    classDecl.rename(credentialClassName);
    (0, ast_1.updateStringProperty)({
        obj: classDecl,
        key: 'displayName',
        value: credentialDisplayName,
    });
    (0, ast_1.updateStringProperty)({
        obj: classDecl,
        key: 'name',
        value: credentialName,
    });
    const docUrlProp = classDecl.getProperty('documentationUrl');
    if (docUrlProp) {
        const initializer = docUrlProp.getInitializerIfKindOrThrow(ts_morph_1.SyntaxKind.StringLiteral);
        const newUrl = initializer.getLiteralText().replace('/repo', `/${repoName}`);
        initializer.setLiteralValue(newUrl);
    }
    const testProperty = classDecl.getProperty('test');
    if (testProperty) {
        const testRequest = testProperty
            .getInitializerIfKindOrThrow(ts_morph_1.SyntaxKind.ObjectLiteralExpression)
            .getPropertyOrThrow('request')
            .asKindOrThrow(ts_morph_1.SyntaxKind.PropertyAssignment)
            .getInitializerIfKindOrThrow(ts_morph_1.SyntaxKind.ObjectLiteralExpression);
        (0, ast_1.updateStringProperty)({
            obj: testRequest,
            key: 'baseURL',
            value: baseUrl,
        });
    }
    return sourceFile;
}
function addCredentialToNode({ nodePath, credentialName, }) {
    const sourceFile = (0, ast_1.loadSingleSourceFile)(nodePath);
    const classDecl = sourceFile.getClasses()[0];
    const descriptionProp = classDecl
        .getPropertyOrThrow('description')
        .getInitializerIfKindOrThrow(ts_morph_1.SyntaxKind.ObjectLiteralExpression);
    const credentialsProp = descriptionProp.getPropertyOrThrow('credentials');
    if (credentialsProp.getKind() === ts_morph_1.SyntaxKind.PropertyAssignment) {
        const initializer = credentialsProp.getFirstDescendantByKindOrThrow(ts_morph_1.SyntaxKind.ArrayLiteralExpression);
        const credentialObject = ts_morph_1.ts.factory.createObjectLiteralExpression([
            ts_morph_1.ts.factory.createPropertyAssignment(ts_morph_1.ts.factory.createIdentifier('name'), ts_morph_1.ts.factory.createStringLiteral(credentialName, true)),
            ts_morph_1.ts.factory.createPropertyAssignment(ts_morph_1.ts.factory.createIdentifier('required'), ts_morph_1.ts.factory.createTrue()),
        ]);
        initializer.addElement((0, ts_morph_1.printNode)(credentialObject));
    }
    return sourceFile;
}
//# sourceMappingURL=ast.js.map