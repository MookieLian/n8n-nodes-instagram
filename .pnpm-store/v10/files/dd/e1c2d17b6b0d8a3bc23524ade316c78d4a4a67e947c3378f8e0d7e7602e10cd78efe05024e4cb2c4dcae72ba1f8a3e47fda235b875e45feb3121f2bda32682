"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configWithoutCloudSupport = exports.config = void 0;
const js_1 = __importDefault(require("@eslint/js"));
const eslint_plugin_community_nodes_1 = require("@n8n/eslint-plugin-community-nodes");
const config_1 = require("eslint/config");
const eslint_import_resolver_typescript_1 = require("eslint-import-resolver-typescript");
const eslint_plugin_import_x_1 = __importDefault(require("eslint-plugin-import-x"));
const eslint_plugin_n8n_nodes_base_1 = __importDefault(require("eslint-plugin-n8n-nodes-base"));
const typescript_eslint_1 = __importDefault(require("typescript-eslint"));
function createConfig(supportCloud = true) {
    return typescript_eslint_1.default.config((0, config_1.globalIgnores)(['dist']), {
        files: ['**/*.ts'],
        extends: [
            js_1.default.configs.recommended,
            typescript_eslint_1.default.configs.recommended,
            supportCloud
                ? eslint_plugin_community_nodes_1.n8nCommunityNodesPlugin.configs.recommended
                : eslint_plugin_community_nodes_1.n8nCommunityNodesPlugin.configs.recommendedWithoutN8nCloudSupport,
            eslint_plugin_import_x_1.default.configs['flat/recommended'],
        ],
        rules: {
            'prefer-spread': 'off',
            'no-console': 'error',
        },
    }, {
        plugins: { 'n8n-nodes-base': eslint_plugin_n8n_nodes_base_1.default },
        settings: {
            'import-x/resolver-next': [(0, eslint_import_resolver_typescript_1.createTypeScriptImportResolver)()],
        },
    }, {
        files: ['package.json'],
        rules: {
            ...eslint_plugin_n8n_nodes_base_1.default.configs.community.rules,
        },
        languageOptions: {
            parser: typescript_eslint_1.default.parser,
            parserOptions: {
                extraFileExtensions: ['.json'],
            },
        },
    }, {
        files: ['./credentials/**/*.ts'],
        rules: {
            ...eslint_plugin_n8n_nodes_base_1.default.configs.credentials.rules,
            'n8n-nodes-base/cred-class-field-documentation-url-miscased': 'off',
            'n8n-nodes-base/cred-class-field-type-options-password-missing': 'off',
        },
    }, {
        files: ['./nodes/**/*.ts'],
        rules: {
            ...eslint_plugin_n8n_nodes_base_1.default.configs.nodes.rules,
            'n8n-nodes-base/node-class-description-inputs-wrong-regular-node': 'off',
            'n8n-nodes-base/node-class-description-outputs-wrong': 'off',
            'n8n-nodes-base/node-param-type-options-max-value-present': 'off',
        },
    });
}
exports.config = createConfig();
exports.configWithoutCloudSupport = createConfig(false);
exports.default = exports.config;
//# sourceMappingURL=eslint.js.map