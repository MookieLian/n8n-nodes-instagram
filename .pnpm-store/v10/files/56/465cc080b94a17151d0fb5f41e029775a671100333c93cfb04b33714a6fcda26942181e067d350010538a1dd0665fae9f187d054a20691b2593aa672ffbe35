"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIntro = void 0;
const package_manager_1 = require("../../utils/package-manager");
const prompts_1 = require("../../utils/prompts");
const createIntro = async () => {
    const maybePackageManager = (0, package_manager_1.detectPackageManagerFromUserAgent)();
    const packageManager = maybePackageManager ?? 'npm';
    const commandName = maybePackageManager ? `${packageManager} create @n8n/node` : 'n8n-node new';
    return await (0, prompts_1.getCommandHeader)(commandName);
};
exports.createIntro = createIntro;
//# sourceMappingURL=utils.js.map