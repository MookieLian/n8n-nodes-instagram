"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNodeName = void 0;
exports.isNodeErrnoException = isNodeErrnoException;
exports.isEnoentError = isEnoentError;
const validateNodeName = (name) => {
    if (!name)
        return;
    const regexScoped = /^@([a-z0-9]+(?:-[a-z0-9]+)*)\/n8n-nodes-([a-z0-9]+(?:-[a-z0-9]+)*)$/;
    const regexUnscoped = /^n8n-nodes-([a-z0-9]+(?:-[a-z0-9]+)*)$/;
    if (!regexScoped.test(name) && !regexUnscoped.test(name)) {
        return "Must start with 'n8n-nodes-' or '@org/n8n-nodes-'. Examples: n8n-nodes-my-app, @mycompany/n8n-nodes-my-app";
    }
    return;
};
exports.validateNodeName = validateNodeName;
function isNodeErrnoException(error) {
    return error instanceof Error && 'code' in error;
}
function isEnoentError(error) {
    return isNodeErrnoException(error) && error.code === 'ENOENT';
}
//# sourceMappingURL=validation.js.map