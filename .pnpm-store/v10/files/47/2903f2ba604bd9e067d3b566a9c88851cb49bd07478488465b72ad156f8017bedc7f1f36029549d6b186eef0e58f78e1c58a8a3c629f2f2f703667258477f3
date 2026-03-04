(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./expression.error"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ExpressionReservedVariableError = void 0;
    const expression_error_1 = require("./expression.error");
    class ExpressionReservedVariableError extends expression_error_1.ExpressionError {
        constructor(variableName) {
            super(`Cannot use "${variableName}" due to security concerns`);
        }
    }
    exports.ExpressionReservedVariableError = ExpressionReservedVariableError;
});
//# sourceMappingURL=expression-reserved-variable.error.js.map