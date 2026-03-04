(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./workflow-activation.error"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WebhookPathTakenError = void 0;
    const workflow_activation_error_1 = require("./workflow-activation.error");
    class WebhookPathTakenError extends workflow_activation_error_1.WorkflowActivationError {
        constructor(nodeName, cause) {
            super(`The URL path that the "${nodeName}" node uses is already taken. Please change it to something else.`, { level: 'warning', cause });
        }
    }
    exports.WebhookPathTakenError = WebhookPathTakenError;
});
//# sourceMappingURL=webhook-taken.error.js.map