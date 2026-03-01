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
    exports.ExpressionDestructuringError = void 0;
    const expression_error_1 = require("./expression.error");
    class ExpressionDestructuringError extends expression_error_1.ExpressionError {
        constructor(property) {
            super(`Cannot destructure "${property}" due to security concerns`);
        }
    }
    exports.ExpressionDestructuringError = ExpressionDestructuringError;
});
//# sourceMappingURL=expression-destructuring.error.js.map