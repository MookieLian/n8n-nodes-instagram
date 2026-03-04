"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const node_os_1 = __importDefault(require("node:os"));
const node_path_1 = __importDefault(require("node:path"));
const picocolors_1 = __importDefault(require("picocolors"));
const filesystem_1 = require("../../utils/filesystem");
const package_manager_1 = require("../../utils/package-manager");
const prompts_1 = require("../../utils/prompts");
const validation_1 = require("../../utils/validation");
const build_1 = require("../build");
const utils_1 = require("./utils");
class Dev extends core_1.Command {
    async run() {
        const { flags } = await this.parse(Dev);
        const packageManager = (await (0, package_manager_1.detectPackageManager)()) ?? 'npm';
        await (0, build_1.copyStaticFiles)();
        const n8nUserFolder = flags['custom-user-folder'];
        const customNodesFolder = node_path_1.default.join(n8nUserFolder, '.n8n', 'custom');
        const nodeModulesFolder = node_path_1.default.join(customNodesFolder, 'node_modules');
        await (0, filesystem_1.ensureFolder)(nodeModulesFolder);
        const packageName = await (0, utils_1.readPackageName)();
        const invalidNodeNameError = (0, validation_1.validateNodeName)(packageName);
        if (invalidNodeNameError)
            return (0, prompts_1.onCancel)(invalidNodeNameError);
        const currentDir = process.cwd();
        const symlinkPath = node_path_1.default.join(nodeModulesFolder, packageName);
        try {
            await (0, filesystem_1.createSymlink)(currentDir, symlinkPath);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : 'Unknown error creating symbolic link';
            return (0, prompts_1.onCancel)(`Failed to create symbolic link: ${message}`);
        }
        let n8nReady = false;
        const hasN8n = !flags['external-n8n'];
        let spinnerMessage = 'Starting n8n...';
        setTimeout(() => {
            spinnerMessage = `Installing n8n... ${picocolors_1.default.dim('(this can take a while on first run)')}`;
        }, 10_000);
        const n8nSpinner = (0, utils_1.createSpinner)(() => spinnerMessage);
        const commandsList = [
            {
                cmd: packageManager,
                args: ['exec', '--', 'tsc', '--watch', '--pretty'],
                name: 'TypeScript Build (watching)',
            },
        ];
        if (hasN8n) {
            commandsList.push({
                cmd: 'npx',
                args: ['-y', '--color=always', '--prefer-online', 'n8n@latest'],
                name: 'n8n Server',
                cwd: n8nUserFolder,
                env: {
                    ...process.env,
                    N8N_DEV_RELOAD: 'true',
                    N8N_RUNNERS_ENABLED: 'true',
                    DB_SQLITE_POOL_SIZE: '10',
                    N8N_USER_FOLDER: n8nUserFolder,
                },
                onOutput: (line) => {
                    if (line.includes('Editor is now accessible')) {
                        n8nReady = true;
                    }
                },
                getPlaceholder: n8nSpinner,
            });
        }
        const keyHandlers = [];
        if (hasN8n) {
            keyHandlers.push((0, utils_1.createOpenN8nHandler)());
        }
        const headerText = await (0, prompts_1.getCommandHeader)('n8n-node dev');
        (0, utils_1.runCommands)({
            commands: commandsList,
            keyHandlers,
            helpText: () => (0, utils_1.buildHelpText)(hasN8n, n8nReady),
            headerText,
        });
    }
}
Dev.description = 'Run n8n with the node and rebuild on changes for live preview';
Dev.examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> --external-n8n',
    '<%= config.bin %> <%= command.id %> --custom-user-folder /Users/test',
];
Dev.flags = {
    'external-n8n': core_1.Flags.boolean({
        default: false,
        description: 'By default n8n-node dev will run n8n in a sub process. Enable this option if you would like to run n8n elsewhere. Make sure to set N8N_DEV_RELOAD to true in that case.',
    }),
    'custom-user-folder': core_1.Flags.directory({
        default: node_path_1.default.join(node_os_1.default.homedir(), '.n8n-node-cli'),
        description: 'Folder to use to store user-specific n8n data. By default it will use ~/.n8n-node-cli. The node CLI will install your node here.',
    }),
};
exports.default = Dev;
//# sourceMappingURL=index.js.map