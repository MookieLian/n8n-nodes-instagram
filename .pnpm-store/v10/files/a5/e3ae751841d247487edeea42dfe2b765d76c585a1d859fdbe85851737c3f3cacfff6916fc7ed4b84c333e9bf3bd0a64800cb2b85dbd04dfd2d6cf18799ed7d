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
const command_suggestions_1 = require("../utils/command-suggestions");
const package_1 = require("../utils/package");
const prompts_2 = require("../utils/prompts");
class CloudSupport extends core_1.Command {
    async run() {
        const { args } = await this.parse(CloudSupport);
        await (0, prompts_2.ensureN8nPackage)('cloud-support');
        const workingDir = process.cwd();
        if (args.action === 'enable') {
            await this.enableCloudSupport(workingDir);
        }
        else if (args.action === 'disable') {
            await this.disableCloudSupport(workingDir);
        }
        else {
            await this.showCloudSupportStatus(workingDir);
        }
    }
    async enableCloudSupport(workingDir) {
        (0, prompts_1.intro)(await (0, prompts_2.getCommandHeader)('n8n-node cloud-support enable'));
        await this.updateEslintConfig(workingDir, true);
        prompts_1.log.success(`Updated ${picocolors_1.default.cyan('eslint.config.mjs')} to use default config`);
        await this.updateStrictMode(workingDir, true);
        prompts_1.log.success(`Enabled strict mode in ${picocolors_1.default.cyan('package.json')}`);
        const lintCommand = await (0, command_suggestions_1.suggestLintCommand)();
        (0, prompts_1.outro)(`Cloud support enabled. Run "${lintCommand}" to check compliance - your node must pass linting to be eligible for n8n Cloud publishing.`);
    }
    async disableCloudSupport(workingDir) {
        (0, prompts_1.intro)(await (0, prompts_2.getCommandHeader)('n8n-node cloud-support disable'));
        prompts_1.log.warning(`This will make your node ineligible for n8n Cloud verification!

The following changes will be made:
  • Switch to ${picocolors_1.default.magenta('configWithoutCloudSupport')} in ${picocolors_1.default.cyan('eslint.config.mjs')}
  • Disable strict mode in ${picocolors_1.default.cyan('package.json')}`);
        const confirmed = await (0, prompts_2.withCancelHandler)((0, prompts_1.confirm)({
            message: 'Are you sure you want to disable cloud support?',
            initialValue: false,
        }));
        if (!confirmed) {
            (0, prompts_2.onCancel)('Cloud support unchanged');
            return;
        }
        await this.updateEslintConfig(workingDir, false);
        prompts_1.log.success(`Updated ${picocolors_1.default.cyan('eslint.config.mjs')} to use ${picocolors_1.default.magenta('configWithoutCloudSupport')}`);
        await this.updateStrictMode(workingDir, false);
        prompts_1.log.success(`Disabled strict mode in ${picocolors_1.default.cyan('package.json')}`);
        (0, prompts_1.outro)("Cloud support disabled. Your node may pass linting but it won't pass verification for n8n Cloud.");
    }
    async updateEslintConfig(workingDir, enableCloud) {
        const eslintConfigPath = node_path_1.default.resolve(workingDir, 'eslint.config.mjs');
        const newConfig = enableCloud
            ? `import { config } from '@n8n/node-cli/eslint';

export default config;
`
            : `import { configWithoutCloudSupport } from '@n8n/node-cli/eslint';

export default configWithoutCloudSupport;
`;
        await promises_1.default.writeFile(eslintConfigPath, newConfig, 'utf-8');
    }
    async updateStrictMode(workingDir, enableStrict) {
        await (0, package_1.updatePackageJson)(workingDir, (packageJson) => {
            packageJson.n8n = packageJson.n8n ?? {};
            packageJson.n8n.strict = enableStrict;
            return packageJson;
        });
    }
    async showCloudSupportStatus(workingDir) {
        (0, prompts_1.intro)(await (0, prompts_2.getCommandHeader)('n8n-node cloud-support'));
        try {
            const packageJson = await (0, package_1.getPackageJson)(workingDir);
            const eslintConfigPath = node_path_1.default.resolve(workingDir, 'eslint.config.mjs');
            const isStrictMode = packageJson?.n8n?.strict === true;
            let isUsingDefaultConfig = false;
            try {
                const eslintConfig = await promises_1.default.readFile(eslintConfigPath, 'utf-8');
                const normalizedConfig = eslintConfig.replace(/\s+/g, ' ').trim();
                const expectedDefault = "import { config } from '@n8n/node-cli/eslint'; export default config;";
                isUsingDefaultConfig = normalizedConfig === expectedDefault;
            }
            catch {
            }
            const isCloudSupported = isStrictMode && isUsingDefaultConfig;
            if (isCloudSupported) {
                prompts_1.log.success(`✅ Cloud support is ${picocolors_1.default.green('ENABLED')}
  • Strict mode: ${picocolors_1.default.green('enabled')}
  • ESLint config: ${picocolors_1.default.green('using default config')}
  • Status: ${picocolors_1.default.green('eligible')} for n8n Cloud verification ${picocolors_1.default.dim('(if lint passes)')}`);
            }
            else {
                prompts_1.log.warning(`⚠️  Cloud support is ${picocolors_1.default.yellow('DISABLED')}
  • Strict mode: ${isStrictMode ? picocolors_1.default.green('enabled') : picocolors_1.default.red('disabled')}
  • ESLint config: ${isUsingDefaultConfig ? picocolors_1.default.green('using default config') : picocolors_1.default.red('using custom config')}
  • Status: ${picocolors_1.default.red('NOT eligible')} for n8n Cloud verification`);
            }
            const enableCommand = await (0, command_suggestions_1.suggestCloudSupportCommand)('enable');
            const disableCommand = await (0, command_suggestions_1.suggestCloudSupportCommand)('disable');
            const lintCommand = await (0, command_suggestions_1.suggestLintCommand)();
            prompts_1.log.info(`Available commands:
  • ${enableCommand}  - Enable cloud support
  • ${disableCommand} - Disable cloud support
  • ${lintCommand} - Check compliance for cloud publishing`);
            (0, prompts_1.outro)('Use the commands above to change cloud support settings or check compliance');
        }
        catch (error) {
            prompts_1.log.error('Failed to read package.json or determine cloud support status');
            (0, prompts_1.outro)('Make sure you are in the root directory of your node package');
        }
    }
}
CloudSupport.description = 'Enable or disable cloud support for this node';
CloudSupport.examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> enable',
    '<%= config.bin %> <%= command.id %> disable',
];
CloudSupport.args = {
    action: core_1.Args.string({
        description: 'Action to perform (defaults to showing current status)',
        required: false,
        options: ['enable', 'disable'],
    }),
};
exports.default = CloudSupport;
//# sourceMappingURL=cloud-support.js.map