(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./get-connected-nodes", "../interfaces"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getChildNodes = getChildNodes;
    const get_connected_nodes_1 = require("./get-connected-nodes");
    const interfaces_1 = require("../interfaces");
    function getChildNodes(connectionsBySourceNode, nodeName, type = interfaces_1.NodeConnectionTypes.Main, depth = -1) {
        return (0, get_connected_nodes_1.getConnectedNodes)(connectionsBySourceNode, nodeName, type, depth);
    }
});
//# sourceMappingURL=get-child-nodes.js.map