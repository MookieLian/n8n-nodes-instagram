"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@oclif/core");
const package_manager_1 = require("../utils/package-manager");
class Prerelease extends core_1.Command {
    async run() {
        await this.parse(Prerelease);
        const packageManager = (await (0, package_manager_1.detectPackageManager)()) ?? 'npm';
        if (!process.env.RELEASE_MODE) {
            this.log(`Run \`${packageManager} run release\` to publish the package`);
            process.exit(1);
        }
    }
}
Prerelease.description = 'Only for internal use. Prevent npm publish, instead require npm run release';
Prerelease.examples = ['<%= config.bin %> <%= command.id %>'];
Prerelease.flags = {};
Prerelease.hidden = true;
exports.default = Prerelease;
//# sourceMappingURL=prerelease.js.map