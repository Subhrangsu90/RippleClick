const fields = {
	enabled: document.getElementById("enabled"),
	color: document.getElementById("color"),
	secondaryColor: document.getElementById("secondaryColor"),
	colorMode: document.getElementById("colorMode"),
	leftColor: document.getElementById("leftColor"),
	rightColor: document.getElementById("rightColor"),
	middleColor: document.getElementById("middleColor"),
	size: document.getElementById("size"),
	duration: document.getElementById("duration"),
	stroke: document.getElementById("stroke"),
	glow: document.getElementById("glow"),
	opacity: document.getElementById("opacity"),
	fillOpacity: document.getElementById("fillOpacity"),
	ringOpacity: document.getElementById("ringOpacity"),
	centerOpacity: document.getElementById("centerOpacity"),
	spread: document.getElementById("spread"),
	softness: document.getElementById("softness"),
	showRipple: document.getElementById("showRipple"),
	keystrokeDuration: document.getElementById("keystrokeDuration"),
	toggleShortcut: document.getElementById("toggleShortcut"),
	controllerShortcut: document.getElementById("controllerShortcut"),
	sizeValue: document.getElementById("sizeValue"),
	durationValue: document.getElementById("durationValue"),
	strokeValue: document.getElementById("strokeValue"),
	glowValue: document.getElementById("glowValue"),
	opacityValue: document.getElementById("opacityValue"),
	fillOpacityValue: document.getElementById("fillOpacityValue"),
	ringOpacityValue: document.getElementById("ringOpacityValue"),
	centerOpacityValue: document.getElementById("centerOpacityValue"),
	spreadValue: document.getElementById("spreadValue"),
	softnessValue: document.getElementById("softnessValue"),
	keystrokeDurationValue: document.getElementById("keystrokeDurationValue"),
	labelPosition: document.getElementById("labelPosition"),
	labelText: document.getElementById("labelText"),
	showLabel: document.getElementById("showLabel"),
	showKeystrokes: document.getElementById("showKeystrokes"),
	launchAtStartup: document.getElementById("launchAtStartup"),
	keepOnTop: document.getElementById("keepOnTop"),
	doubleRing: document.getElementById("doubleRing"),
	followThrough: document.getElementById("followThrough"),
	left: document.getElementById("left"),
	right: document.getElementById("right"),
	middle: document.getElementById("middle"),
	test: document.getElementById("test"),
	reset: document.getElementById("reset"),
	resetPreset: document.getElementById("resetPreset"),
	resetShortcuts: document.getElementById("resetShortcuts"),
	themeToggle: document.getElementById("themeToggle"),
	closeSettings: document.getElementById("closeSettings"),
	platformStatus: document.getElementById("platformStatus"),
	platformMessage: document.getElementById("platformMessage"),
};

const presets = {
	demo: {
		color: "#88a97c",
		secondaryColor: "#f8fbf5",
		colorMode: "same",
		leftColor: "#88a97c",
		rightColor: "#f87171",
		middleColor: "#60a5fa",
		size: 116,
		duration: 720,
		stroke: 5,
		opacity: 100,
		glow: 44,
		fillOpacity: 0,
		ringOpacity: 100,
		centerOpacity: 88,
		spread: 135,
		softness: 0,
		showRipple: true,
		showKeystrokes: true,
		keystrokeDuration: 1100,
		showLabel: true,
		labelText: "Click",
		labelPosition: "bottom",
		doubleRing: true,
		followThrough: true,
	},
	review: {
		color: "#d7ebd0",
		secondaryColor: "#141a17",
		colorMode: "separate",
		leftColor: "#d7ebd0",
		rightColor: "#f97373",
		middleColor: "#7dd3fc",
		size: 132,
		duration: 880,
		stroke: 6,
		opacity: 94,
		glow: 36,
		fillOpacity: 0,
		ringOpacity: 100,
		centerOpacity: 88,
		spread: 135,
		softness: 0,
		showRipple: true,
		showKeystrokes: true,
		keystrokeDuration: 1400,
		showLabel: true,
		labelText: "Focus",
		labelPosition: "top",
		doubleRing: true,
		followThrough: false,
	},
	subtle: {
		color: "#c8d7c2",
		secondaryColor: "#ffffff",
		colorMode: "same",
		leftColor: "#c8d7c2",
		rightColor: "#fca5a5",
		middleColor: "#93c5fd",
		size: 76,
		duration: 500,
		stroke: 3,
		opacity: 76,
		glow: 12,
		fillOpacity: 0,
		ringOpacity: 100,
		centerOpacity: 88,
		spread: 135,
		softness: 0,
		showRipple: true,
		showKeystrokes: false,
		keystrokeDuration: 800,
		showLabel: false,
		labelText: "",
		labelPosition: "bottom",
		doubleRing: false,
		followThrough: false,
	},
};

let state = {
	enabled: true,
	settings: {},
};
let activePreset = "demo";

const themeStorageKey = "ripple-click-theme-v1";

document.addEventListener(
	"pointerdown",
	() => {
		window.clickTapLight.noteControlInteraction();
	},
	true,
);

function applyTheme(theme) {
	const safeTheme = theme === "light" ? "light" : "dark";
	const nextTheme = safeTheme === "light" ? "dark" : "light";
	document.documentElement.dataset.theme = safeTheme;
	fields.themeToggle.innerHTML = `<span class="material-symbols-rounded">${nextTheme === "dark" ? "dark_mode" : "light_mode"}</span>`;
	fields.themeToggle.setAttribute("aria-label", `Use ${nextTheme} theme`);
	fields.themeToggle.setAttribute("title", `Use ${nextTheme} theme`);
	localStorage.setItem(themeStorageKey, safeTheme);
}

function setActivePreset(preset) {
	activePreset = preset;
	for (const button of document.querySelectorAll(".preset")) {
		button.classList.toggle("active", button.dataset.preset === preset);
	}
}

function applyAccent(color) {
	document.documentElement.style.setProperty("--accent", color);
	document.documentElement.style.setProperty("--soft", `${color}24`);
}

function shortcutToDisplay(shortcut) {
	return String(shortcut || "")
		.replaceAll("Control", "Ctrl")
		.replaceAll("+", " + ");
}

function eventToShortcut(event) {
	const parts = [];
	if (event.ctrlKey) parts.push("Control");
	if (event.altKey) parts.push("Alt");
	if (event.shiftKey) parts.push("Shift");
	if (event.metaKey) parts.push("Super");

	const keyMap = {
		" ": "Space",
		ArrowUp: "Up",
		ArrowDown: "Down",
		ArrowLeft: "Left",
		ArrowRight: "Right",
		Escape: "Esc",
	};
	const key = keyMap[event.key] || event.key;
	if (!/^[\x20-\x7E]+$/.test(key)) return null;
	const isModifier = [
		"Control",
		"Alt",
		"Shift",
		"Meta",
		"Super",
	].includes(key);
	const validNamedKeys = new Set([
		"Space",
		"Tab",
		"Enter",
		"Esc",
		"Backspace",
		"Delete",
		"Insert",
		"Home",
		"End",
		"PageUp",
		"PageDown",
		"Up",
		"Down",
		"Left",
		"Right",
	]);
	const validFunctionKey = /^F([1-9]|1\d|2[0-4])$/.test(key);
	const validSingleKey = /^[A-Z0-9]$/i.test(key);

	if (
		!isModifier &&
		(validSingleKey || validFunctionKey || validNamedKeys.has(key))
	) {
		parts.push(key.length === 1 ? key.toUpperCase() : key);
	}

	if (parts.length < 2 || isModifier) return null;
	return parts.join("+");
}

function installShortcutCapture(field, settingKey) {
	field.addEventListener("keydown", (event) => {
		event.preventDefault();
		const shortcut = eventToShortcut(event);
		if (!shortcut) {
			field.value = "Press modifier + key";
			return;
		}

		field.value = shortcutToDisplay(shortcut);
		window.clickTapLight.setSettings({
			...state.settings,
			[settingKey]: shortcut,
		});
	});

	field.addEventListener("focus", () => {
		field.value = "Press shortcut...";
	});

	field.addEventListener("blur", () => {
		field.value = shortcutToDisplay(state.settings[settingKey]);
	});
}

function applyColorMode(mode) {
	const isSeparate = mode === "separate";
	for (const label of document.querySelectorAll(".button-color")) {
		label.classList.toggle("is-disabled", !isSeparate);
	}
	for (const field of [
		fields.leftColor,
		fields.rightColor,
		fields.middleColor,
	]) {
		field.disabled = !isSeparate;
	}
}

function showSection(section) {
	for (const tab of document.querySelectorAll(".settings-tab")) {
		tab.classList.toggle("active", tab.dataset.section === section);
	}
	for (const panel of document.querySelectorAll(".settings-page")) {
		panel.classList.toggle(
			"active",
			panel.dataset.sectionPanel === section,
		);
	}
}

function applyState(nextState) {
	state = nextState;
	const settings = state.settings;

	fields.platformStatus.classList.toggle(
		"unsupported",
		!state.platform.supported,
	);
	fields.platformMessage.textContent = state.platform.message;
	fields.enabled.checked = state.enabled;
	fields.color.value = settings.color;
	fields.secondaryColor.value = settings.secondaryColor;
	fields.colorMode.value = settings.colorMode || "same";
	fields.leftColor.value = settings.leftColor || settings.color;
	fields.rightColor.value = settings.rightColor || settings.color;
	fields.middleColor.value = settings.middleColor || settings.color;
	fields.size.value = settings.size;
	fields.duration.value = settings.duration;
	fields.stroke.value = settings.stroke;
	fields.glow.value = settings.glow;
	fields.opacity.value = settings.opacity;
	fields.fillOpacity.value = settings.fillOpacity ?? 0;
	fields.ringOpacity.value = settings.ringOpacity ?? 100;
	fields.centerOpacity.value = settings.centerOpacity ?? 88;
	fields.spread.value = settings.spread ?? 135;
	fields.softness.value = settings.softness ?? 0;
	fields.showRipple.checked = settings.showRipple;
	fields.keystrokeDuration.value = settings.keystrokeDuration;
	fields.toggleShortcut.value = shortcutToDisplay(settings.toggleShortcut);
	fields.controllerShortcut.value = shortcutToDisplay(
		settings.controllerShortcut,
	);
	fields.labelPosition.value = settings.labelPosition;
	fields.labelText.value = settings.labelText || "";
	fields.showLabel.checked = settings.showLabel;
	fields.showKeystrokes.checked = settings.showKeystrokes;
	fields.launchAtStartup.checked = state.launchAtStartup;
	fields.keepOnTop.checked = settings.controlAlwaysOnTop;
	fields.doubleRing.checked = settings.doubleRing;
	fields.followThrough.checked = settings.followThrough;
	fields.left.checked = settings.highlightLeft;
	fields.right.checked = settings.highlightRight;
	fields.middle.checked = settings.highlightMiddle;
	fields.sizeValue.value = `${settings.size}px`;
	fields.durationValue.value = `${settings.duration}ms`;
	fields.strokeValue.value = `${settings.stroke}px`;
	fields.glowValue.value = `${settings.glow}px`;
	fields.opacityValue.value = `${settings.opacity}%`;
	fields.fillOpacityValue.value = `${settings.fillOpacity ?? 0}%`;
	fields.ringOpacityValue.value = `${settings.ringOpacity ?? 100}%`;
	fields.centerOpacityValue.value = `${settings.centerOpacity ?? 88}%`;
	fields.spreadValue.value = `${settings.spread ?? 135}%`;
	fields.softnessValue.value = `${settings.softness ?? 0}%`;
	fields.keystrokeDurationValue.value = `${settings.keystrokeDuration}ms`;
	applyAccent(settings.color);
	applyColorMode(fields.colorMode.value);
}

function sendSettings() {
	const settings = {
		color: fields.color.value,
		secondaryColor: fields.secondaryColor.value,
		colorMode: fields.colorMode.value,
		leftColor: fields.leftColor.value,
		rightColor: fields.rightColor.value,
		middleColor: fields.middleColor.value,
		size: Number(fields.size.value),
		duration: Number(fields.duration.value),
		stroke: Number(fields.stroke.value),
		glow: Number(fields.glow.value),
		opacity: Number(fields.opacity.value),
		fillOpacity: Number(fields.fillOpacity.value),
		ringOpacity: Number(fields.ringOpacity.value),
		centerOpacity: Number(fields.centerOpacity.value),
		spread: Number(fields.spread.value),
		softness: Number(fields.softness.value),
		showRipple: fields.showRipple.checked,
		keystrokeDuration: Number(fields.keystrokeDuration.value),
		toggleShortcut: state.settings.toggleShortcut,
		controllerShortcut: state.settings.controllerShortcut,
		labelPosition: fields.labelPosition.value,
		labelText: fields.labelText.value.trim().slice(0, 18),
		showLabel: fields.showLabel.checked,
		showKeystrokes: fields.showKeystrokes.checked,
		doubleRing: fields.doubleRing.checked,
		followThrough: fields.followThrough.checked,
		highlightLeft: fields.left.checked,
		highlightRight: fields.right.checked,
		highlightMiddle: fields.middle.checked,
		controlAlwaysOnTop: fields.keepOnTop.checked,
	};

	fields.sizeValue.value = `${settings.size}px`;
	fields.durationValue.value = `${settings.duration}ms`;
	fields.strokeValue.value = `${settings.stroke}px`;
	fields.glowValue.value = `${settings.glow}px`;
	fields.opacityValue.value = `${settings.opacity}%`;
	fields.fillOpacityValue.value = `${settings.fillOpacity}%`;
	fields.ringOpacityValue.value = `${settings.ringOpacity}%`;
	fields.centerOpacityValue.value = `${settings.centerOpacity}%`;
	fields.spreadValue.value = `${settings.spread}%`;
	fields.softnessValue.value = `${settings.softness}%`;
	fields.keystrokeDurationValue.value = `${settings.keystrokeDuration}ms`;
	applyAccent(settings.color);
	applyColorMode(settings.colorMode);
	window.clickTapLight.setSettings(settings);
}

fields.enabled.addEventListener("change", () => {
	window.clickTapLight.setEnabled(fields.enabled.checked);
});

fields.launchAtStartup.addEventListener("change", () => {
	window.clickTapLight.setLaunchAtStartup(fields.launchAtStartup.checked);
});

for (const field of [
	fields.color,
	fields.secondaryColor,
	fields.colorMode,
	fields.leftColor,
	fields.rightColor,
	fields.middleColor,
	fields.size,
	fields.duration,
	fields.stroke,
	fields.glow,
	fields.opacity,
	fields.fillOpacity,
	fields.ringOpacity,
	fields.centerOpacity,
	fields.spread,
	fields.softness,
	fields.showRipple,
	fields.keystrokeDuration,
	fields.labelPosition,
	fields.labelText,
	fields.showLabel,
	fields.showKeystrokes,
	fields.keepOnTop,
	fields.doubleRing,
	fields.followThrough,
	fields.left,
	fields.right,
	fields.middle,
]) {
	field.addEventListener("input", sendSettings);
	field.addEventListener("change", sendSettings);
}

installShortcutCapture(fields.toggleShortcut, "toggleShortcut");
installShortcutCapture(fields.controllerShortcut, "controllerShortcut");

fields.test.addEventListener("click", () => {
	window.clickTapLight.testClick();
});

fields.reset.addEventListener("click", () => {
	if (confirm("Reset every RippleClick setting?")) {
		setActivePreset("demo");
		window.clickTapLight.resetSettings();
	}
});

fields.resetPreset.addEventListener("click", () => {
	window.clickTapLight.setSettings(presets[activePreset]);
	window.clickTapLight.testClick();
});

fields.resetShortcuts.addEventListener("click", () => {
	window.clickTapLight.setSettings({
		...state.settings,
		toggleShortcut: "Control+Alt+H",
		controllerShortcut: "Control+Alt+C",
		showKeystrokes: true,
		keystrokeDuration: 1100,
	});
});

fields.themeToggle.addEventListener("click", () => {
	applyTheme(
		document.documentElement.dataset.theme === "light" ? "dark" : "light",
	);
});

fields.closeSettings.addEventListener("click", () => {
	window.clickTapLight.closeSettings();
});

for (const presetButton of document.querySelectorAll(".preset")) {
	presetButton.addEventListener("click", () => {
		setActivePreset(presetButton.dataset.preset);
		window.clickTapLight.setSettings(presets[activePreset]);
		window.clickTapLight.testClick();
	});
}

for (const tab of document.querySelectorAll(".settings-tab")) {
	tab.addEventListener("click", () => showSection(tab.dataset.section));
}

applyTheme(localStorage.getItem(themeStorageKey) || "light");
window.clickTapLight.onState(applyState);
window.clickTapLight.getState().then(applyState);
