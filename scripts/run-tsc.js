#!/usr/bin/env node
'use strict';

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Find TypeScript compiler (works with pnpm when .bin linking failed)
function findTsc() {
	const root = process.cwd();
	const nodeModules = path.join(root, 'node_modules');
	try {
		const { readdirSync } = require('fs');
		const pnpmDir = path.join(nodeModules, '.pnpm');
		if (fs.existsSync(pnpmDir)) {
			const entries = readdirSync(pnpmDir, { withFileTypes: true });
			for (const e of entries) {
				if (!e.isDirectory() || !e.name.startsWith('typescript@')) continue;
				const tscJs = path.join(pnpmDir, e.name, 'node_modules', 'typescript', 'bin', 'tsc');
				const tscJsAlt = path.join(pnpmDir, e.name, 'node_modules', 'typescript', 'bin', 'tsc.js');
				if (fs.existsSync(tscJs)) return tscJs;
				if (fs.existsSync(tscJsAlt)) return tscJsAlt;
			}
		}
		const direct = path.join(nodeModules, 'typescript', 'bin', 'tsc');
		if (fs.existsSync(direct)) return direct;
		return require.resolve('typescript/bin/tsc', { paths: [root] });
	} catch (_) {}
	return null;
}

const tscPath = findTsc();
if (!tscPath) {
	console.error('Could not find TypeScript. Run: pnpm install');
	process.exit(1);
}

const root = process.cwd();
const args = process.argv.slice(2);
execSync(`node ${JSON.stringify(tscPath)} ${args.map((a) => JSON.stringify(a)).join(' ')}`, {
	stdio: 'inherit',
	cwd: root,
});
