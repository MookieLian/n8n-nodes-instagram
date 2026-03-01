(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isExpression = void 0;
    /**
     * Checks if the given value is an expression. An expression is a string that
     * starts with '='.
     */
    const isExpression = (expr) => {
        if (typeof expr !== 'string')
            return false;
        return expr.charAt(0) === '=';
    };
    exports.isExpression = isExpression;
});
//# sourceMappingURL=expression-helpers.js.map