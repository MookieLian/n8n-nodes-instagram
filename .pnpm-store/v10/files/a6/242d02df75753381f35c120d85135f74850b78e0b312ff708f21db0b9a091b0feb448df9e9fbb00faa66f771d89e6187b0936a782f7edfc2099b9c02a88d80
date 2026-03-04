"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationError = void 0;
const callsites_1 = __importDefault(require("callsites"));
class ApplicationError extends Error {
    constructor(message, { level, tags = {}, extra, ...rest } = {}) {
        super(message, rest);
        this.level = level ?? 'error';
        this.tags = tags;
        this.extra = extra;
        try {
            const filePath = (0, callsites_1.default)()[2].getFileName() ?? '';
            const match = /packages\/([^\/]+)\//.exec(filePath)?.[1];
            if (match)
                this.tags.packageName = match;
        }
        catch { }
    }
}
exports.ApplicationError = ApplicationError;
//# sourceMappingURL=application.error.js.map