(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./abstract/execution-base.error"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WorkflowOperationError = void 0;
    const execution_base_error_1 = require("./abstract/execution-base.error");
    /**
     * Class for instantiating an operational error, e.g. a timeout error.
     */
    class WorkflowOperationError extends execution_base_error_1.ExecutionBaseError {
        node;
        timestamp;
        constructor(message, node, description) {
            super(message, { cause: undefined });
            this.level = 'warning';
            this.name = this.constructor.name;
            if (description)
                this.description = description;
            this.node = node;
            this.timestamp = Date.now();
        }
    }
    exports.WorkflowOperationError = WorkflowOperationError;
});
//# sourceMappingURL=workflow-operation.error.js.map