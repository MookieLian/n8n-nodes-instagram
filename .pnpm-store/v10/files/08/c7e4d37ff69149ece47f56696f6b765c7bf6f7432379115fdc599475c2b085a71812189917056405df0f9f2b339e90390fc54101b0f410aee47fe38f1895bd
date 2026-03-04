"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExecCommand = getExecCommand;
exports.formatCommand = formatCommand;
exports.suggestCloudSupportCommand = suggestCloudSupportCommand;
exports.suggestLintCommand = suggestLintCommand;
const picocolors_1 = __importDefault(require("picocolors"));
const package_manager_1 = require("./package-manager");
async function getExecCommand(type = 'cli') {
    const packageManager = (await (0, package_manager_1.detectPackageManager)()) ?? 'npm';
    if (type === 'script') {
        return packageManager === 'npm' ? 'npm run' : packageManager;
    }
    return packageManager === 'npm' ? 'npx' : packageManager;
}
function formatCommand(command) {
    return picocolors_1.default.cyan(command);
}
async function suggestCloudSupportCommand(action) {
    const execCommand = await getExecCommand('cli');
    return formatCommand(`${execCommand} n8n-node cloud-support ${action}`);
}
async function suggestLintCommand() {
    const execCommand = await getExecCommand('script');
    return formatCommand(`${execCommand} lint`);
}
//# sourceMappingURL=command-suggestions.js.map