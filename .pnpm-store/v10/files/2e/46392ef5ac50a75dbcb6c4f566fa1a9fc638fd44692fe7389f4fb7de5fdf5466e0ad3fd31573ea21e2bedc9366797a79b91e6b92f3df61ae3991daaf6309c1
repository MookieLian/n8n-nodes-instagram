"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePackageJson = updatePackageJson;
exports.getPackageJson = getPackageJson;
exports.isN8nNodePackage = isN8nNodePackage;
exports.getPackageJsonNodes = getPackageJsonNodes;
exports.setNodesPackageJson = setNodesPackageJson;
exports.addCredentialPackageJson = addCredentialPackageJson;
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const prettier_1 = __importDefault(require("prettier"));
const filesystem_1 = require("./filesystem");
const json_1 = require("./json");
async function updatePackageJson(dirPath, updater) {
    const packageJsonPath = node_path_1.default.resolve(dirPath, 'package.json');
    const packageJson = (0, json_1.jsonParse)(await promises_1.default.readFile(packageJsonPath, 'utf-8'));
    if (!packageJson)
        return;
    const updatedPackageJson = updater(packageJson);
    await (0, filesystem_1.writeFileSafe)(packageJsonPath, await prettier_1.default.format(JSON.stringify(updatedPackageJson), { parser: 'json' }));
}
async function getPackageJson(dirPath) {
    const packageJsonPath = node_path_1.default.resolve(dirPath, 'package.json');
    const packageJson = (0, json_1.jsonParse)(await promises_1.default.readFile(packageJsonPath, 'utf-8'));
    return packageJson;
}
async function isN8nNodePackage(dirPath = process.cwd()) {
    const packageJson = await getPackageJson(dirPath).catch(() => null);
    return Array.isArray(packageJson?.n8n?.nodes);
}
async function getPackageJsonNodes(dirPath) {
    const packageJson = await getPackageJson(dirPath);
    return packageJson?.n8n?.nodes ?? [];
}
async function setNodesPackageJson(dirPath, nodes) {
    await updatePackageJson(dirPath, (packageJson) => {
        packageJson['n8n'] ??= {};
        packageJson['n8n'].nodes = nodes;
        return packageJson;
    });
}
async function addCredentialPackageJson(dirPath, credential) {
    await updatePackageJson(dirPath, (packageJson) => {
        packageJson['n8n'] ??= {};
        packageJson['n8n'].credentials ??= [];
        packageJson['n8n'].credentials.push(credential);
        return packageJson;
    });
}
//# sourceMappingURL=package.js.map