"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.customTemplate = void 0;
const change_case_1 = require("change-case");
const node_path_1 = __importDefault(require("node:path"));
const ast_1 = require("./ast");
const prompts_1 = require("./prompts");
const filesystem_1 = require("../../../../utils/filesystem");
const package_1 = require("../../../../utils/package");
const core_1 = require("../../../core");
exports.customTemplate = (0, core_1.createTemplate)({
    name: 'Start from scratch',
    description: 'Blank template with guided setup',
    path: node_path_1.default.join(__dirname, 'template'),
    prompts: async () => {
        const baseUrl = await (0, prompts_1.baseUrlPrompt)();
        const credentialType = await (0, prompts_1.credentialTypePrompt)();
        if (credentialType === 'oauth2') {
            const flow = await (0, prompts_1.oauthFlowPrompt)();
            return { credentialType, baseUrl, flow };
        }
        return { credentialType, baseUrl };
    },
    run: async (data) => {
        await renameNode(data, 'Example');
        await addCredential(data);
    },
});
async function renameNode(data, oldNodeName) {
    const { config, nodePackageName: nodeName, destinationPath } = data;
    const newClassName = (0, change_case_1.pascalCase)(nodeName.replace('n8n-nodes-', ''));
    const oldNodeDir = node_path_1.default.resolve(destinationPath, `nodes/${oldNodeName}`);
    await (0, filesystem_1.renameFilesInDirectory)(oldNodeDir, oldNodeName, newClassName);
    const newNodeDir = await (0, filesystem_1.renameDirectory)(oldNodeDir, newClassName);
    const newNodePath = node_path_1.default.resolve(newNodeDir, `${newClassName}.node.ts`);
    const newNodeAst = (0, ast_1.updateNodeAst)({
        nodePath: newNodePath,
        baseUrl: config.baseUrl,
        className: newClassName,
    });
    await (0, filesystem_1.writeFileSafe)(newNodePath, newNodeAst.getFullText());
    const nodes = [`dist/nodes/${newClassName}/${newClassName}.node.js`];
    await (0, package_1.setNodesPackageJson)(destinationPath, nodes);
}
async function addCredential(data) {
    const { config, destinationPath, nodePackageName } = data;
    if (config.credentialType === 'none')
        return;
    const credentialTemplateName = config.credentialType === 'oauth2'
        ? config.credentialType + (0, change_case_1.pascalCase)(config.flow)
        : config.credentialType;
    const credentialTemplatePath = node_path_1.default.resolve(__dirname, `../../shared/credentials/${credentialTemplateName}.credentials.ts`);
    const nodeName = nodePackageName.replace('n8n-nodes', '');
    const repoName = nodeName;
    const { baseUrl, credentialType } = config;
    const credentialClassName = config.credentialType === 'oauth2'
        ? (0, change_case_1.pascalCase)(`${nodeName}-OAuth2-api`)
        : (0, change_case_1.pascalCase)(`${nodeName}-api`);
    const credentialName = (0, change_case_1.camelCase)(`${nodeName}${credentialType === 'oauth2' ? 'OAuth2Api' : 'Api'}`);
    const credentialDisplayName = `${(0, change_case_1.capitalCase)(nodeName)} ${credentialType === 'oauth2' ? 'OAuth2 API' : 'API'}`;
    const updatedCredentialAst = (0, ast_1.updateCredentialAst)({
        repoName,
        baseUrl,
        credentialName,
        credentialDisplayName,
        credentialClassName,
        credentialPath: credentialTemplatePath,
    });
    await (0, filesystem_1.writeFileSafe)(node_path_1.default.resolve(destinationPath, `credentials/${credentialClassName}.credentials.ts`), updatedCredentialAst.getFullText());
    await (0, package_1.addCredentialPackageJson)(destinationPath, `dist/credentials/${credentialClassName}.credentials.js`);
    for (const nodePath of await (0, package_1.getPackageJsonNodes)(destinationPath)) {
        const srcNodePath = node_path_1.default.resolve(destinationPath, nodePath.replace(/.js$/, '.ts').replace(/^dist\//, ''));
        const updatedNodeAst = (0, ast_1.addCredentialToNode)({
            nodePath: srcNodePath,
            credentialName,
        });
        await (0, filesystem_1.writeFileSafe)(srcNodePath, updatedNodeAst.getFullText());
    }
}
//# sourceMappingURL=template.js.map