import { type StdioOptions } from 'node:child_process';
export declare class ChildProcessError extends Error {
    code: number | null;
    signal: NodeJS.Signals | null;
    constructor(message: string, code: number | null, signal: NodeJS.Signals | null);
}
export declare function runCommand(cmd: string, args?: string[], opts?: {
    cwd?: string;
    env?: NodeJS.ProcessEnv;
    stdio?: StdioOptions;
    context?: 'local' | 'global';
    printOutput?: (options: {
        stdout: Buffer[];
        stderr: Buffer[];
    }) => void;
    alwaysPrintOutput?: boolean;
}): Promise<void>;
