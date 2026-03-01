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
    exports.ExpressionWithStatementError = void 0;
    const expression_error_1 = require("./expression.error");
    class ExpressionWithStatementError extends expression_error_1.ExpressionError {
        constructor() {
            super('Cannot use "with" statements due to security concerns');
        }
    }
    exports.ExpressionWithStatementError = ExpressionWithStatementError;
});
//# sourceMappingURL=expression-with-statement.error.js.map