"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = sleep;
exports.createSpinner = createSpinner;
exports.openUrl = openUrl;
exports.runCommands = runCommands;
exports.readPackageName = readPackageName;
exports.createOpenN8nHandler = createOpenN8nHandler;
exports.buildHelpText = buildHelpText;
const node_child_process_1 = require("node:child_process");
const promises_1 = __importDefault(require("node:fs/promises"));
const picocolors_1 = __importDefault(require("picocolors"));
const json_1 = require("../../utils/json");
const ANSI = {
    CLEAR_SCREEN: '\x1b[2J',
    CURSOR_HOME: '\x1b[H',
    ENTER_ALT_SCREEN: '\x1b[?1049h',
    EXIT_ALT_SCREEN: '\x1b[?1049l',
    HIDE_CURSOR: '\x1b[?25l',
    SHOW_CURSOR: '\x1b[?25h',
};
const CONFIG = {
    MIN_LINES_PER_PANEL: 3,
    MAX_LINES_PER_PANEL: 50,
    RENDER_INTERVAL_MS: 100,
    SEPARATOR_WIDTH: 80,
    GRACEFUL_SHUTDOWN_TIMEOUT: 5000,
    KILL_TIMEOUT_MS: 1000,
    PROCESS_KILL_DELAY_MS: 100,
    EXIT_KILL_TIMEOUT_MS: 500,
};
function calculatePanelHeight(numPanels, headerLines) {
    const terminalRows = process.stdout.rows ?? 24;
    const panelOverheadPerPanel = 2;
    const blankLinesBetweenPanels = numPanels - 1;
    const helpTextLines = 2;
    const totalOverhead = headerLines + numPanels * panelOverheadPerPanel + blankLinesBetweenPanels + helpTextLines;
    const availableRows = Math.max(0, terminalRows - totalOverhead);
    const linesPerPanel = Math.floor(availableRows / numPanels);
    const minRequiredRows = headerLines +
        numPanels * (CONFIG.MIN_LINES_PER_PANEL + panelOverheadPerPanel) +
        blankLinesBetweenPanels +
        helpTextLines;
    if (terminalRows < minRequiredRows) {
        return Math.max(1, linesPerPanel);
    }
    return Math.max(CONFIG.MIN_LINES_PER_PANEL, Math.min(CONFIG.MAX_LINES_PER_PANEL, linesPerPanel));
}
function stripScreenControlCodes(str) {
    return str
        .replace(/\x1b\[2J/g, '')
        .replace(/\x1b\[H/g, '')
        .replace(/\x1b\[(\d+)?J/g, '')
        .replace(/\x1b\[(\d+)?K/g, '')
        .replace(/\x1b\[(\d+)?[ABCDEFG]/g, '');
}
function getStatusDisplay(output) {
    if (output.isRunning) {
        return { icon: '', colorFn: picocolors_1.default.green, text: 'running' };
    }
    const exitCode = output.exitCode ?? 1;
    if (exitCode === 130) {
        return { icon: '✗ ', colorFn: picocolors_1.default.red, text: 'canceled' };
    }
    const success = exitCode === 0;
    return {
        icon: success ? '✓ ' : '✗ ',
        colorFn: success ? picocolors_1.default.green : picocolors_1.default.red,
        text: `exit ${exitCode}`,
    };
}
function getVisibleLength(str) {
    return str.replace(/\x1b\[[0-9;]*m/g, '').length;
}
function truncateLine(line, maxWidth) {
    if (getVisibleLength(line) <= maxWidth)
        return line;
    let result = '';
    let visible = 0;
    let inAnsi = false;
    for (const char of line) {
        if (char === '\x1b')
            inAnsi = true;
        if (inAnsi) {
            result += char;
            if (char === 'm')
                inAnsi = false;
            continue;
        }
        if (visible >= maxWidth - 1) {
            result += picocolors_1.default.dim('…');
            break;
        }
        result += char;
        visible++;
    }
    return result;
}
function processStreamData(data, outputLines) {
    const text = data.toString().replace(/\r\n/g, '\n');
    const segments = text.split('\r');
    for (let i = 0; i < segments.length; i++) {
        if (i > 0 && outputLines.length > 0) {
            outputLines.pop();
        }
        const lines = segments[i].split('\n');
        for (let j = 0; j < lines.length; j++) {
            const isLastLine = j === lines.length - 1;
            if (lines[j] || !isLastLine) {
                outputLines.push(lines[j]);
            }
        }
    }
}
async function sleep(ms) {
    await new Promise((resolve) => setTimeout(resolve, ms));
}
function createSpinner(text) {
    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let index = 0;
    return () => {
        const frame = picocolors_1.default.cyan(frames[index]);
        index = (index + 1) % frames.length;
        const message = typeof text === 'function' ? text() : text;
        return `${frame} ${message}`;
    };
}
function getOpenCommand(url) {
    const escapedUrl = url.replace(/"/g, '\\"');
    switch (process.platform) {
        case 'darwin':
            return `open "${escapedUrl}"`;
        case 'win32':
            return `start "" "${escapedUrl}"`;
        default:
            return `xdg-open "${escapedUrl}"`;
    }
}
function openUrl(url) {
    try {
        (0, node_child_process_1.execSync)(getOpenCommand(url));
    }
    catch {
    }
}
function renderPanel(output, terminalWidth, panelHeight) {
    const status = getStatusDisplay(output);
    const maxWidth = terminalWidth - 4;
    const header = `╭─ ${status.colorFn(status.icon)}${picocolors_1.default.bold(output.name)} ${status.colorFn(`(${status.text})`)}\n`;
    const recentLines = output.lines.slice(-panelHeight);
    let content = '';
    if (recentLines.length === 0 && output.getPlaceholder && output.isRunning) {
        content = `│ ${output.getPlaceholder()}\n`;
        for (let i = 1; i < panelHeight; i++) {
            content += '│\n';
        }
    }
    else {
        for (let i = 0; i < panelHeight; i++) {
            const cleanedLine = stripScreenControlCodes(recentLines[i] ?? '');
            content += cleanedLine ? `│ ${truncateLine(cleanedLine, maxWidth)}\n` : '│\n';
        }
    }
    return header + content + '╰─\n';
}
function renderUI(outputs, helpText, headerText) {
    const terminalWidth = process.stdout.columns ?? CONFIG.SEPARATOR_WIDTH;
    let result = '';
    if (headerText) {
        result += `${headerText}\n\n`;
    }
    const headerLines = headerText ? headerText.split('\n').length + 1 : 0;
    const panelHeight = calculatePanelHeight(outputs.length, headerLines);
    outputs.forEach((output, index) => {
        result += renderPanel(output, terminalWidth, panelHeight);
        if (index < outputs.length - 1) {
            result += '\n';
        }
    });
    const allRunning = outputs.every((o) => o.isRunning);
    if (allRunning && helpText) {
        result += `\n${helpText}\n`;
    }
    return result;
}
function doRender(state, outputs, helpText, headerText) {
    const newOutput = renderUI(outputs, helpText, headerText);
    if (newOutput === state.lastOutput)
        return;
    process.stdout.write(ANSI.CLEAR_SCREEN + ANSI.CURSOR_HOME + newOutput);
    state.lastOutput = newOutput;
}
function setupKeyboardInput(handleSignal, cleanup, keyHandlers) {
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', (key) => {
        if (key === '\u0003' || key === 'q') {
            handleSignal();
            return;
        }
        const handler = keyHandlers?.find((h) => h.key === key && h.key !== 'q');
        if (handler) {
            handler.handler(cleanup);
        }
    });
}
async function handleCommandCompletion(commandOutputs, cleanup) {
    const exitedCommand = commandOutputs.find((o) => !o.isRunning);
    if (!exitedCommand)
        return;
    await cleanup(true);
    const exitCode = exitedCommand.exitCode ?? 1;
    const message = exitCode === 0
        ? picocolors_1.default.green('Command completed successfully.')
        : picocolors_1.default.red(`Command "${exitedCommand.name}" exited with code ${exitCode}.`);
    process.stdout.write(`\n${picocolors_1.default.bold(message)}\n`);
    process.exit(exitCode);
}
function restoreTerminal() {
    if (process.stdout.isTTY) {
        process.stdout.write(ANSI.SHOW_CURSOR);
        process.stdout.write(ANSI.EXIT_ALT_SCREEN);
    }
}
function printAllCommandOutputs(outputs, headerText) {
    if (headerText) {
        process.stdout.write(`\n${headerText}\n\n`);
    }
    outputs.forEach((output, index) => {
        process.stdout.write(`${picocolors_1.default.bold(output.name)}\n`);
        for (const line of output.lines) {
            const cleanedLine = stripScreenControlCodes(line);
            if (cleanedLine.trim()) {
                process.stdout.write(`${cleanedLine}\n`);
            }
        }
        if (index < outputs.length - 1) {
            process.stdout.write('\n');
        }
    });
    process.stdout.write(`\n${picocolors_1.default.dim('Shutting down gracefully... Press Ctrl+C again to force quit.')}\n`);
}
async function killProcess(proc, graceful) {
    if (!proc.pid || proc.exitCode !== null)
        return;
    const pid = proc.pid;
    return await new Promise((resolve) => {
        let timeoutId = null;
        if (graceful) {
            timeoutId = setTimeout(() => {
                try {
                    if (process.platform === 'win32') {
                        (0, node_child_process_1.execSync)(`taskkill /PID ${pid} /T /F`, { timeout: CONFIG.KILL_TIMEOUT_MS });
                    }
                    else {
                        process.kill(-pid, 'SIGKILL');
                    }
                }
                catch {
                }
                resolve();
            }, CONFIG.GRACEFUL_SHUTDOWN_TIMEOUT);
        }
        proc.once('exit', () => {
            if (timeoutId)
                clearTimeout(timeoutId);
            resolve();
        });
        try {
            if (process.platform === 'win32') {
                (0, node_child_process_1.execSync)(`taskkill /PID ${pid} /T /F`, { timeout: CONFIG.KILL_TIMEOUT_MS });
            }
            else {
                process.kill(-pid, graceful ? 'SIGTERM' : 'SIGKILL');
            }
        }
        catch {
            try {
                proc.kill(graceful ? 'SIGTERM' : 'SIGKILL');
            }
            catch {
                if (timeoutId)
                    clearTimeout(timeoutId);
                resolve();
            }
        }
        if (!graceful) {
            if (timeoutId)
                clearTimeout(timeoutId);
            setTimeout(resolve, CONFIG.PROCESS_KILL_DELAY_MS);
        }
    });
}
function runCommands(config) {
    const commandOutputs = [];
    const childProcesses = [];
    let renderInterval = null;
    let isShuttingDown = false;
    let cleanupPerformed = false;
    const cleanup = async (graceful = true) => {
        if (cleanupPerformed)
            return;
        cleanupPerformed = true;
        if (renderInterval) {
            clearInterval(renderInterval);
            renderInterval = null;
        }
        restoreTerminal();
        if (graceful) {
            printAllCommandOutputs(commandOutputs, config.headerText);
        }
        await Promise.all(childProcesses.map(async (proc) => await killProcess(proc, graceful)));
        if (process.stdin.isTTY) {
            process.stdin.setRawMode(false);
        }
    };
    const handleSignal = () => {
        if (!isShuttingDown) {
            isShuttingDown = true;
            commandOutputs.forEach((output) => {
                if (output.isRunning) {
                    output.isRunning = false;
                    output.exitCode = 130;
                }
            });
            void cleanup(true).then(() => {
                process.exit(130);
            });
            return;
        }
        if (cleanupPerformed) {
            process.stdout.write(picocolors_1.default.yellow('\nForce quitting...\n'));
            process.exit(130);
        }
        else {
            void cleanup(false).then(() => {
                process.exit(130);
            });
        }
    };
    process.on('SIGINT', handleSignal);
    process.on('SIGTERM', handleSignal);
    process.on('exit', () => {
        if (!cleanupPerformed && childProcesses.length > 0) {
            for (const proc of childProcesses) {
                if (!proc.pid)
                    continue;
                try {
                    if (process.platform === 'win32') {
                        (0, node_child_process_1.execSync)(`taskkill /PID ${proc.pid} /T /F`, { timeout: CONFIG.EXIT_KILL_TIMEOUT_MS });
                    }
                    else {
                        process.kill(-proc.pid, 'SIGKILL');
                    }
                }
                catch {
                }
            }
        }
    });
    process.on('uncaughtException', (error) => {
        console.error(picocolors_1.default.red('\nUncaught exception:'), error);
        void cleanup(false).then(() => {
            process.exit(1);
        });
    });
    process.on('unhandledRejection', (reason) => {
        console.error(picocolors_1.default.red('\nUnhandled rejection:'), reason);
        void cleanup(false).then(() => {
            process.exit(1);
        });
    });
    const startRenderLoop = () => {
        if (renderInterval !== null)
            return;
        if (process.stdout.isTTY) {
            process.stdout.write(ANSI.ENTER_ALT_SCREEN);
            process.stdout.write(ANSI.HIDE_CURSOR);
        }
        const state = {
            lastOutput: '',
        };
        if (process.stdin.isTTY) {
            setupKeyboardInput(handleSignal, cleanup, config.keyHandlers);
        }
        doRender(state, commandOutputs, config.helpText?.(), config.headerText);
        renderInterval = setInterval(() => {
            doRender(state, commandOutputs, config.helpText?.(), config.headerText);
            void handleCommandCompletion(commandOutputs, cleanup);
        }, CONFIG.RENDER_INTERVAL_MS);
    };
    config.commands.forEach((cmdConfig) => {
        const output = {
            name: cmdConfig.name,
            lines: [],
            isRunning: true,
            exitCode: null,
            getPlaceholder: cmdConfig.getPlaceholder,
        };
        commandOutputs.push(output);
        const commandString = `${cmdConfig.cmd} ${cmdConfig.args.join(' ')}`;
        const child = (0, node_child_process_1.spawn)(commandString, {
            shell: true,
            cwd: cmdConfig.cwd,
            stdio: ['ignore', 'pipe', 'pipe'],
            detached: process.platform !== 'win32',
            env: {
                ...process.env,
                ...cmdConfig.env,
                FORCE_COLOR: '3',
                COLORTERM: 'truecolor',
                TERM: 'xterm-256color',
            },
        });
        childProcesses.push(child);
        const handleData = (data) => {
            processStreamData(data, output.lines);
            if (cmdConfig.onOutput) {
                const lines = data.toString().split('\n');
                for (const line of lines) {
                    if (line.trim()) {
                        cmdConfig.onOutput(line);
                    }
                }
            }
        };
        child.stdout.on('data', handleData);
        child.stderr.on('data', handleData);
        child.on('close', (code) => {
            output.isRunning = false;
            output.exitCode = code;
        });
    });
    if (commandOutputs.length > 0) {
        startRenderLoop();
    }
}
async function readPackageName() {
    return await promises_1.default
        .readFile('package.json', 'utf-8')
        .then((packageJson) => (0, json_1.jsonParse)(packageJson)?.name ?? 'unknown');
}
function createOpenN8nHandler() {
    return {
        key: 'o',
        handler: () => {
            openUrl('http://localhost:5678');
        },
    };
}
function buildHelpText(hasN8n, isN8nReady) {
    const quitText = `${picocolors_1.default.dim('Press')} q ${picocolors_1.default.dim('to quit')}`;
    if (hasN8n && isN8nReady) {
        return `${quitText} ${picocolors_1.default.dim('|')} o ${picocolors_1.default.dim('to open n8n')}`;
    }
    return quitText;
}
//# sourceMappingURL=utils.js.map