const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
	{
		ignores: ["build/**", "dist/**", "node_modules/**", "release/**", "out/**"],
	},
	js.configs.recommended,
	{
		files: ["*.js", "scripts/**/*.js", "src/main.js", "src/preload.js"],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: "commonjs",
			globals: {
				...globals.node,
			},
		},
	},
	{
		files: ["src/control/**/*.js", "src/overlay/**/*.js"],
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: "script",
			globals: {
				...globals.browser,
			},
		},
	},
	{
		rules: {
			"no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
		},
	},
];
