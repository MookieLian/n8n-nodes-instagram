"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChildProcessError = void 0;
exports.runCommand = runCommand;
const node_child_process_1 = require("node:child_process");
const package_manager_1 = require("./package-manager");
class ChildProcessError extends Error {
    constructor(message, code, signal) {
        super(message);
        this.code = code;
        this.signal = signal;
    }
}
exports.ChildProcessError = ChildProcessError;
async function runCommand(cmd, args = [], opts = {}) {
    const packageManager = (await (0, package_manager_1.detectPackageManager)()) ?? 'npm';
    return await new Promise((resolve, reject) => {
        const options = {
            cwd: opts.cwd,
            env: { ...process.env, ...opts.env },
            stdio: opts.stdio ?? ['ignore', 'pipe', 'pipe'],
            shell: process.platform === 'win32',
        };
        const child = opts.context === 'local'
            ? (0, node_child_process_1.spawn)(packageManager, ['exec', '--', cmd, ...args], options)
            : (0, node_child_process_1.spawn)(cmd, args, options);
        const stdoutBuffers = [];
        const stderrBuffers = [];
        child.stdout?.on('data', (data) => {
            stdoutBuffers.push(data);
        });
        child.stderr?.on('data', (data) => {
            stderrBuffers.push(data);
        });
        function printOutput() {
            if (opts.printOutput) {
                opts.printOutput({ stdout: stdoutBuffers, stderr: stderrBuffers });
                return;
            }
            for (const buffer of stdoutBuffers) {
                process.stdout.write(buffer);
            }
            for (const buffer of stderrBuffers) {
                process.stderr.write(buffer);
            }
        }
        child.on('error', (error) => {
            printOutput();
            reject(new ChildProcessError(error.message, null, null));
        });
        child.on('close', (code, signal) => {
            if (code === 0) {
                if (opts.alwaysPrintOutput) {
                    printOutput();
                }
                resolve();
            }
            else {
                printOutput();
                reject(new ChildProcessError(`${cmd} exited with code ${code}${signal ? ` (signal: ${signal})` : ''}`, code, signal));
            }
        });
    });
}
//# sourceMappingURL=child-process.js.map