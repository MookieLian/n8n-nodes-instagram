import type { ExecutionError, IDestinationNode, IExecuteContextData, IExecuteData, IExecutionContext, IPinData, IRunData, ITaskMetadata, IWaitingForExecution, IWaitingForExecutionSource, IWorkflowExecutionDataProcess, RelatedExecution, StartNodeData } from '..';
import type { IRunExecutionDataV0 } from './run-execution-data.v0';
export interface IRunExecutionDataV1 {
    version: 1;
    startData?: {
        startNodes?: StartNodeData[];
        destinationNode?: IDestinationNode;
        originalDestinationNode?: IDestinationNode;
        runNodeFilter?: string[];
    };
    resultData: {
        error?: ExecutionError;
        runData: IRunData;
        pinData?: IPinData;
        lastNodeExecuted?: string;
        metadata?: Record<string, string>;
    };
    executionData?: {
        contextData: IExecuteContextData;
        runtimeData?: IExecutionContext;
        nodeExecutionStack: IExecuteData[];
        metadata: {
            [key: string]: ITaskMetadata[];
        };
        waitingExecution: IWaitingForExecution;
        waitingExecutionSource: IWaitingForExecutionSource | null;
    };
    parentExecution?: RelatedExecution;
    /**
     * This is used to prevent breaking change
     * for waiting executions started before signature validation was added
     */
    validateSignature?: boolean;
    waitTill?: Date;
    pushRef?: string;
    /** Data needed for a worker to run a manual execution. */
    manualData?: Pick<IWorkflowExecutionDataProcess, 'dirtyNodeNames' | 'triggerToStartFrom' | 'userId'>;
}
export declare function runExecutionDataV0ToV1(data: IRunExecutionDataV0): IRunExecutionDataV1;
//# sourceMappingURL=run-execution-data.v1.d.ts.map