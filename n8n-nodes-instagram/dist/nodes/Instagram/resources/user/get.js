"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userGetDescription = void 0;
const showOnlyForUserGet = {
    operation: ['get'],
    resource: ['user'],
};
exports.userGetDescription = [
    {
        displayName: 'User ID',
        name: 'userId',
        type: 'string',
        displayOptions: { show: showOnlyForUserGet },
        default: '',
        description: "The user's ID to retrieve",
    },
];
//# sourceMappingURL=get.js.map