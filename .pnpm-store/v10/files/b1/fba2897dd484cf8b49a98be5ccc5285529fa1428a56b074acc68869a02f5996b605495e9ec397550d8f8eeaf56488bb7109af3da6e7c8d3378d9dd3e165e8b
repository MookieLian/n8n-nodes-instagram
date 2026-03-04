import { Command } from '@oclif/core';
export default class Lint extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        fix: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
    };
    run(): Promise<void>;
    private checkStrictMode;
    private verifyEslintConfig;
    private handleLintErrors;
    private containsCloudOnlyErrors;
}
