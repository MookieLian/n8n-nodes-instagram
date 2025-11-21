"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companyDescription = void 0;
const getAll_1 = require("./getAll");
const showOnlyForCompanies = {
    resource: ['company'],
};
exports.companyDescription = [
    {
        displayName: 'Operation',
        name: 'operation',
        type: 'options',
        noDataExpression: true,
        displayOptions: {
            show: showOnlyForCompanies,
        },
        options: [
            {
                name: 'Get Many',
                value: 'getAll',
                action: 'Get companies',
                description: 'Get companies',
                routing: {
                    request: {
                        method: 'GET',
                        url: '/companies',
                    },
                },
            },
        ],
        default: 'getAll',
    },
    ...getAll_1.companyGetManyDescription,
];
//# sourceMappingURL=index.js.map