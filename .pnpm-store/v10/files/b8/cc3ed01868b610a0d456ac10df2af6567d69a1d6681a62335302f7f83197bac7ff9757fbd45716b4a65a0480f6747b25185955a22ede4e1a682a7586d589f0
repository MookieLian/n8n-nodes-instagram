(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./utils"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.setGlobalState = setGlobalState;
    exports.getGlobalState = getGlobalState;
    const utils_1 = require("./utils");
    let globalState = { defaultTimezone: 'America/New_York' };
    function setGlobalState(state) {
        globalState = state;
    }
    function getGlobalState() {
        return (0, utils_1.deepCopy)(globalState);
    }
});
//# sourceMappingURL=global-state.js.map