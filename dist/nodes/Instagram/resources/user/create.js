"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userCreateDescription = void 0;
const showOnlyForUserCreate = {
    operation: ['create'],
    resource: ['user'],
};
exports.userCreateDescription = [
    {
        displayName: 'Name',
        name: 'name',
        type: 'string',
        default: '',
        required: true,
        displayOptions: {
            show: showOnlyForUserCreate,
        },
        description: 'The name of the user',
        routing: {
            send: {
                type: 'body',
                property: 'name',
            },
        },
    },
];
//# sourceMappingURL=create.js.map