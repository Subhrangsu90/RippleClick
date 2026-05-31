const fs = require("node:fs/promises");
const path = require("node:path");

const keepLocales = new Set(["en-US.pak"]);
const optionalRuntimeFiles = ["LICENSES.chromium.html", "vk_swiftshader.dll", "vulkan-1.dll"];

async function removeIfExists(filePath) {
	try {
		await fs.rm(filePath, { force: true, recursive: true });
	} catch (error) {
		if (error.code !== "ENOENT") throw error;
	}
}

module.exports = async function afterPack(context) {
	if (context.electronPlatformName !== "win32") return;

	const localesDir = path.join(context.appOutDir, "locales");
	const localeFiles = await fs.readdir(localesDir).catch(() => []);
	await Promise.all(
		localeFiles
			.filter((file) => !keepLocales.has(file))
			.map((file) => removeIfExists(path.join(localesDir, file))),
	);

	await Promise.all(
		optionalRuntimeFiles.map((file) => removeIfExists(path.join(context.appOutDir, file))),
	);
};
