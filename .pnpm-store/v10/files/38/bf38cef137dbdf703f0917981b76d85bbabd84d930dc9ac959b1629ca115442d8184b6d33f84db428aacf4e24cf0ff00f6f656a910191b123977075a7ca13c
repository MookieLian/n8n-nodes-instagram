"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prompts_1 = require("@clack/prompts");
const core_1 = require("@oclif/core");
const child_process_1 = require("../utils/child-process");
const package_manager_1 = require("../utils/package-manager");
const prompts_2 = require("../utils/prompts");
class Release extends core_1.Command {
    async run() {
        await this.parse(Release);
        (0, prompts_1.intro)(await (0, prompts_2.getCommandHeader)('n8n-node release'));
        const pm = (await (0, package_manager_1.detectPackageManager)()) ?? 'npm';
        try {
            await (0, child_process_1.runCommand)('release-it', [
                '-n',
                '--git.requireBranch main',
                '--git.requireCleanWorkingDir',
                '--git.requireUpstream',
                '--git.requireCommits',
                '--git.commit',
                '--git.tag',
                '--git.push',
                '--git.changelog="npx auto-changelog --stdout --unreleased --commit-limit false -u --hide-credit"',
                '--github.release',
                `--hooks.before:init="${pm} run lint && ${pm} run build"`,
                '--hooks.after:bump="npx auto-changelog -p"',
            ], {
                stdio: 'inherit',
                context: 'local',
                env: {
                    RELEASE_MODE: 'true',
                },
            });
        }
        catch (error) {
            if (error instanceof child_process_1.ChildProcessError) {
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
}
Release.description = 'Publish your community node package to npm';
Release.examples = ['<%= config.bin %> <%= command.id %>'];
Release.flags = {};
exports.default = Release;
//# sourceMappingURL=release.js.map