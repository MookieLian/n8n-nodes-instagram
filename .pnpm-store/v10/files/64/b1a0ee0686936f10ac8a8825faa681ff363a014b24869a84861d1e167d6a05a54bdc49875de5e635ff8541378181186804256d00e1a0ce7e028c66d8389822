(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../interfaces"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.getConnectedNodes = getConnectedNodes;
    const interfaces_1 = require("../interfaces");
    /**
     * Gets all the nodes which are connected nodes starting from
     * the given one
     *
     * @param {NodeConnectionType} [type='main']
     * @param {*} [depth=-1]
     */
    function getConnectedNodes(connections, nodeName, connectionType = interfaces_1.NodeConnectionTypes.Main, depth = -1, checkedNodesIncoming) {
        const newDepth = depth === -1 ? depth : depth - 1;
        if (depth === 0) {
            // Reached max depth
            return [];
        }
        if (!connections.hasOwnProperty(nodeName)) {
            // Node does not have incoming connections
            return [];
        }
        let types;
        if (connectionType === 'ALL') {
            types = Object.keys(connections[nodeName]);
        }
        else if (connectionType === 'ALL_NON_MAIN') {
            types = Object.keys(connections[nodeName]).filter((type) => type !== 'main');
        }
        else {
            types = [connectionType];
        }
        let addNodes;
        let nodeIndex;
        let i;
        let parentNodeName;
        const returnNodes = [];
        types.forEach((type) => {
            if (!connections[nodeName].hasOwnProperty(type)) {
                // Node does not have incoming connections of given type
                return;
            }
            const checkedNodes = checkedNodesIncoming ? [...checkedNodesIncoming] : [];
            if (checkedNodes.includes(nodeName)) {
                // Node got checked already before
                return;
            }
            checkedNodes.push(nodeName);
            connections[nodeName][type].forEach((connectionsByIndex) => {
                connectionsByIndex?.forEach((connection) => {
                    if (checkedNodes.includes(connection.node)) {
                        // Node got checked already before
                        return;
                    }
                    returnNodes.unshift(connection.node);
                    addNodes = getConnectedNodes(connections, connection.node, connectionType, newDepth, checkedNodes);
                    for (i = addNodes.length; i--; i > 0) {
                        // Because nodes can have multiple parents it is possible that
                        // parts of the tree is parent of both and to not add nodes
                        // twice check first if they already got added before.
                        parentNodeName = addNodes[i];
                        nodeIndex = returnNodes.indexOf(parentNodeName);
                        if (nodeIndex !== -1) {
                            // Node got found before so remove it from current location
                            // that node-order stays correct
                            returnNodes.splice(nodeIndex, 1);
                        }
                        returnNodes.unshift(parentNodeName);
                    }
                });
            });
        });
        return returnNodes;
    }
});
//# sourceMappingURL=get-connected-nodes.js.map