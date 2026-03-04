/**
 * Checks if the given childPath is contained within the parentPath. Resolves
 * the paths before comparing them, so that relative paths are also supported.
 */
export declare function isContainedWithin(parentPath: string, childPath: string): boolean;
/**
 * Joins the given paths to the parentPath, ensuring that the resulting path
 * is still contained within the parentPath. If not, it throws an error to
 * prevent path traversal vulnerabilities.
 *
 * @throws {UnexpectedError} If the resulting path is not contained within the parentPath.
 */
export declare function safeJoinPath(parentPath: string, ...paths: string[]): string;
export declare function findPackageJson(startPath: string): string | null;
export declare function readPackageJsonCredentials(packageJsonPath: string): Set<string>;
export declare function extractCredentialNameFromFile(credentialFilePath: string): string | null;
export declare function validateIconPath(iconPath: string, baseDir: string): {
    isValid: boolean;
    isFile: boolean;
    isSvg: boolean;
    exists: boolean;
};
export declare function readPackageJsonNodes(packageJsonPath: string): string[];
export declare function areAllCredentialUsagesTestedByNodes(credentialName: string, packageDir: string): boolean;
export declare function findSimilarSvgFiles(targetPath: string, baseDir: string): string[];
//# sourceMappingURL=file-utils.d.ts.map