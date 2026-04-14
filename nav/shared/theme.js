import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/Chicago");

const ZONE = dayjs.tz.guess() || "America/Chicago";
const ROOT = document.documentElement;

// [name, durationHours, centerHour, hueBiasDegrees]
// Durations: 1+5+2+4+1+4+7 = 24 (matches requested 4/21/8/17/4/17/29 %).
// Centers are in wall-clock local-time hours.
const PHASES = [
  { name: "dawn",      center: 6.0,  bias: +10 },
  { name: "morning",   center: 9.0,  bias:  +2 },
  { name: "noon",      center: 12.5, bias:  -8 },
  { name: "afternoon", center: 15.5, bias:  -4 },
  { name: "sunset",    center: 18.0, bias: +14 },
  { name: "evening",   center: 20.5, bias:  +4 },
  { name: "night",     center: 26.0, bias:  -6 }, // 2:00 next day (26 mod 24)
];

const DEFAULT_HUE = 87.88;
let baseHue = readBase();

function readBase() {
  try {
    const v = parseFloat(getComputedStyle(ROOT).getPropertyValue('--theme-hue'));
    return Number.isFinite(v) ? v : DEFAULT_HUE;
  } catch {
    return DEFAULT_HUE;
  }
}

function injectStack() {
  if (document.querySelector(".time-bg")) return;
  const stack = document.createElement("div");
  stack.className = "time-bg";
  for (const p of PHASES) {
    const layer = document.createElement("div");
    layer.className = p.name;
    stack.appendChild(layer);
  }
  document.body.insertBefore(stack, document.body.firstChild);
}

// Find two adjacent phases bracketing `hour`, with 24h wraparound.
// Returns { prev, next, w } where w in [0,1] is fraction from prev to next.
function bracket(hour) {
  const n = PHASES.length;
  for (let i = 0; i < n; i++) {
    const a = PHASES[i];
    const b = PHASES[(i + 1) % n];
    // Unwrap next center if it crossed midnight.
    const cA = a.center;
    let cB = b.center;
    if (cB <= cA) cB += 24;
    let h = hour;
    if (h < cA) h += 24;
    if (h >= cA && h < cB) {
      return { prev: a, next: b, w: (h - cA) / (cB - cA) };
    }
  }
  // Fallback (shouldn't happen with a sane PHASES table).
  return { prev: PHASES[0], next: PHASES[1], w: 0 };
}

function tick() {
  const now = dayjs().tz(ZONE);
  const hour = now.hour() + now.minute() / 60 + now.second() / 3600;
  const { prev, next, w } = bracket(hour);

  for (const p of PHASES) ROOT.style.setProperty(`--bg-${p.name}-opacity`, "0");
  ROOT.style.setProperty(`--bg-${prev.name}-opacity`, String(1 - w));
  ROOT.style.setProperty(`--bg-${next.name}-opacity`, String(w));

  const bias = prev.bias * (1 - w) + next.bias * w;
  const hue = (baseHue + bias + 360) % 360;
  ROOT.style.setProperty("--theme-hue", String(hue));
}

function boot() {
  injectStack();
  tick();
  let intervalId = setInterval(tick, 60_000);
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      clearInterval(intervalId);
      intervalId = null;
    } else {
      tick();
      if (!intervalId) intervalId = setInterval(tick, 60_000);
    }
  });
  window.addEventListener("theme-hue-base-updated", function (e) {
    const v = parseFloat(e.detail);
    if (Number.isFinite(v)) {
      baseHue = v;
      tick();
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot, { once: true });
} else {
  boot();
}
