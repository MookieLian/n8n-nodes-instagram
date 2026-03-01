export type TemplateData<Config extends object = object> = {
    destinationPath: string;
    nodePackageName: string;
    user?: Partial<{
        name: string;
        email: string;
    }>;
    packageManager: {
        name: 'npm' | 'yarn' | 'pnpm';
        installCommand: string;
    };
    config: Config;
};
type Require<T, K extends keyof T> = T & {
    [P in K]-?: T[P];
};
export type Template<Config extends object = object> = {
    name: string;
    description: string;
    path: string;
    prompts?: () => Promise<Config>;
    run?: (data: TemplateData<Config>) => Promise<void>;
};
export type TemplateWithRun<Config extends object = object> = Require<Template<Config>, 'run'>;
export declare function copyTemplateFilesToDestination<Config extends object>(template: Template<Config>, data: TemplateData): Promise<void>;
export declare function copyDefaultTemplateFilesToDestination(data: TemplateData): Promise<void>;
export declare function templateStaticFiles(data: TemplateData): Promise<void>;
export declare function createTemplate<Config extends object>(template: Template<Config>): TemplateWithRun<Config>;
export {};
