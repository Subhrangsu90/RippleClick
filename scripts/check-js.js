const { spawnSync } = require("node:child_process");
const { readdirSync, statSync } = require("node:fs");
const { join } = require("node:path");

const roots = ["src", "scripts"];
const files = [];

function collectJsFiles(dir) {
	for (const entry of readdirSync(dir)) {
		const fullPath = join(dir, entry);
		const stat = statSync(fullPath);

		if (stat.isDirectory()) {
			collectJsFiles(fullPath);
			continue;
		}

		if (entry.endsWith(".js")) {
			files.push(fullPath);
		}
	}
}

for (const root of roots) {
	collectJsFiles(root);
}

let failed = false;

for (const file of files) {
	const result = spawnSync(process.execPath, ["--check", file], {
		stdio: "inherit",
	});

	if (result.status !== 0) {
		failed = true;
	}
}

if (failed) {
	process.exit(1);
}

console.log(`Checked ${files.length} JavaScript files.`);
