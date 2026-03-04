(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./base.error"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UnexpectedError = void 0;
    const base_error_1 = require("./base.error");
    /**
     * Error that indicates something is wrong in the code: logic mistakes,
     * unhandled cases, assertions that fail. These are not recoverable and
     * should be brought to developers' attention.
     *
     * Default level: error
     */
    class UnexpectedError extends base_error_1.BaseError {
        constructor(message, opts = {}) {
            opts.level = opts.level ?? 'error';
            super(message, opts);
        }
    }
    exports.UnexpectedError = UnexpectedError;
});
//# sourceMappingURL=unexpected.error.js.map