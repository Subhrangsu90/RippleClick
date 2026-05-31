const stage = document.getElementById('stage');
let enabled = true;
let currentSettings = {
  color: '#88a97c',
  secondaryColor: '#f8fbf5',
  colorMode: 'same',
  leftColor: '#88a97c',
  rightColor: '#f87171',
  middleColor: '#60a5fa',
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
  labelText: 'Click'
};

function labelFor(button, settings) {
  if (settings.labelText && settings.labelText.trim()) return settings.labelText.trim();
  if (button === 'right') return 'Right';
  if (button === 'middle') return 'Middle';
  return 'Click';
}

function colorFor(button, settings) {
  if (settings.colorMode !== 'separate') return settings.color;
  if (button === 'right') return settings.rightColor || settings.color;
  if (button === 'middle') return settings.middleColor || settings.color;
  return settings.leftColor || settings.color;
}

function renderPulse(event) {
  if (!enabled) return;

  const settings = event.settings || currentSettings;
  const color = colorFor(event.button, settings);
  const fillOpacity = Number(settings.fillOpacity ?? 0);
  const ringOpacity = Number(settings.ringOpacity ?? 100);
  const centerOpacity = Number(settings.centerOpacity ?? 88);
  const spread = Number(settings.spread ?? 135);
  const softness = Number(settings.softness ?? 0);
  const endScale = Math.max(1.05, spread / 100);
  const pulse = document.createElement('div');
  pulse.className = settings.followThrough ? 'pulse follow' : 'pulse';
  pulse.dataset.button = labelFor(event.button, settings);
  pulse.style.setProperty('--x', `${event.x}px`);
  pulse.style.setProperty('--y', `${event.y}px`);
  pulse.style.setProperty('--color', color);
  pulse.style.setProperty('--secondary-color', settings.secondaryColor);
  pulse.style.setProperty('--size', `${settings.size}px`);
  pulse.style.setProperty('--duration', `${settings.duration}ms`);
  pulse.style.setProperty('--stroke', `${settings.stroke}px`);
  pulse.style.setProperty('--opacity', String(settings.opacity / 100));
  pulse.style.setProperty('--glow', `${settings.glow}px`);
  pulse.style.setProperty('--fill-opacity', `${fillOpacity}%`);
  pulse.style.setProperty('--ring-opacity', `${ringOpacity}%`);
  pulse.style.setProperty('--center-opacity', `${centerOpacity}%`);
  pulse.style.setProperty('--inner-opacity', settings.doubleRing ? String(centerOpacity / 100) : '0');
  pulse.style.setProperty('--softness-blur', `${softness / 36}px`);
  pulse.style.setProperty('--end-scale', String(endScale));
  pulse.style.setProperty('--label-opacity', settings.showLabel ? '1' : '0');
  pulse.style.setProperty('--label-top', settings.labelPosition === 'top' ? 'auto' : 'calc(100% + 8px)');
  pulse.style.setProperty('--label-bottom', settings.labelPosition === 'top' ? 'calc(100% + 8px)' : 'auto');
  pulse.addEventListener('animationend', () => pulse.remove(), { once: true });
  stage.appendChild(pulse);
}

function renderShortcut(event) {
  if (!enabled || !currentSettings.showKeystrokes || !event.keys) return;

  const shortcut = document.createElement('div');
  shortcut.className = 'shortcut';
  const parts = event.keys.split(/\s*\+\s*/).filter(Boolean);
  for (const [index, key] of parts.entries()) {
    if (index > 0) {
      const plus = document.createElement('span');
      plus.className = 'shortcut-plus';
      plus.textContent = '+';
      shortcut.appendChild(plus);
    }

    const keycap = document.createElement('span');
    keycap.className = 'keycap';
    keycap.textContent = key;
    shortcut.appendChild(keycap);
  }
  shortcut.style.setProperty('--duration', `${event.duration || currentSettings.keystrokeDuration}ms`);
  shortcut.addEventListener('animationend', () => shortcut.remove(), { once: true });
  stage.appendChild(shortcut);
}

window.clickTapLight.onState((state) => {
  enabled = state.enabled;
  currentSettings = state.settings;
});

window.clickTapLight.onClick(renderPulse);
window.clickTapLight.onShortcut(renderShortcut);
