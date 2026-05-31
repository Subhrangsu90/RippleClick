const fs = require("fs");
const path = require("path");

const changelogPath = path.join(__dirname, "../CHANGELOG.md");
const packagePath = path.join(__dirname, "../package.json");

if (!fs.existsSync(changelogPath) || !fs.existsSync(packagePath)) {
	console.error("Error: CHANGELOG.md or package.json not found.");
	process.exit(1);
}

const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
let changelog = fs.readFileSync(changelogPath, "utf8");

const today = new Date().toISOString().split("T")[0];
const versionHeader = `## ${pkg.version} - ${today}`;

if (changelog.includes("## Unreleased")) {
	changelog = changelog.replace("## Unreleased", `## Unreleased\n\n${versionHeader}`);
	fs.writeFileSync(changelogPath, changelog, "utf8");
	console.log(`Updated CHANGELOG.md with release header: ${versionHeader}`);
} else {
	console.error("Error: '## Unreleased' section header not found in CHANGELOG.md.");
	process.exit(1);
}
