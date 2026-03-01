(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./node-operation.error"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WorkflowConfigurationError = void 0;
    const node_operation_error_1 = require("./node-operation.error");
    /**
     * A type of NodeOperationError caused by a configuration problem somewhere in workflow.
     */
    class WorkflowConfigurationError extends node_operation_error_1.NodeOperationError {
    }
    exports.WorkflowConfigurationError = WorkflowConfigurationError;
});
//# sourceMappingURL=workflow-configuration.error.js.map