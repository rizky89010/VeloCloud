import type { Frame } from "./engine";

// Scene renderers. Each draws one frame; batching (one fill per row/depth band) keeps them light on phones.

type RGB = [number, number, number];
const TAU = Math.PI * 2;
// Deep Signal palette: electric blue → indigo → violet → soft pink.
const PALETTE: RGB[] = [
  [43, 140, 255],
  [79, 70, 229],
  [139, 92, 246],
  [236, 72, 153],
];

export function palette(t: number): RGB {
  const x = Math.max(0, Math.min(1, t)) * (PALETTE.length - 1);
  const i = Math.min(PALETTE.length - 2, Math.floor(x));
  const f = x - i;
  const a = PALETTE[i];
  const b = PALETTE[i + 1];
  return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, a[2] + (b[2] - a[2]) * f];
}

const rgba = ([r, g, b]: RGB, a: number) => `rgba(${r | 0},${g | 0},${b | 0},${a})`;
const talkOf = (t: number) => 0.45 + 0.4 * Math.sin(t * 1.3) * Math.sin(t * 3.7);

export type DotsOptions = {
  /** Horizon height as a fraction of the canvas. */
  horizon?: number;
  /** Shifts the palette range (0 = blue-led, 0.3 = violet-led). */
  tint?: number;
  dark?: boolean;
  /** Overall opacity multiplier (values above 1 make the field bolder). */
  strength?: number;
  /** Dot size multiplier. */
  weight?: number;
};

/** A · Dotted horizon: a sea of dots rolling toward the viewer; dots lift and brighten near the pointer. */
export function drawDots({ ctx, w, h, t, pointer, lite }: Frame, opts: DotsOptions = {}) {
  // Inner pages default a touch bolder than the original demo, which read too faint on white.
  const { horizon = 0.5, tint = 0, dark = false, strength = 1.25, weight = 1.25 } = opts;
  const rows = lite ? 13 : 22;
  const cols = lite ? 46 : 86;
  const hz = h * horizon;
  const radius = (lite ? 70 : 60) * (w > 900 ? 1 : 0.85);

  for (let r = 0; r < rows; r++) {
    const z = r / (rows - 1);
    const p = Math.pow(z, 1.6);
    const y0 = hz + p * (h - hz + 30);
    const color = palette(tint + 0.1 + z * 0.65);
    const baseAlpha = Math.min(1, ((dark ? 0.22 : 0.16) + p * (dark ? 0.55 : 0.6)) * strength);
    const size = (0.5 + p * 1.6) * weight;
    ctx.fillStyle = rgba(color, baseAlpha);
    ctx.beginPath();
    for (let c = 0; c < cols; c++) {
      const u = c / (cols - 1);
      const px = w * (0.5 + (u - 0.5) * (0.7 + p * 1.8));
      let py = y0 - Math.sin(u * 6 + t * 1.2 + r * 0.35) * (4 + p * 26) - Math.sin(u * 13 - t * 0.9 + r * 0.2) * (1 + p * 6);
      const d = Math.hypot(px - pointer.x, py - pointer.y);
      const lift = pointer.active * Math.exp((-d * d) / (2 * radius * radius));
      py -= lift * (10 + p * 18);
      const s = size + lift * 1.2;
      ctx.moveTo(px + s, py);
      ctx.arc(px, py, s, 0, TAU);
    }
    ctx.fill();
  }
}

export type SphereOptions = {
  cx: number;
  cy: number;
  radius: number;
  tint?: number;
  dark?: boolean;
  /** Point size/opacity multiplier and density boost for a bolder ball. */
  weight?: number;
  /** Cache key, so several spheres can share one canvas. */
  id?: string;
  /** Point count override (small spheres need fewer points). */
  points?: number;
  /** Rotation speed multiplier (negative spins the other way). */
  spin?: number;
  /** Forces the speaking intensity (0..1) instead of the default rhythm. */
  talk?: number;
  /** Overall opacity multiplier. */
  alpha?: number;
};

/** B · Voice sphere: a point-cloud ball that ripples with a speaking rhythm and turns toward the pointer. */
export function drawSphere(frame: Frame, opts: SphereOptions) {
  const { cx, cy, radius, tint = 0, dark = false, weight = 1.25, id = "sphere", spin = 1, alpha = 1 } = opts;
  const { ctx, w, h, t, pointer, energy, lite, state } = frame;
  const base = opts.points ?? 1300;
  const count = Math.round((lite ? base / 2 : base) * Math.min(1.4, weight));
  const key = `points:${id}`;
  let points = state[key] as [number, number, number][] | undefined;
  if (!points || points.length !== count) {
    points = [];
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = i * 2.39996;
      points.push([Math.cos(th) * r, y, Math.sin(th) * r]);
    }
    state[key] = points;
  }

  const talk = Math.min(1, (opts.talk ?? talkOf(t)) + energy * 0.6);
  const rotY = t * 0.25 * spin + (pointer.x / w - 0.5) * 1.2 * pointer.active;
  const rotX = (pointer.y / h - 0.5) * 0.8 * pointer.active;
  const cyR = Math.cos(rotY), syR = Math.sin(rotY), cxR = Math.cos(rotX), sxR = Math.sin(rotX);

  // Soft glow behind the ball.
  const glow = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 1.5);
  glow.addColorStop(0, rgba(palette(tint + 0.35), ((dark ? 0.25 : 0.12) + 0.12 * talk) * weight * alpha));
  glow.addColorStop(1, rgba(palette(tint + 0.35), 0));
  ctx.fillStyle = glow;
  ctx.fillRect(cx - radius * 1.6, cy - radius * 1.6, radius * 3.2, radius * 3.2);

  // Bucket points by depth so each band is a single fill.
  const bands = 6;
  const paths = Array.from({ length: bands }, () => new Path2D());
  for (const p of points) {
    let X = p[0] * cyR + p[2] * syR;
    let Z = -p[0] * syR + p[2] * cyR;
    const Y = p[1] * cxR - Z * sxR;
    Z = p[1] * sxR + Z * cxR;
    const ripple = Math.sin(Y * 7 - t * 3) * Math.cos(Math.atan2(Z, X) * 3 + t * 1.5);
    const scale = 1 + ripple * 0.12 * talk;
    X = cx + X * radius * scale;
    const py = cy + Y * radius * scale;
    const depth = (Z + 1) / 2;
    // Rounding can push depth just below 0, which would index past the bands.
    const band = Math.max(0, Math.min(bands - 1, Math.floor(depth * bands)));
    const s = (0.5 + depth * 1.3) * weight;
    paths[band].moveTo(X + s, py);
    paths[band].arc(X, py, s, 0, TAU);
  }
  for (let b = 0; b < bands; b++) {
    const depth = (b + 0.5) / bands;
    ctx.fillStyle = rgba(palette(tint + 0.1 + depth * 0.6), Math.min(1, (0.1 + depth * (dark ? 0.8 : 0.7)) * Math.sqrt(weight) * alpha));
    ctx.fill(paths[b]);
  }
}

export type CardOptions = { cx: number; cy: number; width: number; height: number };

/** C · Glowing voice card: brand-gradient card with a lit microphone and flowing sound waves. */
export function drawVoiceCard({ ctx, w, h, t, pointer, energy }: Frame, { cx, cy, width, height }: CardOptions) {
  const tx = (pointer.active * (pointer.x - cx)) / w * 10;
  const ty = (pointer.active * (pointer.y - cy)) / h * 10;
  const talk = Math.min(1, talkOf(t) + energy * 0.6);
  ctx.save();
  ctx.translate(cx + tx, cy + ty);

  ctx.shadowColor = "rgba(79,70,229,0.35)";
  ctx.shadowBlur = 40;
  ctx.shadowOffsetY = 20;
  const g = ctx.createLinearGradient(-width / 2, -height / 2, width / 2, height / 2);
  g.addColorStop(0, "#2b8cff");
  g.addColorStop(0.55, "#4f46e5");
  g.addColorStop(1, "#8b5cf6");
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.roundRect(-width / 2, -height / 2, width, height, 24);
  ctx.fill();
  ctx.shadowColor = "transparent";
  ctx.clip();

  for (let k = 0; k < 6; k++) {
    ctx.strokeStyle = `rgba(255,255,255,${k === 0 ? 0.95 : 0.28 - k * 0.03})`;
    ctx.lineWidth = k === 0 ? 2 : 1;
    ctx.beginPath();
    for (let s = 0; s <= 80; s++) {
      const u = s / 80;
      const px = -width / 2 + u * width;
      const env = Math.exp(-Math.pow((u - 0.5) * 3.2, 2));
      const py =
        -Math.sin(u * 22 - t * 4 + k * 0.6) * height * 0.16 * env * talk * (1 - k * 0.12) -
        Math.sin(u * 9 + t * 1.5 + k) * height * 0.03 * env;
      if (s) ctx.lineTo(px, py);
      else ctx.moveTo(px, py);
    }
    ctx.stroke();
  }

  const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, width * 0.35);
  glow.addColorStop(0, `rgba(255,255,255,${0.35 + 0.25 * talk})`);
  glow.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0, 0, width * 0.35, 0, TAU);
  ctx.fill();

  for (let r = 0; r < 3; r++) {
    ctx.strokeStyle = `rgba(255,255,255,${0.35 - r * 0.1})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(0, 0, 26 + r * 14 + Math.sin(t * 2 - r) * 2 * talk, 0, TAU);
    ctx.stroke();
  }
  // Microphone mark, drawn (not an icon font) so it stays crisp and themeable.
  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(0, 0, 21, 0, TAU);
  ctx.fill();
  ctx.fillStyle = "#4f46e5";
  ctx.beginPath();
  ctx.roundRect(-4.5, -10, 9, 15, 4.5);
  ctx.fill();
  ctx.strokeStyle = "#4f46e5";
  ctx.lineWidth = 1.8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.arc(0, 0, 8, 0.15 * Math.PI, 0.85 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, 8);
  ctx.lineTo(0, 11.5);
  ctx.stroke();
  ctx.restore();
}

export type OpalOptions = { cx: number; cy: number; radius: number; strength?: number };

/** D · Opal blob: soft gradient lobes drifting and merging; the pointer and `energy` gently pull it. */
export function drawOpal({ ctx, t, pointer, energy }: Frame, { cx, cy, radius, strength = 1 }: OpalOptions) {
  const x0 = cx + (pointer.x - cx) * 0.18 * pointer.active;
  const y0 = cy + (pointer.y - cy) * 0.18 * pointer.active;
  const swell = 1 + energy * 0.12;
  const lobes: [number, number][] = [
    [0, 0.05],
    [1.9, 0.4],
    [3.8, 0.75],
    [5.2, 0.25],
  ];
  ctx.globalCompositeOperation = "multiply";
  lobes.forEach(([phase, colorAt], i) => {
    const bx = x0 + Math.cos(t * 0.35 + phase) * radius * 0.35;
    const by = y0 + Math.sin(t * 0.28 + phase * 1.3) * radius * 0.3;
    const br = radius * (0.75 + 0.12 * Math.sin(t * 0.5 + i)) * swell;
    const g = ctx.createRadialGradient(bx, by, 0, bx, by, br);
    g.addColorStop(0, rgba(palette(colorAt), 0.55 * strength));
    g.addColorStop(1, rgba(palette(colorAt), 0));
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(bx, by, br, 0, TAU);
    ctx.fill();
  });
  ctx.globalCompositeOperation = "source-over";

  ctx.beginPath();
  for (let i = 0; i <= 120; i++) {
    const a = (i / 120) * TAU;
    const n = Math.sin(a * 2 + t * 0.6) * 0.06 + Math.sin(a * 3 - t * 0.45) * 0.05 + Math.sin(a * 5 + t * 2) * 0.03 * energy;
    const rr = radius * 0.62 * (1 + n) * swell;
    const px = x0 + Math.cos(a) * rr;
    const py = y0 + Math.sin(a) * rr;
    if (i) ctx.lineTo(px, py);
    else ctx.moveTo(px, py);
  }
  ctx.fillStyle = `rgba(255,255,255,${0.18 * strength})`;
  ctx.fill();
  ctx.strokeStyle = `rgba(255,255,255,${0.6 * strength})`;
  ctx.lineWidth = 1;
  ctx.stroke();
}

/** Soft spotlight that follows the pointer (used on the dark footer). */
export function drawSpotlight({ ctx, w, pointer }: Frame, color: RGB = [79, 70, 229]) {
  const r = Math.max(240, w * 0.3);
  const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, r);
  g.addColorStop(0, rgba(color, 0.12 + 0.2 * pointer.active));
  g.addColorStop(1, rgba(color, 0));
  ctx.fillStyle = g;
  ctx.fillRect(pointer.x - r, pointer.y - r, r * 2, r * 2);
}

/** Dot globe rising over the horizon (DIDs: numbers worldwide); turns with the pointer. */
export function drawGlobe(frame: Frame, { cx, horizon, radius }: { cx: number; horizon: number; radius: number }) {
  const { ctx, w, t, pointer, lite, state } = frame;
  const count = lite ? 420 : 820;
  let points = state.globe as [number, number, number][] | undefined;
  if (!points || points.length !== count) {
    points = [];
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = i * 2.39996;
      points.push([Math.cos(th) * r, y, Math.sin(th) * r]);
    }
    state.globe = points;
  }
  const rot = t * 0.2 + (pointer.x / w - 0.5) * 1.2 * pointer.active;
  const back = new Path2D();
  const front = new Path2D();
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, w, horizon);
  ctx.clip();
  for (const p of points) {
    const X = p[0] * Math.cos(rot) + p[2] * Math.sin(rot);
    const Z = -p[0] * Math.sin(rot) + p[2] * Math.cos(rot);
    if (Z < -0.05) continue;
    const px = cx + X * radius;
    const py = horizon + radius * 0.12 - p[1] * radius;
    const s = 0.7 + Z * 1.6;
    const path = Z > 0.5 ? front : back;
    path.moveTo(px + s, py);
    path.arc(px, py, s, 0, TAU);
  }
  ctx.fillStyle = rgba(palette(0.2), 0.55);
  ctx.fill(back);
  ctx.fillStyle = rgba(palette(0.5), 0.95);
  ctx.fill(front);
  ctx.restore();
}

/** Ring of dots that fills like a timer (Komdigi: IVR → agent within 30s). */
export function drawDotRing({ ctx, w, t, pointer }: Frame, { cx, cy, radius }: { cx: number; cy: number; radius: number }) {
  const x0 = cx + (pointer.x - cx) * 0.1 * pointer.active;
  const count = 60;
  const progress = (t * 0.12) % 1;
  const glow = ctx.createRadialGradient(x0, cy, 0, x0, cy, radius * 0.85);
  glow.addColorStop(0, rgba(palette(0.35), 0.18));
  glow.addColorStop(1, rgba(palette(0.35), 0));
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(x0, cy, radius * 0.85, 0, TAU);
  ctx.fill();
  for (let i = 0; i < count; i++) {
    const a = (i / count) * TAU - Math.PI / 2;
    const on = i / count < progress;
    const wobble = 1 + 0.03 * Math.sin(t * 2 + i * 0.5);
    ctx.fillStyle = on ? rgba(palette((i / count) * 0.8), 0.95) : "rgba(148,163,184,0.35)";
    ctx.beginPath();
    ctx.arc(x0 + Math.cos(a) * radius * wobble, cy + Math.sin(a) * radius * wobble, on ? 2.6 : 1.7, 0, TAU);
    ctx.fill();
  }
  void w;
}

/** Lines of dots drifting sideways like a current (Insights: a steady flow of news). */
export function drawStream({ ctx, w, h, t, pointer, lite }: Frame) {
  const lines = lite ? 11 : 16;
  const count = lite ? 40 : 64;
  for (let l = 0; l < lines; l++) {
    const v = l / (lines - 1);
    ctx.fillStyle = rgba(palette(0.1 + v * 0.6), 0.15 + 0.45 * Math.sin(v * Math.PI));
    ctx.beginPath();
    for (let i = 0; i < count; i++) {
      const u = (i / count + t * 0.05 * (1 + v * 0.5)) % 1;
      const px = u * w;
      const py = h * (0.32 + v * 0.55) + Math.sin(u * 5 + t * 0.8 + v * 3) * h * 0.06 * (1 - v * 0.4);
      const d = Math.hypot(px - pointer.x, py - pointer.y);
      const lift = pointer.active * Math.exp((-d * d) / (2 * 50 * 50)) * 14;
      const s = 0.6 + Math.sin(v * Math.PI);
      ctx.moveTo(px + s, py - lift);
      ctx.arc(px, py - lift, s, 0, TAU);
    }
    ctx.fill();
  }
}
