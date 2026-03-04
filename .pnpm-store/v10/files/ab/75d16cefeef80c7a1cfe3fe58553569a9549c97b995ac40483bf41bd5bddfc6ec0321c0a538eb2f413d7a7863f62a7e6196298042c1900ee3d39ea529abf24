"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.templates = void 0;
exports.getTemplate = getTemplate;
exports.isTemplateType = isTemplateType;
exports.isTemplateName = isTemplateName;
const template_1 = require("./declarative/custom/template");
const template_2 = require("./declarative/github-issues/template");
const template_3 = require("./programmatic/example/template");
exports.templates = {
    declarative: {
        githubIssues: template_2.githubIssuesTemplate,
        custom: template_1.customTemplate,
    },
    programmatic: {
        example: template_3.exampleTemplate,
    },
};
function getTemplate(type, name) {
    return exports.templates[type][name];
}
function isTemplateType(val) {
    return typeof val === 'string' && val in exports.templates;
}
function isTemplateName(type, name) {
    return typeof name === 'string' && name in exports.templates[type];
}
//# sourceMappingURL=index.js.map