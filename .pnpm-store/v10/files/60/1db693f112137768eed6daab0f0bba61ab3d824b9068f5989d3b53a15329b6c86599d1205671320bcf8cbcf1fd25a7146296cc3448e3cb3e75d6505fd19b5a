"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = require("@clack/prompts");
const core_1 = require("@oclif/core");
const change_case_1 = require("change-case");
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const prompts_2 = require("./prompts");
const utils_1 = require("./utils");
const templates_1 = require("../../template/templates");
const child_process_1 = require("../../utils/child-process");
const filesystem_1 = require("../../utils/filesystem");
const git_1 = require("../../utils/git");
const package_manager_1 = require("../../utils/package-manager");
const prompts_3 = require("../../utils/prompts");
const validation_1 = require("../../utils/validation");
class New extends core_1.Command {
    async run() {
        const { flags, args } = await this.parse(New);
        const [typeFlag, templateFlag] = flags.template?.split('/') ?? [];
        (0, prompts_1.intro)(await (0, utils_1.createIntro)());
        const nodeName = args.name ?? (await (0, prompts_2.nodeNamePrompt)());
        const invalidNodeNameError = (0, validation_1.validateNodeName)(nodeName);
        if (invalidNodeNameError)
            return (0, prompts_3.onCancel)(invalidNodeNameError);
        const destination = node_path_1.default.resolve(process.cwd(), nodeName);
        let overwrite = false;
        if (await (0, filesystem_1.folderExists)(destination)) {
            if (!flags.force) {
                const shouldOverwrite = await (0, prompts_1.confirm)({
                    message: `./${nodeName} already exists, do you want to overwrite?`,
                });
                if ((0, prompts_1.isCancel)(shouldOverwrite) || !shouldOverwrite)
                    return (0, prompts_3.onCancel)();
            }
            overwrite = true;
        }
        const type = typeFlag ?? (await (0, prompts_2.nodeTypePrompt)());
        if (!(0, templates_1.isTemplateType)(type)) {
            return (0, prompts_3.onCancel)(`Invalid template type: ${type}`);
        }
        let template = templates_1.templates.programmatic.example;
        if (templateFlag) {
            const name = (0, change_case_1.camelCase)(templateFlag);
            if (!(0, templates_1.isTemplateName)(type, name)) {
                return (0, prompts_3.onCancel)(`Invalid template name: ${name} for type: ${type}`);
            }
            template = (0, templates_1.getTemplate)(type, name);
        }
        else if (type === 'declarative') {
            const chosenTemplate = await (0, prompts_2.declarativeTemplatePrompt)();
            template = (0, templates_1.getTemplate)('declarative', chosenTemplate);
        }
        const config = (await template.prompts?.()) ?? {};
        const packageManager = (await (0, package_manager_1.detectPackageManager)()) ?? 'npm';
        const templateData = {
            destinationPath: destination,
            nodePackageName: nodeName,
            config,
            user: (0, git_1.tryReadGitUser)(),
            packageManager: {
                name: packageManager,
                installCommand: packageManager === 'npm' ? 'ci' : 'install',
            },
        };
        const copyingSpinner = (0, prompts_1.spinner)();
        copyingSpinner.start('Copying files');
        if (overwrite) {
            await promises_1.default.rm(destination, { recursive: true, force: true });
        }
        await (0, filesystem_1.delayAtLeast)(template.run(templateData), 1000);
        copyingSpinner.stop('Files copied');
        const gitSpinner = (0, prompts_1.spinner)();
        gitSpinner.start('Initializing git repository');
        try {
            await (0, git_1.initGit)(destination);
            gitSpinner.stop('Git repository initialized');
        }
        catch (error) {
            if (error instanceof child_process_1.ChildProcessError) {
                gitSpinner.stop(`Could not initialize git repository: ${error.message}`, error.code ?? undefined);
                process.exit(error.code ?? 1);
            }
            else {
                throw error;
            }
        }
        if (!flags['skip-install']) {
            const installingSpinner = (0, prompts_1.spinner)();
            installingSpinner.start('Installing dependencies');
            try {
                await (0, filesystem_1.delayAtLeast)((0, child_process_1.runCommand)(packageManager, ['install'], {
                    cwd: destination,
                    printOutput: ({ stdout, stderr }) => {
                        prompts_1.log.error(stdout.concat(stderr).toString());
                    },
                }), 1000);
            }
            catch (error) {
                if (error instanceof child_process_1.ChildProcessError) {
                    installingSpinner.stop(`Could not install dependencies: ${error.message}`, error.code ?? undefined);
                    process.exit(error.code ?? 1);
                }
                else {
                    throw error;
                }
            }
            installingSpinner.stop('Dependencies installed');
        }
        (0, prompts_1.note)(`cd ./${nodeName} && ${packageManager} run dev

📚 Documentation: https://docs.n8n.io/integrations/creating-nodes/build/${type}-style-node/
💬 Community: https://community.n8n.io`, 'Next Steps');
        (0, prompts_1.outro)(`Created ./${nodeName} ✨`);
    }
}
New.description = 'Create a starter community node in a new directory';
New.examples = [
    '<%= config.bin %> <%= command.id %>',
    '<%= config.bin %> <%= command.id %> n8n-nodes-my-app --skip-install',
    '<%= config.bin %> <%= command.id %> n8n-nodes-my-app --force',
    '<%= config.bin %> <%= command.id %> n8n-nodes-my-app --template declarative/custom',
];
New.args = {
    name: core_1.Args.string({ name: 'Name' }),
};
New.flags = {
    force: core_1.Flags.boolean({
        char: 'f',
        description: 'Overwrite destination folder if it already exists',
    }),
    'skip-install': core_1.Flags.boolean({ description: 'Skip installing dependencies' }),
    template: core_1.Flags.string({
        options: ['declarative/github-issues', 'declarative/custom', 'programmatic/example'],
    }),
};
exports.default = New;
//# sourceMappingURL=index.js.map