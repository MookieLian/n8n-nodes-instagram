export declare function folderExists(dir: string): Promise<boolean>;
export declare function copyFolder({ source: source, destination, ignore, }: {
    source: string;
    destination: string;
    ignore?: string[];
}): Promise<void>;
export declare function delayAtLeast<T>(promise: Promise<T>, minMs: number): Promise<T>;
export declare function writeFileSafe(filePath: string, contents: string | Uint8Array): Promise<void>;
export declare function ensureFolder(dir: string): Promise<string | undefined>;
export declare function renameFilesInDirectory(dirPath: string, oldName: string, newName: string): Promise<void>;
export declare function renameDirectory(oldDirPath: string, newDirName: string): Promise<string>;
export declare function createSymlink(target: string, linkPath: string): Promise<void>;
