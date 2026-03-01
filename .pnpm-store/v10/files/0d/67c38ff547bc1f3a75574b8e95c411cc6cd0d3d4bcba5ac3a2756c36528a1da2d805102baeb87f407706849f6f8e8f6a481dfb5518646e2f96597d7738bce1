import { hasKey } from './utils';
function responseHasSubworkflowData(response) {
    return ['executionId', 'workflowId'].every((x) => hasKey(response, x) && typeof response[x] === 'string');
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
export function parseErrorMetadata(error) {
    if (hasKey(error, 'errorResponse')) {
        return parseErrorResponseWorkflowMetadata(error.errorResponse);
    }
    // This accounts for cases where the backend attaches the properties on plain errors
    // e.g. from custom nodes throwing literal `Error` or `ApplicationError` objects directly
    return parseErrorResponseWorkflowMetadata(error);
}
//# sourceMappingURL=metadata-utils.js.map