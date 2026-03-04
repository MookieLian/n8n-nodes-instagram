(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./workflow-operation.error"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SubworkflowOperationError = void 0;
    const workflow_operation_error_1 = require("./workflow-operation.error");
    class SubworkflowOperationError extends workflow_operation_error_1.WorkflowOperationError {
        description = '';
        cause;
        constructor(message, description) {
            super(message);
            this.name = this.constructor.name;
            this.description = description;
            this.cause = {
                name: this.name,
                message,
                stack: this.stack,
            };
        }
    }
    exports.SubworkflowOperationError = SubworkflowOperationError;
});
//# sourceMappingURL=subworkflow-operation.error.js.map