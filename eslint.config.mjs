// Standalone ESLint flat config (avoids resolving @n8n/node-cli from pnpm layout).
// TypeScript is checked by the build; .ts is ignored here to avoid parser resolution in pnpm.
export default [
	{ ignores: ['dist/**', 'node_modules/**', '*.config.js', '*.config.mjs', 'scripts/**', '**/*.ts'] },
	{
		files: ['**/*.js'],
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			globals: { require: 'readonly', module: 'readonly', process: 'readonly', __dirname: 'readonly' },
		},
		rules: { 'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], 'no-undef': 'off' },
	},
];




