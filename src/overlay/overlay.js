const stage = document.getElementById("stage");
let enabled = true;
let currentSettings = {
	color: "#88a97c",
	secondaryColor: "#f8fbf5",
	colorMode: "same",
	leftColor: "#88a97c",
	rightColor: "#f87171",
	middleColor: "#60a5fa",
	size: 96,
	duration: 620,
	stroke: 4,
	opacity: 96,
	glow: 32,
	fillOpacity: 0,
	ringOpacity: 100,
	centerOpacity: 88,
	spread: 135,
	softness: 0,
	showKeystrokes: true,
	keystrokeDuration: 1100,
	showLabel: true,
	labelText: "Click",
};

function labelFor(button, settings, isDoubleClick) {
	if (isDoubleClick) return "Double Click";
	if (settings.labelText && settings.labelText.trim()) return settings.labelText.trim();
	if (button === "right") return "Right";
	if (button === "middle") return "Middle";
	return "Click";
}

function colorFor(button, settings) {
	if (settings.colorMode !== "separate") return settings.color;
	if (button === "right") return settings.rightColor || settings.color;
	if (button === "middle") return settings.middleColor || settings.color;
	return settings.leftColor || settings.color;
}

function renderPulse(event) {
	if (!enabled) return;

	const settings = event.settings || currentSettings;
	const color = colorFor(event.button, settings);

	let isDoubleClick = false;
	if (event.button === "left" && settings.doubleClickDetection) {
		const now = Date.now();
		const dx = event.x - lastLeftClick.x;
		const dy = event.y - lastLeftClick.y;
		const dist = Math.sqrt(dx * dx + dy * dy);
		if (now - lastLeftClick.time < 500 && dist < 10) {
			isDoubleClick = true;
		}
		lastLeftClick = { x: event.x, y: event.y, time: now };
	}

	const fillOpacity = Number(settings.fillOpacity ?? 0);
	const ringOpacity = Number(settings.ringOpacity ?? 100);
	const centerOpacity = Number(settings.centerOpacity ?? 88);
	const spread = Number(settings.spread ?? 135);
	const softness = Number(settings.softness ?? 0);
	const endScale = Math.max(1.05, spread / 100);
	const pulse = document.createElement("div");
	pulse.className = settings.followThrough ? "pulse follow" : "pulse";
	pulse.dataset.button = labelFor(event.button, settings, isDoubleClick);
	pulse.style.setProperty("--x", `${event.x}px`);
	pulse.style.setProperty("--y", `${event.y}px`);
	pulse.style.setProperty("--color", color);
	pulse.style.setProperty("--secondary-color", settings.secondaryColor);
	pulse.style.setProperty("--size", `${settings.size}px`);
	pulse.style.setProperty("--duration", `${settings.duration}ms`);
	pulse.style.setProperty("--stroke", `${settings.stroke}px`);
	pulse.style.setProperty("--opacity", String(settings.opacity / 100));
	pulse.style.setProperty("--glow", `${settings.glow}px`);
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
	pulse.addEventListener("animationend", () => pulse.remove(), { once: true });
	stage.appendChild(pulse);
}

function renderShortcut(event) {
	if (!enabled || !currentSettings.showKeystrokes || !event.keys) return;

	const ksSettings = event.settings || currentSettings;
	const shortcut = document.createElement("div");
	shortcut.className = `shortcut pos-${ksSettings.keystrokePosition || "bottom"}`;

	shortcut.style.setProperty("--keystroke-bg", ksSettings.keystrokeBg || "#141a17");
	shortcut.style.setProperty("--keystroke-color", ksSettings.keystrokeColor || "#f8fbf5");
	shortcut.style.setProperty("--keystroke-size", `${ksSettings.keystrokeSize || 14}px`);
	shortcut.style.setProperty("--keystroke-keycap-bg", ksSettings.keystrokeKeycapBg || "#f8fbf5");
	shortcut.style.setProperty(
		"--keystroke-keycap-color",
		ksSettings.keystrokeKeycapColor || "#141a17",
	);

	const parts = event.keys.split(/\s*\+\s*/).filter(Boolean);
	for (const [index, key] of parts.entries()) {
		if (index > 0) {
			const plus = document.createElement("span");
			plus.className = "shortcut-plus";
			plus.textContent = "+";
			shortcut.appendChild(plus);
		}

		const keycap = document.createElement("span");
		keycap.className = "keycap";
		keycap.textContent = key;
		shortcut.appendChild(keycap);
	}
	shortcut.style.setProperty(
		"--duration",
		`${event.duration || currentSettings.keystrokeDuration}ms`,
	);
	shortcut.addEventListener("animationend", () => shortcut.remove(), { once: true });
	stage.appendChild(shortcut);
}

window.clickTapLight.onState((state) => {
	enabled = state.enabled;
	currentSettings = state.settings;
});

let activeDrag = null;
let lastLeftClick = { x: 0, y: 0, time: 0 };
let activeScrollIndicator = null;
let scrollTimeout = null;

function handleDragStart(event) {
	if (!enabled || !event.settings || !event.settings.dragHighlight) return;

	if (activeDrag) {
		if (activeDrag.element) activeDrag.element.remove();
		if (activeDrag.svgLine) activeDrag.svgLine.remove();
		if (activeDrag.svgLineCore) activeDrag.svgLineCore.remove();
		activeDrag = null;
	}

	const settings = event.settings;
	const color =
		settings.dragColorMode === "custom"
			? settings.dragColor || "#f59e0b"
			: colorFor(event.button, settings);
	const dragWidth = Number(settings.dragWidth ?? 8);

	const halo = document.createElement("div");
	halo.className = "drag-halo";
	halo.style.setProperty("--color", color);
	halo.style.setProperty("--size", `${dragWidth * 4.5}px`);
	halo.style.setProperty("--x", `${event.x}px`);
	halo.style.setProperty("--y", `${event.y}px`);
	halo.style.setProperty("--opacity", String((settings.opacity / 100) * 0.55));
	stage.appendChild(halo);

	let svg = document.getElementById("drag-svg");
	if (!svg) {
		svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.id = "drag-svg";
		svg.style.position = "fixed";
		svg.style.inset = "0";
		svg.style.width = "100%";
		svg.style.height = "100%";
		svg.style.pointerEvents = "none";
		svg.style.zIndex = "999998";
		stage.appendChild(svg);
	}

	const d = `M ${event.x} ${event.y}`;

	// Outer line (neon backdrop glow)
	const svgLine = document.createElementNS("http://www.w3.org/2000/svg", "path");
	svgLine.setAttribute("fill", "none");
	svgLine.setAttribute("stroke", color);
	svgLine.setAttribute("stroke-width", String(dragWidth));
	svgLine.setAttribute("stroke-linecap", "round");
	svgLine.setAttribute("stroke-linejoin", "round");
	svgLine.setAttribute("opacity", String((settings.opacity / 100) * 0.5));

	if (settings.dragHighlightStyle === "laser") {
		svgLine.style.filter = `drop-shadow(0 0 ${dragWidth * 0.6}px ${color})`;
		svgLine.setAttribute("stroke-width", String(dragWidth * 1.4));
	}

	svgLine.setAttribute("d", d);
	svg.appendChild(svgLine);

	// Inner line (bright core path)
	let svgLineCore = null;
	if (settings.dragHighlightStyle === "laser") {
		svgLineCore = document.createElementNS("http://www.w3.org/2000/svg", "path");
		svgLineCore.setAttribute("fill", "none");
		svgLineCore.setAttribute("stroke", "#ffffff");
		svgLineCore.setAttribute("stroke-width", String(Math.max(1.5, dragWidth * 0.3)));
		svgLineCore.setAttribute("stroke-linecap", "round");
		svgLineCore.setAttribute("stroke-linejoin", "round");
		svgLineCore.setAttribute("opacity", String((settings.opacity / 100) * 0.95));
		svgLineCore.setAttribute("d", d);
		svg.appendChild(svgLineCore);
	}

	activeDrag = {
		element: halo,
		svgLine: svgLine,
		svgLineCore: svgLineCore,
		startX: event.x,
		startY: event.y,
		pathData: d,
	};
}

function handleDragMove(event) {
	if (!activeDrag) return;

	activeDrag.element.style.setProperty("--x", `${event.x}px`);
	activeDrag.element.style.setProperty("--y", `${event.y}px`);

	activeDrag.pathData += ` L ${event.x} ${event.y}`;
	activeDrag.svgLine.setAttribute("d", activeDrag.pathData);
	if (activeDrag.svgLineCore) {
		activeDrag.svgLineCore.setAttribute("d", activeDrag.pathData);
	}
}

function handleDragEnd() {
	if (!activeDrag) return;

	const halo = activeDrag.element;
	const line = activeDrag.svgLine;
	const lineCore = activeDrag.svgLineCore;
	activeDrag = null;

	halo.style.transition = "opacity 300ms ease, transform 300ms ease";
	halo.style.opacity = "0";
	halo.style.transform = "translate(-50%, -50%) scale(0.5)";
	setTimeout(() => halo.remove(), 300);

	if (line) {
		line.style.transition = "opacity 400ms ease";
		line.setAttribute("opacity", "0");
		setTimeout(() => line.remove(), 400);
	}
	if (lineCore) {
		lineCore.style.transition = "opacity 350ms ease";
		lineCore.setAttribute("opacity", "0");
		setTimeout(() => lineCore.remove(), 350);
	}
}

function handleScroll(event) {
	if (!enabled || !currentSettings.scrollIndicator) return;

	if (activeScrollIndicator) {
		activeScrollIndicator.remove();
		clearTimeout(scrollTimeout);
	}

	const indicator = document.createElement("div");
	indicator.className = `scroll-indicator ${event.direction}`;
	indicator.style.left = `${event.x}px`;
	indicator.style.top = `${event.y}px`;

	indicator.innerHTML = `
		<svg class="scroll-svg" viewBox="0 0 24 24" width="16" height="16">
			<rect x="6" y="2" width="12" height="20" rx="6" fill="none" stroke="currentColor" stroke-width="2"/>
			<line x1="12" y1="6" x2="12" y2="10" stroke="currentColor" stroke-width="2"/>
		</svg>
		<span class="scroll-arrow">${event.direction === "up" ? "↑" : "↓"}</span>
	`;

	stage.appendChild(indicator);
	activeScrollIndicator = indicator;

	scrollTimeout = setTimeout(() => {
		indicator.remove();
		if (activeScrollIndicator === indicator) {
			activeScrollIndicator = null;
		}
	}, 600);
}

window.clickTapLight.onClick(renderPulse);
window.clickTapLight.onShortcut(renderShortcut);
window.clickTapLight.onDragStart(handleDragStart);
window.clickTapLight.onDragMove(handleDragMove);
window.clickTapLight.onDragEnd(handleDragEnd);
window.clickTapLight.onScroll(handleScroll);
