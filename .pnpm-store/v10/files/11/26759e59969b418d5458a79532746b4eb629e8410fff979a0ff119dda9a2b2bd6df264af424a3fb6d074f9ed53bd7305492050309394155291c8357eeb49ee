(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./array.methods", "./boolean.methods", "./number.methods", "./object.methods", "./string.methods"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NativeMethods = void 0;
    const array_methods_1 = require("./array.methods");
    const boolean_methods_1 = require("./boolean.methods");
    const number_methods_1 = require("./number.methods");
    const object_methods_1 = require("./object.methods");
    const string_methods_1 = require("./string.methods");
    const NATIVE_METHODS = [
        string_methods_1.stringMethods,
        array_methods_1.arrayMethods,
        number_methods_1.numberMethods,
        object_methods_1.objectMethods,
        boolean_methods_1.booleanMethods,
    ];
    exports.NativeMethods = NATIVE_METHODS;
});
//# sourceMappingURL=index.js.map