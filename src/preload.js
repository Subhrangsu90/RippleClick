const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("clickTapLight", {
	openExternal: (url) => ipcRenderer.send("open-external", url),
	getState: () => ipcRenderer.invoke("get-state"),
	setEnabled: (value) => ipcRenderer.send("set-enabled", value),
	setLaunchAtStartup: (value) => ipcRenderer.send("set-launch-at-startup", value),
	setSettings: (value) => ipcRenderer.send("set-settings", value),
	noteControlInteraction: () => ipcRenderer.send("control-interaction"),
	resetSettings: () => ipcRenderer.send("reset-settings"),
	testClick: () => ipcRenderer.send("test-click"),
	openSettings: () => ipcRenderer.send("open-settings"),
	closeSettings: () => ipcRenderer.send("close-settings"),
	minimizeControls: () => ipcRenderer.send("window-control", "minimize"),
	closeControls: () => ipcRenderer.send("window-control", "close"),
	onClick: (callback) => ipcRenderer.on("click", (_event, payload) => callback(payload)),
	onShortcut: (callback) => ipcRenderer.on("shortcut", (_event, payload) => callback(payload)),
	onState: (callback) => ipcRenderer.on("state", (_event, payload) => callback(payload)),
	onDragStart: (callback) => ipcRenderer.on("dragStart", (_event, payload) => callback(payload)),
	onDragMove: (callback) => ipcRenderer.on("dragMove", (_event, payload) => callback(payload)),
	onDragEnd: (callback) => ipcRenderer.on("dragEnd", (_event, payload) => callback(payload)),
	onScroll: (callback) => ipcRenderer.on("scroll", (_event, payload) => callback(payload)),
});
