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
	previewStage: document.getElementById("previewStage"),
	editingProfileSelect: document.getElementById("editingProfileSelect"),
	newProfileApp: document.getElementById("newProfileApp"),
	addProfileBtn: document.getElementById("addProfileBtn"),
	profilesListBody: document.getElementById("profilesListBody"),
	dragHighlight: document.getElementById("dragHighlight"),
	dragHighlightStyle: document.getElementById("dragHighlightStyle"),
	dragColorMode: document.getElementById("dragColorMode"),
	dragColorLabel: document.getElementById("dragColorLabel"),
	dragColor: document.getElementById("dragColor"),
	dragWidth: document.getElementById("dragWidth"),
	dragWidthValue: document.getElementById("dragWidthValue"),
	doubleClickDetection: document.getElementById("doubleClickDetection"),
	scrollIndicator: document.getElementById("scrollIndicator"),
	keystrokePosition: document.getElementById("keystrokePosition"),
	keystrokeSize: document.getElementById("keystrokeSize"),
	keystrokeSizeValue: document.getElementById("keystrokeSizeValue"),
	keystrokeBg: document.getElementById("keystrokeBg"),
	keystrokeColor: document.getElementById("keystrokeColor"),
	keystrokeKeycapBg: document.getElementById("keystrokeKeycapBg"),
	keystrokeKeycapColor: document.getElementById("keystrokeKeycapColor"),
	confirmModal: document.getElementById("confirmModal"),
	confirmResetBtn: document.getElementById("confirmResetBtn"),
	cancelResetBtn: document.getElementById("cancelResetBtn"),
	btnStarRepo: document.getElementById("btnStarRepo"),
	btnGithubRepo: document.getElementById("btnGithubRepo"),
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
		dragHighlightStyle: "laser",
		dragColorMode: "click",
		dragColor: "#f59e0b",
		dragWidth: 8,
		doubleClickDetection: true,
		scrollIndicator: true,
		keystrokePosition: "bottom",
		keystrokeSize: 14,
		keystrokeBg: "#141a17",
		keystrokeColor: "#f8fbf5",
		keystrokeKeycapBg: "#f8fbf5",
		keystrokeKeycapColor: "#141a17",
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
		dragHighlightStyle: "laser",
		dragColorMode: "click",
		dragColor: "#f59e0b",
		dragWidth: 10,
		doubleClickDetection: true,
		scrollIndicator: true,
		keystrokePosition: "top",
		keystrokeSize: 16,
		keystrokeBg: "#141a17",
		keystrokeColor: "#f8fbf5",
		keystrokeKeycapBg: "#f8fbf5",
		keystrokeKeycapColor: "#141a17",
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
		dragHighlightStyle: "solid",
		dragColorMode: "click",
		dragColor: "#f59e0b",
		dragWidth: 4,
		doubleClickDetection: false,
		scrollIndicator: false,
		keystrokePosition: "bottom",
		keystrokeSize: 12,
		keystrokeBg: "#141a17",
		keystrokeColor: "#f8fbf5",
		keystrokeKeycapBg: "#f8fbf5",
		keystrokeKeycapColor: "#141a17",
	},
};

let state = {
	enabled: true,
	settings: {},
};
let activePreset = "demo";
let editingProfile = "__default__";

function renderPresets() {
	const container = document.getElementById("presetTabs");
	if (!container) return;

	container.innerHTML = "";

	const builtIns = ["demo", "review", "subtle"];
	for (const preset of builtIns) {
		const btn = document.createElement("button");
		btn.type = "button";
		btn.className = `preset ${activePreset === preset ? "active" : ""}`;
		btn.dataset.preset = preset;
		btn.textContent = preset.charAt(0).toUpperCase() + preset.slice(1);
		btn.addEventListener("click", () => {
			setActivePreset(preset);
			applyPreset(presets[preset]);
		});
		container.appendChild(btn);
	}

	const customPresets = state.settings.customPresets || {};
	const customNames = Object.keys(customPresets).sort();
	for (const preset of customNames) {
		const btn = document.createElement("button");
		btn.type = "button";
		btn.className = `preset ${activePreset === preset ? "active" : ""}`;
		btn.dataset.preset = preset;
		btn.textContent = preset;
		btn.addEventListener("click", () => {
			setActivePreset(preset);
			applyPreset(customPresets[preset]);
		});
		container.appendChild(btn);
	}

	const deleteBtn = document.getElementById("deletePresetBtn");
	if (deleteBtn) {
		const isCustom = !builtIns.includes(activePreset) && customPresets[activePreset];
		deleteBtn.style.display = isCustom ? "inline-flex" : "none";
	}
}

function handleSavePreset() {
	const input = document.getElementById("customPresetName");
	if (!input) return;

	const presetName = input.value.trim();
	if (!presetName) {
		alert("Please enter a preset name.");
		return;
	}

	if (!/^[a-z0-9_\-\s]+$/i.test(presetName)) {
		alert("Invalid preset name. Use alphanumeric characters, spaces, dashes, or underscores.");
		return;
	}

	const builtIns = ["demo", "review", "subtle"];
	if (builtIns.includes(presetName.toLowerCase())) {
		alert("Cannot overwrite built-in presets.");
		return;
	}

	const currentVisuals = {
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
		doubleRing: fields.doubleRing.checked,
		followThrough: fields.followThrough.checked,
		highlightLeft: fields.left.checked,
		highlightRight: fields.right.checked,
		highlightMiddle: fields.middle.checked,
		labelPosition: fields.labelPosition.value,
		labelText: fields.labelText.value.trim().slice(0, 18),
		showLabel: fields.showLabel.checked,
		dragHighlightStyle: fields.dragHighlightStyle.value,
		dragColorMode: fields.dragColorMode.value,
		dragColor: fields.dragColor.value,
		dragWidth: Number(fields.dragWidth.value),
		doubleClickDetection: fields.doubleClickDetection.checked,
		scrollIndicator: fields.scrollIndicator.checked,
		keystrokePosition: fields.keystrokePosition.value,
		keystrokeSize: Number(fields.keystrokeSize.value),
		keystrokeBg: fields.keystrokeBg.value,
		keystrokeColor: fields.keystrokeColor.value,
		keystrokeKeycapBg: fields.keystrokeKeycapBg.value,
		keystrokeKeycapColor: fields.keystrokeKeycapColor.value,
	};

	if (!state.settings.customPresets) state.settings.customPresets = {};
	state.settings.customPresets[presetName] = currentVisuals;

	activePreset = presetName;
	state.settings.activePreset = presetName;
	input.value = "";

	window.clickTapLight.setSettings(state.settings);
}

function handleDeletePreset() {
	if (!state.settings.customPresets || !state.settings.customPresets[activePreset]) return;

	if (confirm(`Delete custom preset "${activePreset}"?`)) {
		delete state.settings.customPresets[activePreset];
		activePreset = "demo";
		state.settings.activePreset = "demo";

		if (editingProfile === "__default__") {
			state.settings = { ...state.settings, ...presets.demo };
		} else {
			if (!state.settings.profiles) state.settings.profiles = {};
			state.settings.profiles[editingProfile] = {
				...state.settings.profiles[editingProfile],
				...presets.demo,
			};
		}

		window.clickTapLight.setSettings(state.settings);
	}
}

function populateProfileDropdown() {
	const select = fields.editingProfileSelect;
	if (!select) return;

	const currentVal = editingProfile;
	select.innerHTML = `<option value="__default__">Default Profile</option>`;

	const profiles = state.settings.profiles || {};
	for (const app of Object.keys(profiles).sort()) {
		const opt = document.createElement("option");
		opt.value = app;
		opt.textContent = `App: ${app}`;
		select.appendChild(opt);
	}

	if (profiles[currentVal] || currentVal === "__default__") {
		select.value = currentVal;
	} else {
		editingProfile = "__default__";
		select.value = "__default__";
	}
}

function renderProfilesList() {
	const tbody = fields.profilesListBody;
	if (!tbody) return;

	tbody.innerHTML = "";
	const profiles = state.settings.profiles || {};
	const apps = Object.keys(profiles).sort();

	if (apps.length === 0) {
		tbody.innerHTML = `
			<tr>
				<td colspan="2" style="padding: 1.5rem 0; color: var(--color-text-quiet); text-align: center;">
					No custom app profiles configured yet.
				</td>
			</tr>
		`;
		return;
	}

	for (const app of apps) {
		const tr = document.createElement("tr");

		const tdApp = document.createElement("td");
		tdApp.textContent = app;

		const tdActions = document.createElement("td");
		tdActions.style.textAlign = "right";

		const btnEdit = document.createElement("button");
		btnEdit.type = "button";
		btnEdit.className = "secondary-action";
		btnEdit.style.height = "1.75rem";
		btnEdit.style.fontSize = "var(--text-xs)";
		btnEdit.style.padding = "0 var(--space-3)";
		btnEdit.style.marginRight = "var(--space-2)";
		btnEdit.innerHTML = `<span class="material-symbols-rounded">edit</span> Customize`;
		btnEdit.addEventListener("click", () => {
			editingProfile = app;
			fields.editingProfileSelect.value = app;
			applyState(state);
			showSection("ripple");
		});

		const btnDelete = document.createElement("button");
		btnDelete.type = "button";
		btnDelete.className = "secondary-action";
		btnDelete.style.height = "1.75rem";
		btnDelete.style.fontSize = "var(--text-xs)";
		btnDelete.style.padding = "0 var(--space-3)";
		btnDelete.innerHTML = `<span class="material-symbols-rounded">delete</span> Delete`;
		btnDelete.addEventListener("click", () => {
			if (confirm(`Delete app profile for "${app}"?`)) {
				delete state.settings.profiles[app];
				if (editingProfile === app) {
					editingProfile = "__default__";
				}
				window.clickTapLight.setSettings(state.settings);
			}
		});

		tdActions.appendChild(btnEdit);
		tdActions.appendChild(btnDelete);
		tr.appendChild(tdApp);
		tr.appendChild(tdActions);
		tbody.appendChild(tr);
	}
}

function applyPreset(presetSettings) {
	if (editingProfile === "__default__") {
		state.settings = { ...state.settings, ...presetSettings };
	} else {
		if (!state.settings.profiles) state.settings.profiles = {};
		state.settings.profiles[editingProfile] = {
			...state.settings.profiles[editingProfile],
			...presetSettings,
		};
	}
	window.clickTapLight.setSettings(state.settings);
	window.clickTapLight.testClick();
}

// ── Live preview ─────────────────────────────────────────────────────────
const PREVIEW_SCALE = 0.72; // scale ripple down to fit sidebar stage
let previewDebounce = null;

function renderPreviewPulse(settings) {
	const stage = fields.previewStage;
	if (!stage) return;

	for (const old of stage.querySelectorAll(".preview-pulse")) old.remove();
	if (!settings.showRipple) return;

	const color =
		settings.colorMode === "separate" ? settings.leftColor || settings.color : settings.color;
	const fillOpacity = Number(settings.fillOpacity ?? 0);
	const ringOpacity = Number(settings.ringOpacity ?? 100);
	const centerOpacity = Number(settings.centerOpacity ?? 88);
	const spread = Number(settings.spread ?? 135);
	const softness = Number(settings.softness ?? 0);
	const endScale = Math.max(1.05, spread / 100);
	const size = Number(settings.size) * PREVIEW_SCALE;
	const stroke = Math.max(1, Number(settings.stroke) * PREVIEW_SCALE);
	const glow = Number(settings.glow) * PREVIEW_SCALE;

	const pulse = document.createElement("div");
	pulse.className = settings.followThrough ? "preview-pulse follow" : "preview-pulse";
	pulse.dataset.button = settings.showLabel ? settings.labelText?.trim() || "Click" : "";
	pulse.style.setProperty("--color", color);
	pulse.style.setProperty("--secondary-color", settings.secondaryColor);
	pulse.style.setProperty("--size", `${size}px`);
	pulse.style.setProperty("--duration", `${settings.duration}ms`);
	pulse.style.setProperty("--stroke", `${stroke}px`);
	pulse.style.setProperty("--opacity", String(settings.opacity / 100));
	pulse.style.setProperty("--glow", `${glow}px`);
	pulse.style.setProperty("--fill-opacity", `${fillOpacity}%`);
	pulse.style.setProperty("--ring-opacity", `${ringOpacity}%`);
	pulse.style.setProperty("--center-opacity", `${centerOpacity}%`);
	pulse.style.setProperty(
		"--inner-opacity",
		settings.doubleRing ? String(centerOpacity / 100) : "0",
	);
	pulse.style.setProperty("--softness-blur", `${softness / 36}px`);
	pulse.style.setProperty("--end-scale", String(endScale));
	pulse.style.setProperty("--label-opacity", settings.showLabel ? "1" : "0");
	pulse.style.setProperty(
		"--label-top",
		settings.labelPosition === "top" ? "auto" : "calc(100% + 8px)",
	);
	pulse.style.setProperty(
		"--label-bottom",
		settings.labelPosition === "top" ? "calc(100% + 8px)" : "auto",
	);

	stage.classList.add("is-animating");
	pulse.addEventListener(
		"animationend",
		() => {
			pulse.remove();
			stage.classList.remove("is-animating");
		},
		{ once: true },
	);
	stage.appendChild(pulse);
}

function schedulePreview() {
	clearTimeout(previewDebounce);
	previewDebounce = setTimeout(() => {
		previewDebounce = null;
		renderPreviewPulse(state.settings);
	}, 150);
}
// ─────────────────────────────────────────────────────────────────────────

const themeStorageKey = "ripple-click-theme-v1";

document.addEventListener(
	"pointerdown",
	() => {
		window.clickTapLight.noteControlInteraction();
	},
	true,
);

function applyTheme(theme) {
	let targetTheme = theme;
	if (theme === "system") {
		targetTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	}
	const safeTheme = targetTheme === "dark" ? "dark" : "light";
	document.documentElement.dataset.theme = safeTheme;

	let icon;
	let label;
	if (theme === "light") {
		icon = "dark_mode";
		label = "Use Dark Theme";
	} else if (theme === "dark") {
		icon = "desktop_windows";
		label = "Use System Theme";
	} else {
		icon = "hdr_auto";
		label = "Use Light Theme";
	}

	fields.themeToggle.innerHTML = `<span class="material-symbols-rounded">${icon}</span>`;
	fields.themeToggle.setAttribute("aria-label", label);
	fields.themeToggle.setAttribute("title", label);
	localStorage.setItem(themeStorageKey, theme);
}

window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
	if (localStorage.getItem(themeStorageKey) === "system") {
		document.documentElement.dataset.theme = e.matches ? "dark" : "light";
	}
});

function updateSliderTrackFill(slider) {
	if (!slider || slider.type !== "range") return;
	const min = Number(slider.min || 0);
	const max = Number(slider.max || 100);
	const val = Number(slider.value || 0);
	const percentage = ((val - min) / (max - min)) * 100;
	slider.style.background = `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${percentage}%, var(--color-surface-raised) ${percentage}%, var(--color-surface-raised) 100%)`;
}

function updateAllSliderTracks() {
	for (const slider of document.querySelectorAll('input[type="range"]')) {
		updateSliderTrackFill(slider);
	}
}

function setActivePreset(preset) {
	activePreset = preset;
	state.settings.activePreset = preset;
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
	const isModifier = ["Control", "Alt", "Shift", "Meta", "Super"].includes(key);
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

	if (!isModifier && (validSingleKey || validFunctionKey || validNamedKeys.has(key))) {
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
	for (const field of [fields.leftColor, fields.rightColor, fields.middleColor]) {
		field.disabled = !isSeparate;
	}
}

function applyDragColorMode(mode) {
	const isCustom = mode === "custom";
	fields.dragColorLabel.classList.toggle("is-disabled", !isCustom);
	fields.dragColor.disabled = !isCustom;
}

function showSection(section) {
	for (const tab of document.querySelectorAll(".settings-tab")) {
		tab.classList.toggle("active", tab.dataset.section === section);
	}
	for (const panel of document.querySelectorAll(".settings-page")) {
		panel.classList.toggle("active", panel.dataset.sectionPanel === section);
	}
}

function applyState(nextState) {
	state = nextState;

	if (state.settings.activePreset) {
		activePreset = state.settings.activePreset;
	}

	populateProfileDropdown();
	renderProfilesList();
	renderPresets();

	let settings = { ...state.settings };
	if (
		editingProfile !== "__default__" &&
		state.settings.profiles &&
		state.settings.profiles[editingProfile]
	) {
		settings = { ...settings, ...state.settings.profiles[editingProfile] };
	}

	fields.platformStatus.classList.toggle("unsupported", !state.platform.supported);
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
	fields.controllerShortcut.value = shortcutToDisplay(settings.controllerShortcut);
	fields.labelPosition.value = settings.labelPosition;
	fields.labelText.value = settings.labelText || "";
	fields.showLabel.checked = settings.showLabel;
	fields.showKeystrokes.checked = settings.showKeystrokes;
	fields.launchAtStartup.checked = state.launchAtStartup;
	fields.keepOnTop.checked = settings.controlAlwaysOnTop;
	fields.dragHighlight.checked = settings.dragHighlight ?? true;
	fields.dragHighlightStyle.value = settings.dragHighlightStyle ?? "laser";
	fields.dragColorMode.value = settings.dragColorMode ?? "click";
	fields.dragColor.value = settings.dragColor ?? "#f59e0b";
	fields.dragWidth.value = settings.dragWidth ?? 8;
	fields.dragWidthValue.value = `${settings.dragWidth ?? 8}px`;
	fields.doubleClickDetection.checked = settings.doubleClickDetection ?? true;
	fields.scrollIndicator.checked = settings.scrollIndicator ?? true;
	fields.keystrokePosition.value = settings.keystrokePosition ?? "bottom";
	fields.keystrokeSize.value = settings.keystrokeSize ?? 14;
	fields.keystrokeSizeValue.value = `${settings.keystrokeSize ?? 14}px`;
	fields.keystrokeBg.value = settings.keystrokeBg ?? "#141a17";
	fields.keystrokeColor.value = settings.keystrokeColor ?? "#f8fbf5";
	fields.keystrokeKeycapBg.value = settings.keystrokeKeycapBg ?? "#f8fbf5";
	fields.keystrokeKeycapColor.value = settings.keystrokeKeycapColor ?? "#141a17";
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
	applyDragColorMode(fields.dragColorMode.value);
	schedulePreview();
	updateAllSliderTracks();
}

function sendSettings() {
	const activeProfileSettings = {
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
		dragHighlight: fields.dragHighlight.checked,
		dragHighlightStyle: fields.dragHighlightStyle.value,
		dragColorMode: fields.dragColorMode.value,
		dragColor: fields.dragColor.value,
		dragWidth: Number(fields.dragWidth.value),
		doubleClickDetection: fields.doubleClickDetection.checked,
		scrollIndicator: fields.scrollIndicator.checked,
		keystrokePosition: fields.keystrokePosition.value,
		keystrokeSize: Number(fields.keystrokeSize.value),
		keystrokeBg: fields.keystrokeBg.value,
		keystrokeColor: fields.keystrokeColor.value,
		keystrokeKeycapBg: fields.keystrokeKeycapBg.value,
		keystrokeKeycapColor: fields.keystrokeKeycapColor.value,
	};

	if (editingProfile === "__default__") {
		Object.assign(state.settings, activeProfileSettings);
	} else {
		if (!state.settings.profiles) state.settings.profiles = {};
		const overrides = { ...activeProfileSettings };
		delete overrides.toggleShortcut;
		delete overrides.controllerShortcut;
		delete overrides.controlAlwaysOnTop;
		delete overrides.dragHighlight;
		state.settings.profiles[editingProfile] = overrides;

		state.settings.controlAlwaysOnTop = fields.keepOnTop.checked;
		state.settings.dragHighlight = fields.dragHighlight.checked;
	}

	const settings = { ...state.settings };
	if (
		editingProfile !== "__default__" &&
		state.settings.profiles &&
		state.settings.profiles[editingProfile]
	) {
		Object.assign(settings, state.settings.profiles[editingProfile]);
	}

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
	fields.dragWidthValue.value = `${settings.dragWidth}px`;
	fields.keystrokeSizeValue.value = `${settings.keystrokeSize}px`;
	applyAccent(settings.color);
	applyColorMode(settings.colorMode);
	applyDragColorMode(settings.dragColorMode);
	window.clickTapLight.setSettings(state.settings);
	updateAllSliderTracks();
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
	fields.dragHighlight,
	fields.dragHighlightStyle,
	fields.dragColorMode,
	fields.dragColor,
	fields.dragWidth,
	fields.doubleClickDetection,
	fields.scrollIndicator,
	fields.keystrokePosition,
	fields.keystrokeSize,
	fields.keystrokeBg,
	fields.keystrokeColor,
	fields.keystrokeKeycapBg,
	fields.keystrokeKeycapColor,
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
	fields.confirmModal.classList.add("is-open");
});

fields.cancelResetBtn.addEventListener("click", () => {
	fields.confirmModal.classList.remove("is-open");
});

fields.confirmResetBtn.addEventListener("click", () => {
	fields.confirmModal.classList.remove("is-open");
	setActivePreset("demo");
	window.clickTapLight.resetSettings();
});

function handleAddProfile() {
	const input = fields.newProfileApp;
	if (!input) return;

	let appName = input.value.trim().toLowerCase();
	if (appName.endsWith(".exe")) {
		appName = appName.slice(0, -4);
	}

	if (!appName) {
		alert("Please enter a process name.");
		return;
	}

	if (!/^[a-z0-9_\-.+]+$/i.test(appName)) {
		alert("Invalid process name. Use alphanumeric characters, dots, dashes, or underscores.");
		return;
	}

	if (!state.settings.profiles) state.settings.profiles = {};
	if (state.settings.profiles[appName]) {
		alert("A profile for this application already exists.");
		return;
	}

	const newProfile = { ...state.settings };
	delete newProfile.profiles;
	delete newProfile.toggleShortcut;
	delete newProfile.controllerShortcut;
	delete newProfile.controlAlwaysOnTop;
	delete newProfile.dragHighlight;

	state.settings.profiles[appName] = newProfile;
	editingProfile = appName;
	input.value = "";

	window.clickTapLight.setSettings(state.settings);
}

fields.resetPreset.addEventListener("click", () => {
	applyPreset(presets[activePreset]);
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
	const current = localStorage.getItem(themeStorageKey) || "system";
	let next = "light";
	if (current === "light") next = "dark";
	else if (current === "dark") next = "system";
	applyTheme(next);
});

fields.closeSettings.addEventListener("click", () => {
	window.clickTapLight.closeSettings();
});

if (fields.btnStarRepo) {
	fields.btnStarRepo.addEventListener("click", () => {
		window.clickTapLight.openExternal("https://github.com/Subhrangsu90/RippleClick");
	});
}

if (fields.btnGithubRepo) {
	fields.btnGithubRepo.addEventListener("click", () => {
		window.clickTapLight.openExternal("https://github.com/Subhrangsu90/RippleClick");
	});
}

for (const tab of document.querySelectorAll(".settings-tab")) {
	tab.addEventListener("click", () => showSection(tab.dataset.section));
}

fields.editingProfileSelect.addEventListener("change", (e) => {
	editingProfile = e.target.value;
	applyState(state);
});

fields.addProfileBtn.addEventListener("click", handleAddProfile);
fields.newProfileApp.addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		handleAddProfile();
	}
});

document.getElementById("savePresetBtn").addEventListener("click", handleSavePreset);
document.getElementById("deletePresetBtn").addEventListener("click", handleDeletePreset);
document.getElementById("customPresetName").addEventListener("keydown", (e) => {
	if (e.key === "Enter") {
		handleSavePreset();
	}
});

applyTheme(localStorage.getItem(themeStorageKey) || "system");
window.clickTapLight.onState(applyState);
window.clickTapLight.getState().then(applyState);

fields.previewStage.addEventListener("click", () => {
	let settings = { ...state.settings };
	if (
		editingProfile !== "__default__" &&
		state.settings.profiles &&
		state.settings.profiles[editingProfile]
	) {
		settings = { ...settings, ...state.settings.profiles[editingProfile] };
	}
	renderPreviewPulse(settings);
});
