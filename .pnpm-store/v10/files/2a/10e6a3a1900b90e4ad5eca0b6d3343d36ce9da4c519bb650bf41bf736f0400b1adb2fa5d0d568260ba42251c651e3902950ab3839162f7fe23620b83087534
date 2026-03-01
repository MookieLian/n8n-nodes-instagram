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
    exports.ensureError = ensureError;
    /** Ensures `error` is an `Error */
    function ensureError(error) {
        return error instanceof Error
            ? error
            : new Error('Error that was not an instance of Error was thrown', {
                // We should never throw anything except something that derives from Error
                cause: error,
            });
    }
});
//# sourceMappingURL=ensure-error.js.map