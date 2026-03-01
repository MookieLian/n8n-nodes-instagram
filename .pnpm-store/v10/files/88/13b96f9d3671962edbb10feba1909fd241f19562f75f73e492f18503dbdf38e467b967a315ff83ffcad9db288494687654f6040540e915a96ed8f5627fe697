export declare const templates: {
    readonly declarative: {
        readonly githubIssues: import("../core").TemplateWithRun<object>;
        readonly custom: import("../core").TemplateWithRun<import("./declarative/custom/types").CustomTemplateConfig>;
    };
    readonly programmatic: {
        readonly example: import("../core").TemplateWithRun<object>;
    };
};
export type TemplateMap = typeof templates;
export type TemplateType = keyof TemplateMap;
export type TemplateName<T extends TemplateType> = keyof TemplateMap[T];
export declare function getTemplate<T extends TemplateType, N extends TemplateName<T>>(type: T, name: N): TemplateMap[T][N];
export declare function isTemplateType(val: unknown): val is TemplateType;
export declare function isTemplateName<T extends TemplateType>(type: T, name: unknown): name is TemplateName<T>;
