import type { IDataObject, IExecuteData, INode, INodeExecutionData, INodeParameterResourceLocator, INodeParameters, IWorkflowDataProxyAdditionalKeys, NodeParameterValue, NodeParameterValueType, WorkflowExecuteMode } from './interfaces';
import type { Workflow } from './workflow';
import type { IRunExecutionData } from './run-execution-data/run-execution-data';
export declare class Expression {
    private readonly workflow;
    constructor(workflow: Workflow);
    static initializeGlobalContext(data: IDataObject): void;
    static resolveWithoutWorkflow(expression: string, data?: IDataObject): string | (() => unknown) | null;
    /**
     * Converts an object to a string in a way to make it clear that
     * the value comes from an object
     *
     */
    convertObjectValueToString(value: object): string;
    /**
     * Resolves the parameter value.  If it is an expression it will execute it and
     * return the result. For everything simply the supplied value will be returned.
     *
     * @param {(IRunExecutionData | null)} runExecutionData
     * @param {boolean} [returnObjectAsString=false]
     */
    resolveSimpleParameterValue(parameterValue: NodeParameterValue, siblingParameters: INodeParameters, runExecutionData: IRunExecutionData | null, runIndex: number, itemIndex: number, activeNodeName: string, connectionInputData: INodeExecutionData[], mode: WorkflowExecuteMode, additionalKeys: IWorkflowDataProxyAdditionalKeys, executeData?: IExecuteData, returnObjectAsString?: boolean, selfData?: {}, contextNodeName?: string): NodeParameterValue | INodeParameters | NodeParameterValue[] | INodeParameters[];
    private renderExpression;
    /**
     * Resolves value of parameter. But does not work for workflow-data.
     *
     * @param {(string | undefined)} parameterValue
     */
    getSimpleParameterValue(node: INode, parameterValue: string | boolean | undefined, mode: WorkflowExecuteMode, additionalKeys: IWorkflowDataProxyAdditionalKeys, executeData?: IExecuteData, defaultValue?: boolean | number | string | unknown[]): boolean | number | string | undefined | unknown[];
    /**
     * Resolves value of complex parameter. But does not work for workflow-data.
     *
     * @param {(NodeParameterValue | INodeParameters | NodeParameterValue[] | INodeParameters[])} parameterValue
     * @param {(NodeParameterValue | INodeParameters | NodeParameterValue[] | INodeParameters[] | undefined)} [defaultValue]
     */
    getComplexParameterValue(node: INode, parameterValue: NodeParameterValue | INodeParameters | NodeParameterValue[] | INodeParameters[], mode: WorkflowExecuteMode, additionalKeys: IWorkflowDataProxyAdditionalKeys, executeData?: IExecuteData, defaultValue?: NodeParameterValueType | undefined, selfData?: {}): NodeParameterValueType | undefined;
    /**
     * Returns the resolved node parameter value. If it is an expression it will execute it and
     * return the result. If the value to resolve is an array or object it will do the same
     * for all of the items and values.
     *
     * @param {(NodeParameterValue | INodeParameters | NodeParameterValue[] | INodeParameters[])} parameterValue
     * @param {(IRunExecutionData | null)} runExecutionData
     * @param {boolean} [returnObjectAsString=false]
     */
    getParameterValue(parameterValue: NodeParameterValueType | INodeParameterResourceLocator, runExecutionData: IRunExecutionData | null, runIndex: number, itemIndex: number, activeNodeName: string, connectionInputData: INodeExecutionData[], mode: WorkflowExecuteMode, additionalKeys: IWorkflowDataProxyAdditionalKeys, executeData?: IExecuteData, returnObjectAsString?: boolean, selfData?: {}, contextNodeName?: string): NodeParameterValueType;
}
//# sourceMappingURL=expression.d.ts.map