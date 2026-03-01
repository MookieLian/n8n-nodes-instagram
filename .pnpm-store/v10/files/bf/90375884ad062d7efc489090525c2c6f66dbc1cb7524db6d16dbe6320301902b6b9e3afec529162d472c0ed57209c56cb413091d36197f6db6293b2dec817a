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
    exports.parseErrorMetadata = parseErrorMetadata;
    const utils_1 = require("./utils");
    function responseHasSubworkflowData(response) {
        return ['executionId', 'workflowId'].every((x) => (0, utils_1.hasKey)(response, x) && typeof response[x] === 'string');
    }
    function parseErrorResponseWorkflowMetadata(response) {
        if (!responseHasSubworkflowData(response))
            return undefined;
        return {
            subExecution: {
                executionId: response.executionId,
                workflowId: response.workflowId,
            },
            subExecutionsCount: 1,
        };
    }
    function parseErrorMetadata(error) {
        if ((0, utils_1.hasKey)(error, 'errorResponse')) {
            return parseErrorResponseWorkflowMetadata(error.errorResponse);
        }
        // This accounts for cases where the backend attaches the properties on plain errors
        // e.g. from custom nodes throwing literal `Error` or `ApplicationError` objects directly
        return parseErrorResponseWorkflowMetadata(error);
    }
});
//# sourceMappingURL=metadata-utils.js.map