"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = require("@clack/prompts");
const core_1 = require("@oclif/core");
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const picocolors_1 = __importDefault(require("picocolors"));
const child_process_1 = require("../utils/child-process");
const command_suggestions_1 = require("../utils/command-suggestions");
const package_1 = require("../utils/package");
const prompts_2 = require("../utils/prompts");
const validation_1 = require("../utils/validation");
class Lint extends core_1.Command {
    async run() {
        const { flags } = await this.parse(Lint);
        (0, prompts_1.intro)(await (0, prompts_2.getCommandHeader)('n8n-node lint'));
        await (0, prompts_2.ensureN8nPackage)('lint');
        await this.checkStrictMode();
        const args = ['.'];
        if (flags.fix) {
            args.push('--fix');
        }
        let eslintOutput = '';
        try {
            await (0, child_process_1.runCommand)('eslint', args, {
                context: 'local',
                stdio: 'pipe',
                env: { ...process.env, FORCE_COLOR: '1' },
                alwaysPrintOutput: true,
                printOutput: ({ stdout, stderr }) => {
                    eslintOutput = Buffer.concat([...stdout, ...stderr]).toString();
                    process.stdout.write(Buffer.concat(stdout));
                    process.stderr.write(Buffer.concat(stderr));
                },
            });
        }
        catch (error) {
            if (error instanceof child_process_1.ChildProcessError) {
                await this.handleLintErrors(eslintOutput);
                if (error.signal) {
                    process.kill(process.pid, error.signal);
                }
                else {
                    process.exit(error.code ?? 0);
                }
            }
            throw error;
        }
    }
    async checkStrictMode() {
        try {
            const workingDir = process.cwd();
            const packageJson = await (0, package_1.getPackageJson)(workingDir);
            if (!packageJson?.n8n?.strict) {
                return;
            }
            await this.verifyEslintConfig(workingDir);
        }
        catch (error) {
            return;
        }
    }
    async verifyEslintConfig(workingDir) {
        const eslintConfigPath = node_path_1.default.resolve(workingDir, 'eslint.config.mjs');
        const templatePath = node_path_1.default.resolve(__dirname, '../template/templates/shared/default/eslint.config.mjs');
        const expectedConfig = await promises_1.default.readFile(templatePath, 'utf-8');
        try {
            const currentConfig = await promises_1.default.readFile(eslintConfigPath, 'utf-8');
            const normalizedCurrent = currentConfig.replace(/\s+/g, ' ').trim();
            const normalizedExpected = expectedConfig.replace(/\s+/g, ' ').trim();
            if (normalizedCurrent !== normalizedExpected) {
                const enableCommand = await (0, command_suggestions_1.suggestCloudSupportCommand)('enable');
                this.log(`${picocolors_1.default.red('Strict mode violation:')} ${picocolors_1.default.cyan('eslint.config.mjs')} has been modified from the default configuration.

${picocolors_1.default.dim('Expected:')}
${picocolors_1.default.gray(expectedConfig)}

To restore default config: ${enableCommand}
To disable strict mode: set ${picocolors_1.default.yellow('"strict": false')} in ${picocolors_1.default.cyan('package.json')} under the ${picocolors_1.default.yellow('"n8n"')} section.`);
                process.exit(1);
            }
        }
        catch (error) {
            if ((0, validation_1.isEnoentError)(error)) {
                const enableCommand = await (0, command_suggestions_1.suggestCloudSupportCommand)('enable');
                this.log(`${picocolors_1.default.red('Strict mode violation:')} ${picocolors_1.default.cyan('eslint.config.mjs')} not found. Expected default configuration.

To create default config: ${enableCommand}`);
                process.exit(1);
            }
            throw error;
        }
    }
    async handleLintErrors(eslintOutput) {
        if (this.containsCloudOnlyErrors(eslintOutput)) {
            const disableCommand = await (0, command_suggestions_1.suggestCloudSupportCommand)('disable');
            this.log(`${picocolors_1.default.yellow('⚠️  n8n Cloud compatibility issues detected')}

These lint failures prevent verification to n8n Cloud.

To disable cloud compatibility checks:
  ${disableCommand}

${picocolors_1.default.dim(`Note: This will switch to ${picocolors_1.default.magenta('configWithoutCloudSupport')} and disable strict mode`)}`);
        }
    }
    containsCloudOnlyErrors(errorMessage) {
        const cloudOnlyRules = [
            '@n8n/community-nodes/no-restricted-imports',
            '@n8n/community-nodes/no-restricted-globals',
        ];
        return cloudOnlyRules.some((rule) => errorMessage.includes(rule));
    }
}
Lint.description = 'Lint the node in the current directory. Includes auto-fixing. In strict mode, verifies eslint config is unchanged from default.';
Lint.examples = ['<%= config.bin %> <%= command.id %>'];
Lint.flags = {
    fix: core_1.Flags.boolean({ description: 'Automatically fix problems', default: false }),
};
exports.default = Lint;
//# sourceMappingURL=lint.js.map