"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.folderExists = folderExists;
exports.copyFolder = copyFolder;
exports.delayAtLeast = delayAtLeast;
exports.writeFileSafe = writeFileSafe;
exports.ensureFolder = ensureFolder;
exports.renameFilesInDirectory = renameFilesInDirectory;
exports.renameDirectory = renameDirectory;
exports.createSymlink = createSymlink;
const change_case_1 = require("change-case");
const promises_1 = __importDefault(require("node:fs/promises"));
const node_path_1 = __importDefault(require("node:path"));
const validation_1 = require("./validation");
async function folderExists(dir) {
    try {
        const stat = await promises_1.default.stat(dir);
        return stat.isDirectory();
    }
    catch (error) {
        return false;
    }
}
async function copyFolder({ source: source, destination, ignore = [], }) {
    const ignoreSet = new Set(ignore);
    async function walkAndCopy(currentSrc, currentDest) {
        const entries = await promises_1.default.readdir(currentSrc, { withFileTypes: true });
        await Promise.all(entries.map(async (entry) => {
            if (ignoreSet.has(entry.name))
                return;
            const srcPath = node_path_1.default.join(currentSrc, entry.name);
            const destPath = node_path_1.default.join(currentDest, entry.name);
            if (entry.isDirectory()) {
                await promises_1.default.mkdir(destPath, { recursive: true });
                await walkAndCopy(srcPath, destPath);
            }
            else {
                await promises_1.default.copyFile(srcPath, destPath);
            }
        }));
    }
    await promises_1.default.mkdir(destination, { recursive: true });
    await walkAndCopy(source, destination);
}
async function delayAtLeast(promise, minMs) {
    const delayPromise = new Promise((res) => setTimeout(res, minMs));
    const [result] = await Promise.all([promise, delayPromise]);
    return result;
}
async function writeFileSafe(filePath, contents) {
    await promises_1.default.mkdir(node_path_1.default.dirname(filePath), { recursive: true });
    await promises_1.default.writeFile(filePath, contents);
}
async function ensureFolder(dir) {
    return await promises_1.default.mkdir(dir, { recursive: true });
}
async function renameFilesInDirectory(dirPath, oldName, newName) {
    const files = await promises_1.default.readdir(dirPath);
    for (const file of files) {
        const oldPath = node_path_1.default.resolve(dirPath, file);
        const oldFileName = node_path_1.default.basename(oldPath);
        const newFileName = oldFileName
            .replace(oldName, newName)
            .replace((0, change_case_1.camelCase)(oldName), (0, change_case_1.camelCase)(newName));
        if (newFileName !== oldFileName) {
            const newPath = node_path_1.default.resolve(dirPath, newFileName);
            await promises_1.default.rename(oldPath, newPath);
        }
    }
}
async function renameDirectory(oldDirPath, newDirName) {
    const parentDir = node_path_1.default.dirname(oldDirPath);
    const newDirPath = node_path_1.default.resolve(parentDir, newDirName);
    await promises_1.default.rename(oldDirPath, newDirPath);
    return newDirPath;
}
async function createSymlink(target, linkPath) {
    await promises_1.default.mkdir(node_path_1.default.dirname(linkPath), { recursive: true });
    try {
        const stats = await promises_1.default.lstat(linkPath);
        if (stats.isSymbolicLink() || stats.isFile()) {
            await promises_1.default.unlink(linkPath);
        }
        else if (stats.isDirectory()) {
            await promises_1.default.rm(linkPath, { recursive: true, force: true });
        }
    }
    catch (error) {
        if (!(0, validation_1.isEnoentError)(error)) {
            throw error;
        }
    }
    try {
        const targetStats = await promises_1.default.stat(target);
        const type = targetStats.isDirectory() ? 'dir' : 'file';
        await promises_1.default.symlink(target, linkPath, type);
    }
    catch {
        await promises_1.default.symlink(target, linkPath, 'junction');
    }
}
//# sourceMappingURL=filesystem.js.map