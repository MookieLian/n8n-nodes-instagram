(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./base/base.error", "./base/operational.error", "./base/unexpected.error", "./base/user.error", "@n8n/errors", "./expression.error", "./execution-cancelled.error", "./node-api.error", "./node-operation.error", "./workflow-configuration.error", "./node-ssl.error", "./webhook-taken.error", "./workflow-activation.error", "./workflow-deactivation.error", "./workflow-operation.error", "./subworkflow-operation.error", "./cli-subworkflow-operation.error", "./trigger-close.error", "./abstract/node.error", "./abstract/execution-base.error", "./expression-extension.error", "./expression-destructuring.error", "./expression-computed-destructuring.error", "./expression-class-extension.error", "./expression-reserved-variable.error", "./expression-with-statement.error", "./db-connection-timeout-error", "./ensure-error"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ensureError = exports.DbConnectionTimeoutError = exports.ExpressionWithStatementError = exports.ExpressionReservedVariableError = exports.ExpressionClassExtensionError = exports.ExpressionComputedDestructuringError = exports.ExpressionDestructuringError = exports.ExpressionExtensionError = exports.ExecutionBaseError = exports.NodeError = exports.TriggerCloseError = exports.CliWorkflowOperationError = exports.SubworkflowOperationError = exports.WorkflowOperationError = exports.WorkflowDeactivationError = exports.WorkflowActivationError = exports.WebhookPathTakenError = exports.NodeSslError = exports.WorkflowConfigurationError = exports.NodeOperationError = exports.NodeApiError = exports.TimeoutExecutionCancelledError = exports.SystemShutdownExecutionCancelledError = exports.ManualExecutionCancelledError = exports.ExecutionCancelledError = exports.ExpressionError = exports.ApplicationError = exports.UserError = exports.UnexpectedError = exports.OperationalError = exports.BaseError = void 0;
    var base_error_1 = require("./base/base.error");
    Object.defineProperty(exports, "BaseError", { enumerable: true, get: function () { return base_error_1.BaseError; } });
    var operational_error_1 = require("./base/operational.error");
    Object.defineProperty(exports, "OperationalError", { enumerable: true, get: function () { return operational_error_1.OperationalError; } });
    var unexpected_error_1 = require("./base/unexpected.error");
    Object.defineProperty(exports, "UnexpectedError", { enumerable: true, get: function () { return unexpected_error_1.UnexpectedError; } });
    var user_error_1 = require("./base/user.error");
    Object.defineProperty(exports, "UserError", { enumerable: true, get: function () { return user_error_1.UserError; } });
    var errors_1 = require("@n8n/errors");
    Object.defineProperty(exports, "ApplicationError", { enumerable: true, get: function () { return errors_1.ApplicationError; } });
    var expression_error_1 = require("./expression.error");
    Object.defineProperty(exports, "ExpressionError", { enumerable: true, get: function () { return expression_error_1.ExpressionError; } });
    var execution_cancelled_error_1 = require("./execution-cancelled.error");
    Object.defineProperty(exports, "ExecutionCancelledError", { enumerable: true, get: function () { return execution_cancelled_error_1.ExecutionCancelledError; } });
    Object.defineProperty(exports, "ManualExecutionCancelledError", { enumerable: true, get: function () { return execution_cancelled_error_1.ManualExecutionCancelledError; } });
    Object.defineProperty(exports, "SystemShutdownExecutionCancelledError", { enumerable: true, get: function () { return execution_cancelled_error_1.SystemShutdownExecutionCancelledError; } });
    Object.defineProperty(exports, "TimeoutExecutionCancelledError", { enumerable: true, get: function () { return execution_cancelled_error_1.TimeoutExecutionCancelledError; } });
    var node_api_error_1 = require("./node-api.error");
    Object.defineProperty(exports, "NodeApiError", { enumerable: true, get: function () { return node_api_error_1.NodeApiError; } });
    var node_operation_error_1 = require("./node-operation.error");
    Object.defineProperty(exports, "NodeOperationError", { enumerable: true, get: function () { return node_operation_error_1.NodeOperationError; } });
    var workflow_configuration_error_1 = require("./workflow-configuration.error");
    Object.defineProperty(exports, "WorkflowConfigurationError", { enumerable: true, get: function () { return workflow_configuration_error_1.WorkflowConfigurationError; } });
    var node_ssl_error_1 = require("./node-ssl.error");
    Object.defineProperty(exports, "NodeSslError", { enumerable: true, get: function () { return node_ssl_error_1.NodeSslError; } });
    var webhook_taken_error_1 = require("./webhook-taken.error");
    Object.defineProperty(exports, "WebhookPathTakenError", { enumerable: true, get: function () { return webhook_taken_error_1.WebhookPathTakenError; } });
    var workflow_activation_error_1 = require("./workflow-activation.error");
    Object.defineProperty(exports, "WorkflowActivationError", { enumerable: true, get: function () { return workflow_activation_error_1.WorkflowActivationError; } });
    var workflow_deactivation_error_1 = require("./workflow-deactivation.error");
    Object.defineProperty(exports, "WorkflowDeactivationError", { enumerable: true, get: function () { return workflow_deactivation_error_1.WorkflowDeactivationError; } });
    var workflow_operation_error_1 = require("./workflow-operation.error");
    Object.defineProperty(exports, "WorkflowOperationError", { enumerable: true, get: function () { return workflow_operation_error_1.WorkflowOperationError; } });
    var subworkflow_operation_error_1 = require("./subworkflow-operation.error");
    Object.defineProperty(exports, "SubworkflowOperationError", { enumerable: true, get: function () { return subworkflow_operation_error_1.SubworkflowOperationError; } });
    var cli_subworkflow_operation_error_1 = require("./cli-subworkflow-operation.error");
    Object.defineProperty(exports, "CliWorkflowOperationError", { enumerable: true, get: function () { return cli_subworkflow_operation_error_1.CliWorkflowOperationError; } });
    var trigger_close_error_1 = require("./trigger-close.error");
    Object.defineProperty(exports, "TriggerCloseError", { enumerable: true, get: function () { return trigger_close_error_1.TriggerCloseError; } });
    var node_error_1 = require("./abstract/node.error");
    Object.defineProperty(exports, "NodeError", { enumerable: true, get: function () { return node_error_1.NodeError; } });
    var execution_base_error_1 = require("./abstract/execution-base.error");
    Object.defineProperty(exports, "ExecutionBaseError", { enumerable: true, get: function () { return execution_base_error_1.ExecutionBaseError; } });
    var expression_extension_error_1 = require("./expression-extension.error");
    Object.defineProperty(exports, "ExpressionExtensionError", { enumerable: true, get: function () { return expression_extension_error_1.ExpressionExtensionError; } });
    var expression_destructuring_error_1 = require("./expression-destructuring.error");
    Object.defineProperty(exports, "ExpressionDestructuringError", { enumerable: true, get: function () { return expression_destructuring_error_1.ExpressionDestructuringError; } });
    var expression_computed_destructuring_error_1 = require("./expression-computed-destructuring.error");
    Object.defineProperty(exports, "ExpressionComputedDestructuringError", { enumerable: true, get: function () { return expression_computed_destructuring_error_1.ExpressionComputedDestructuringError; } });
    var expression_class_extension_error_1 = require("./expression-class-extension.error");
    Object.defineProperty(exports, "ExpressionClassExtensionError", { enumerable: true, get: function () { return expression_class_extension_error_1.ExpressionClassExtensionError; } });
    var expression_reserved_variable_error_1 = require("./expression-reserved-variable.error");
    Object.defineProperty(exports, "ExpressionReservedVariableError", { enumerable: true, get: function () { return expression_reserved_variable_error_1.ExpressionReservedVariableError; } });
    var expression_with_statement_error_1 = require("./expression-with-statement.error");
    Object.defineProperty(exports, "ExpressionWithStatementError", { enumerable: true, get: function () { return expression_with_statement_error_1.ExpressionWithStatementError; } });
    var db_connection_timeout_error_1 = require("./db-connection-timeout-error");
    Object.defineProperty(exports, "DbConnectionTimeoutError", { enumerable: true, get: function () { return db_connection_timeout_error_1.DbConnectionTimeoutError; } });
    var ensure_error_1 = require("./ensure-error");
    Object.defineProperty(exports, "ensureError", { enumerable: true, get: function () { return ensure_error_1.ensureError; } });
});
//# sourceMappingURL=index.js.map