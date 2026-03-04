import { Command } from '@oclif/core';
export default class New extends Command {
    static description: string;
    static examples: string[];
    static args: {
        name: import("@oclif/core/lib/interfaces").Arg<string | undefined, Record<string, unknown>>;
    };
    static flags: {
        force: import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        'skip-install': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        template: import("@oclif/core/lib/interfaces").OptionFlag<string | undefined, import("@oclif/core/lib/interfaces").CustomOptions>;
    };
    run(): Promise<void>;
}
