"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyStaticFiles = copyStaticFiles;
const prompts_1 = require("@clack/prompts");
const core_1 = require("@oclif/core");
const fast_glob_1 = __importDefault(require("fast-glob"));
const promises_1 = require("node:fs/promises");
const node_path_1 = __importDefault(require("node:path"));
const rimraf_1 = require("rimraf");
const child_process_1 = require("../utils/child-process");
const prompts_2 = require("../utils/prompts");
class Build extends core_1.Command {
    async run() {
        await this.parse(Build);
        const commandName = 'n8n-node build';
        (0, prompts_1.intro)(await (0, prompts_2.getCommandHeader)(commandName));
        await (0, prompts_2.ensureN8nPackage)(commandName);
        const buildSpinner = (0, prompts_1.spinner)();
        buildSpinner.start('Building TypeScript files');
        await (0, rimraf_1.rimraf)('dist');
        try {
            await runTscBuild();
            buildSpinner.stop('TypeScript build successful');
        }
        catch (error) {
            (0, prompts_1.cancel)('TypeScript build failed');
            this.exit(1);
        }
        const copyStaticFilesSpinner = (0, prompts_1.spinner)();
        copyStaticFilesSpinner.start('Copying static files');
        await copyStaticFiles();
        copyStaticFilesSpinner.stop('Copied static files');
        (0, prompts_1.outro)('✓ Build successful');
    }
}
Build.description = 'Compile the node in the current directory and copy assets';
Build.examples = ['<%= config.bin %> <%= command.id %>'];
Build.flags = {};
exports.default = Build;
async function runTscBuild() {
    return await (0, child_process_1.runCommand)('tsc', [], {
        context: 'local',
        printOutput: ({ stdout, stderr }) => {
            prompts_1.log.error(stdout.concat(stderr).toString());
        },
    });
}
async function copyStaticFiles() {
    const staticFiles = fast_glob_1.default.sync(['**/*.{png,svg}', '**/__schema__/**/*.json'], {
        ignore: ['dist', 'node_modules'],
    });
    return await Promise.all(staticFiles.map(async (filePath) => {
        const destPath = node_path_1.default.join('dist', filePath);
        await (0, promises_1.mkdir)(node_path_1.default.dirname(destPath), { recursive: true });
        return await (0, promises_1.cp)(filePath, destPath, { recursive: true });
    }));
}
//# sourceMappingURL=build.js.map