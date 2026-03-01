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
    exports.NodeSslError = void 0;
    const execution_base_error_1 = require("./abstract/execution-base.error");
    class NodeSslError extends execution_base_error_1.ExecutionBaseError {
        constructor(cause) {
            super("SSL Issue: consider using the 'Ignore SSL issues' option", { cause });
        }
    }
    exports.NodeSslError = NodeSslError;
});
//# sourceMappingURL=node-ssl.error.js.map