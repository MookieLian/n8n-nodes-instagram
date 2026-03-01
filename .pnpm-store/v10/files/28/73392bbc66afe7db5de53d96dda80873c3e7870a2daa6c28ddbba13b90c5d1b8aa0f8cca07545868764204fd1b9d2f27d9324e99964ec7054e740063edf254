export type N8nPackageJson = {
    name: string;
    version: string;
    n8n?: {
        nodes?: string[];
        credentials?: string[];
        strict?: boolean;
    };
};
export declare function updatePackageJson(dirPath: string, updater: (packageJson: N8nPackageJson) => N8nPackageJson): Promise<void>;
export declare function getPackageJson(dirPath: string): Promise<N8nPackageJson | null>;
export declare function isN8nNodePackage(dirPath?: string): Promise<boolean>;
export declare function getPackageJsonNodes(dirPath: string): Promise<string[]>;
export declare function setNodesPackageJson(dirPath: string, nodes: string[]): Promise<void>;
export declare function addCredentialPackageJson(dirPath: string, credential: string): Promise<void>;
