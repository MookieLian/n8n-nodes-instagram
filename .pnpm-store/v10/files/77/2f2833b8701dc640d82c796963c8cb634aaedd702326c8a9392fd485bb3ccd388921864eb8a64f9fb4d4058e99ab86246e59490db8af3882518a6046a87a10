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
    exports.getPinDataIfManualExecution = getPinDataIfManualExecution;
    function getPinDataIfManualExecution(workflow, nodeName, mode) {
        if (mode !== 'manual') {
            return undefined;
        }
        return workflow.getPinDataOfNode(nodeName);
    }
});
//# sourceMappingURL=workflow-data-proxy-helpers.js.map