"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauthFlowPrompt = exports.baseUrlPrompt = exports.credentialTypePrompt = void 0;
const prompts_1 = require("@clack/prompts");
const prompts_2 = require("../../../../utils/prompts");
const credentialTypePrompt = async () => await (0, prompts_2.withCancelHandler)((0, prompts_1.select)({
    message: 'What type of authentication does your API use?',
    options: [
        {
            label: 'API Key',
            value: 'apiKey',
            hint: 'Send a secret key via headers, query, or body',
        },
        {
            label: 'Bearer Token',
            value: 'bearer',
            hint: 'Send a token via Authorization header (Authorization: Bearer <token>)',
        },
        {
            label: 'OAuth2',
            value: 'oauth2',
            hint: 'Use an OAuth 2.0 flow to obtain access tokens on behalf of a user or app',
        },
        {
            label: 'Basic Auth',
            value: 'basicAuth',
            hint: 'Send username and password encoded in base64 via the Authorization header',
        },
        {
            label: 'Custom',
            value: 'custom',
            hint: 'Create your own credential logic; an empty credential class will be scaffolded for you',
        },
        {
            label: 'None',
            value: 'none',
            hint: 'No authentication; no credential class will be generated',
        },
    ],
    initialValue: 'apiKey',
}));
exports.credentialTypePrompt = credentialTypePrompt;
const baseUrlPrompt = async () => await (0, prompts_2.withCancelHandler)((0, prompts_1.text)({
    message: "What's the base URL of the API?",
    placeholder: 'https://api.example.com/v2',
    defaultValue: 'https://api.example.com/v2',
    validate: (value) => {
        if (!value)
            return;
        if (!value.startsWith('https://') && !value.startsWith('http://')) {
            return 'Base URL must start with http(s)://';
        }
        try {
            new URL(value);
        }
        catch (error) {
            return 'Must be a valid URL';
        }
        return;
    },
}));
exports.baseUrlPrompt = baseUrlPrompt;
const oauthFlowPrompt = async () => await (0, prompts_2.withCancelHandler)((0, prompts_1.select)({
    message: 'What OAuth2 flow does your API use?',
    options: [
        {
            label: 'Authorization code',
            value: 'authorizationCode',
            hint: 'Users log in and approve access (use this if unsure)',
        },
        {
            label: 'Client credentials',
            value: 'clientCredentials',
            hint: 'Server-to-server auth without user interaction',
        },
    ],
    initialValue: 'authorizationCode',
}));
exports.oauthFlowPrompt = oauthFlowPrompt;
//# sourceMappingURL=prompts.js.map