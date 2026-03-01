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
    exports.ExpressionClassExtensionError = void 0;
    const expression_error_1 = require("./expression.error");
    class ExpressionClassExtensionError extends expression_error_1.ExpressionError {
        constructor(baseClass) {
            super(`Cannot extend "${baseClass}" due to security concerns`);
        }
    }
    exports.ExpressionClassExtensionError = ExpressionClassExtensionError;
});
//# sourceMappingURL=expression-class-extension.error.js.map