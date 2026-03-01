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
    exports.UserError = void 0;
    const base_error_1 = require("./base.error");
    /**
     * Error that indicates the user performed an action that caused an error.
     * E.g. provided invalid input, tried to access a resource they’re not
     * authorized to, or violates a business rule.
     *
     * Default level: info
     */
    class UserError extends base_error_1.BaseError {
        constructor(message, opts = {}) {
            opts.level = opts.level ?? 'info';
            super(message, opts);
        }
    }
    exports.UserError = UserError;
});
//# sourceMappingURL=user.error.js.map