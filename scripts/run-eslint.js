#!/usr/bin/env node
'use strict';

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Find eslint binary (works with pnpm when .bin linking failed)
function findEslint() {
	const root = process.cwd();
	const nodeModules = path.join(root, 'node_modules');
	try {
		const { readdirSync } = require('fs');
		const dirs = readdirSync(nodeModules);
		for (const d of dirs) {
			if (d === '.bin' || !d.startsWith('eslint')) continue;
			const p = path.join(nodeModules, d, 'node_modules', 'eslint', 'bin', 'eslint.js');
			if (fs.existsSync(p)) return p;
		}
		const pnpmDir = path.join(nodeModules, '.pnpm');
		if (fs.existsSync(pnpmDir)) {
			const entries = readdirSync(pnpmDir, { withFileTypes: true });
			for (const e of entries) {
				if (!e.isDirectory() || !e.name.includes('eslint')) continue;
				const p = path.join(pnpmDir, e.name, 'node_modules', 'eslint', 'bin', 'eslint.js');
				if (fs.existsSync(p)) return p;
			}
		}
	} catch (_) {}
	try {
		return require.resolve('eslint/bin/eslint.js', { paths: [root] });
	} catch (_) {}
	return null;
}

const eslintPath = findEslint();
if (!eslintPath) {
	console.error('Could not find eslint. Run: pnpm install');
	process.exit(1);
}

const args = process.argv.slice(2);
const pass = args.length ? args : ['.'];
execSync(`node ${JSON.stringify(eslintPath)} ${pass.map((a) => JSON.stringify(a)).join(' ')}`, {
	stdio: 'inherit',
	cwd: process.cwd(),
});
