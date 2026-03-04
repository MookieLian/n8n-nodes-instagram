"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyTemplateFilesToDestination = copyTemplateFilesToDestination;
exports.copyDefaultTemplateFilesToDestination = copyDefaultTemplateFilesToDestination;
exports.templateStaticFiles = templateStaticFiles;
exports.createTemplate = createTemplate;
const fast_glob_1 = __importDefault(require("fast-glob"));
const handlebars_1 = __importDefault(require("handlebars"));
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const filesystem_1 = require("../utils/filesystem");
async function copyTemplateFilesToDestination(template, data) {
    await (0, filesystem_1.copyFolder)({
        source: template.path,
        destination: data.destinationPath,
        ignore: ['dist', 'node_modules'],
    });
}
async function copyDefaultTemplateFilesToDestination(data) {
    await (0, filesystem_1.copyFolder)({
        source: node_path_1.default.resolve(__dirname, 'templates/shared/default'),
        destination: data.destinationPath,
        ignore: ['dist', 'node_modules'],
    });
}
async function templateStaticFiles(data) {
    const files = await (0, fast_glob_1.default)('**/*.{md,json,yml}', {
        ignore: ['tsconfig.json', 'tsconfig.build.json'],
        cwd: data.destinationPath,
        absolute: true,
        dot: true,
    });
    await Promise.all(files.map(async (file) => {
        const content = await promises_1.default.readFile(file, 'utf-8');
        const newContent = handlebars_1.default.compile(content, { noEscape: true })(data);
        if (newContent !== content) {
            await promises_1.default.writeFile(file, newContent);
        }
    }));
}
function createTemplate(template) {
    return {
        ...template,
        run: async (data) => {
            await copyDefaultTemplateFilesToDestination(data);
            await copyTemplateFilesToDestination(template, data);
            await templateStaticFiles(data);
            await template.run?.(data);
        },
    };
}
//# sourceMappingURL=core.js.map