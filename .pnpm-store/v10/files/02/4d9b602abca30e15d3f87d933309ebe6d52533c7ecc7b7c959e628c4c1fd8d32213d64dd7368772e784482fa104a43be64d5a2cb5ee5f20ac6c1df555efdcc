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
    exports.nodeNameToToolName = nodeNameToToolName;
    /**
     * Converts a node name to a valid tool name by replacing special characters with underscores
     * and collapsing consecutive underscores into a single one.
     */
    function nodeNameToToolName(nodeOrName) {
        const name = typeof nodeOrName === 'string' ? nodeOrName : nodeOrName.name;
        return name.replace(/[^a-zA-Z0-9_-]+/g, '_');
    }
});
//# sourceMappingURL=tool-helpers.js.map