"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectPackageManagerFromUserAgent = detectPackageManagerFromUserAgent;
exports.detectPackageManager = detectPackageManager;
const promises_1 = __importDefault(require("node:fs/promises"));
function detectPackageManagerFromUserAgent() {
    if ('npm_config_user_agent' in process.env) {
        const ua = process.env['npm_config_user_agent'] ?? '';
        if (ua.includes('pnpm'))
            return 'pnpm';
        if (ua.includes('yarn'))
            return 'yarn';
        if (ua.includes('npm'))
            return 'npm';
    }
    return null;
}
async function detectPackageManagerFromLockFiles() {
    const lockFiles = {
        npm: 'package-lock.json',
        yarn: 'yarn.lock',
        pnpm: 'pnpm-lock.yaml',
    };
    for (const [pm, lockFile] of Object.entries(lockFiles)) {
        try {
            const stats = await promises_1.default.stat(lockFile);
            if (stats.isFile()) {
                return pm;
            }
        }
        catch (e) {
        }
    }
    return null;
}
async function detectPackageManager() {
    const fromUserAgent = detectPackageManagerFromUserAgent();
    if (fromUserAgent)
        return fromUserAgent;
    const fromLockFiles = await detectPackageManagerFromLockFiles();
    if (fromLockFiles)
        return fromLockFiles;
    return null;
}
//# sourceMappingURL=package-manager.js.map