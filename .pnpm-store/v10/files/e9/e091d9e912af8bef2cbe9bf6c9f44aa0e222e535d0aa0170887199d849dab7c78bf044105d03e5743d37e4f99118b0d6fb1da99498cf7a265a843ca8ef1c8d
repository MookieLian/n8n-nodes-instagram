"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChildObjectLiteral = exports.updateStringProperty = exports.loadSingleSourceFile = void 0;
const ts_morph_1 = require("ts-morph");
const loadSingleSourceFile = (path) => {
    const project = new ts_morph_1.Project({
        skipFileDependencyResolution: true,
    });
    return project.addSourceFileAtPath(path);
};
exports.loadSingleSourceFile = loadSingleSourceFile;
const setStringInitializer = (prop, value) => {
    prop.getInitializerIfKindOrThrow(ts_morph_1.SyntaxKind.StringLiteral).setLiteralValue(value);
};
const updateStringProperty = ({ obj, key, value, }) => {
    const prop = obj.getPropertyOrThrow(key);
    if (prop.isKind(ts_morph_1.SyntaxKind.PropertyAssignment)) {
        setStringInitializer(prop.asKindOrThrow(ts_morph_1.SyntaxKind.PropertyAssignment), value);
    }
    else if (prop.isKind(ts_morph_1.SyntaxKind.PropertyDeclaration)) {
        setStringInitializer(prop.asKindOrThrow(ts_morph_1.SyntaxKind.PropertyDeclaration), value);
    }
};
exports.updateStringProperty = updateStringProperty;
const getChildObjectLiteral = ({ obj, key, }) => {
    return obj
        .getPropertyOrThrow(key)
        .asKindOrThrow(ts_morph_1.SyntaxKind.PropertyAssignment)
        .getInitializerIfKindOrThrow(ts_morph_1.SyntaxKind.ObjectLiteralExpression);
};
exports.getChildObjectLiteral = getChildObjectLiteral;
//# sourceMappingURL=ast.js.map