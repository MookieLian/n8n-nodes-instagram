import { Command } from '@oclif/core';
export default class Dev extends Command {
    static description: string;
    static examples: string[];
    static flags: {
        'external-n8n': import("@oclif/core/lib/interfaces").BooleanFlag<boolean>;
        'custom-user-folder': import("@oclif/core/lib/interfaces").OptionFlag<string, import("@oclif/core/lib/interfaces").CustomOptions>;
    };
    run(): Promise<void>;
}
