export declare function sleep(ms: number): Promise<void>;
export declare function createSpinner(text: string | (() => string)): () => string;
export declare function openUrl(url: string): void;
export interface CommandConfig {
    cmd: string;
    args: string[];
    name: string;
    cwd?: string;
    env?: NodeJS.ProcessEnv;
    onOutput?: (line: string) => void;
    getPlaceholder?: () => string;
}
export interface KeyHandler {
    key: string;
    description?: string;
    handler: (cleanup: () => void) => void;
}
export interface CommandsConfig {
    commands: CommandConfig[];
    keyHandlers?: KeyHandler[];
    helpText?: () => string;
    headerText?: string;
}
export declare function runCommands(config: CommandsConfig): void;
export declare function readPackageName(): Promise<string>;
export declare function createOpenN8nHandler(): KeyHandler;
export declare function buildHelpText(hasN8n: boolean, isN8nReady: boolean): string;
