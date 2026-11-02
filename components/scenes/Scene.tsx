"use client";

import { cn } from "@/lib/cn";
import { useCanvasScene, type Frame } from "./engine";
import { drawDotRing, drawDots, drawGlobe, drawOpal, drawSphere, drawSpotlight, drawStream, drawVoiceCard } from "./draw";

export type SceneKind =
  | "home"
  | "dots"
  | "sphere"
  | "card"
  | "opal"
  | "footer"
  | "login"
  | "a2p"
  | "network"
  | "shield"
  | "dialog"
  | "globe"
  | "clock"
  | "stream";

type SceneProps = {
  kind: SceneKind;
  /** Palette shift for page variety (0 = blue-led … 0.35 = violet-led). */
  tint?: number;
  className?: string;
};

/** Layout rules per scene: on narrow screens the focal object moves above the text. */
function render(kind: SceneKind, tint: number, frame: Frame) {
  const { w, h } = frame;
  const narrow = w < 900;

  switch (kind) {
    case "home": {
      // Home is the showcase: bolder dots and a denser ball than the inner pages.
      drawDots(frame, { horizon: narrow ? 0.62 : 0.56, tint, strength: 1.4, weight: 1.55 });
      const radius = narrow ? Math.min(w * 0.34, 160) : Math.min(h * 0.34, 240);
      drawSphere(frame, { cx: narrow ? w * 0.5 : w * 0.73, cy: narrow ? h * 0.2 : h * 0.42, radius, tint, weight: 1.45 });
      break;
    }
    case "dots":
      drawDots(frame, { horizon: 0.55, tint, strength: 0.9 });
      break;
    case "sphere": {
      drawDots(frame, { horizon: 0.66, tint, strength: 0.7 });
      const radius = narrow ? Math.min(w * 0.26, 120) : Math.min(h * 0.32, 190);
      drawSphere(frame, { cx: narrow ? w * 0.75 : w * 0.76, cy: narrow ? h * 0.22 : h * 0.45, radius, tint });
      break;
    }
    case "card": {
      drawDots(frame, { horizon: 0.7, tint, strength: 0.7 });
      if (narrow) break; // the card would crowd the headline on phones; dots alone read cleanly
      const width = Math.min(w * 0.26, 300);
      drawVoiceCard(frame, { cx: w * 0.78, cy: h * 0.48, width, height: width * 1.15 });
      break;
    }
    case "a2p":
      drawDots(frame, { horizon: 0.72, tint, strength: 0.6 });
      drawOpal(frame, { cx: narrow ? w * 0.6 : w * 0.74, cy: narrow ? h * 0.18 : h * 0.42, radius: narrow ? w * 0.4 : Math.min(w * 0.26, 320) });
      break;
    case "network": {
      // Enterprise SMS: three linked spheres, like routes between operators.
      drawDots(frame, { horizon: 0.72, tint, strength: 0.65 });
      const scale = narrow ? 0.6 : 1;
      const nodes: [number, number, number][] = narrow
        ? [[0.55, 0.16, 26], [0.78, 0.1, 34], [0.9, 0.24, 22]]
        : [[0.58, 0.55, 40], [0.76, 0.3, 54], [0.9, 0.62, 36]];
      const pts = nodes.map(([x, y, r], i) => [w * x + Math.sin(frame.t * 0.6 + i) * 5, h * y + Math.cos(frame.t * 0.5 + i) * 5, r * scale] as const);
      frame.ctx.strokeStyle = "rgba(79,70,229,0.3)";
      frame.ctx.lineWidth = 1;
      frame.ctx.setLineDash([2, 5]);
      frame.ctx.beginPath();
      pts.forEach(([x, y], i) => (i ? frame.ctx.lineTo(x, y) : frame.ctx.moveTo(x, y)));
      frame.ctx.stroke();
      frame.ctx.setLineDash([]);
      pts.forEach(([x, y, r], i) => drawSphere(frame, { cx: x, cy: y, radius: r, tint: tint + i * 0.12, id: `n${i}`, points: 360 }));
      break;
    }
    case "shield": {
      // SMS Firewall: a bright core inside a slower counter-rotating shell.
      drawDots(frame, { horizon: 0.74, tint, strength: 0.6 });
      const R = narrow ? Math.min(w * 0.26, 120) : Math.min(h * 0.34, 200);
      const cx = narrow ? w * 0.72 : w * 0.75;
      const cy = narrow ? h * 0.2 : h * 0.45;
      drawSphere(frame, { cx, cy, radius: R * 0.5, tint: tint + 0.05, id: "core", points: 420 });
      drawSphere(frame, { cx, cy, radius: R, tint: tint - 0.1, id: "shell", points: 900, spin: -0.6, talk: 0.12, alpha: 0.55 });
      frame.ctx.strokeStyle = `rgba(139,92,246,${0.22 + 0.1 * Math.sin(frame.t * 1.5)})`;
      frame.ctx.lineWidth = 1;
      frame.ctx.beginPath();
      frame.ctx.arc(cx, cy, R * 1.08, 0, Math.PI * 2);
      frame.ctx.stroke();
      break;
    }
    case "dialog": {
      // Two-way SMS: two spheres taking turns to speak.
      drawDots(frame, { horizon: 0.74, tint, strength: 0.6 });
      const turn = Math.sin(frame.t * 0.7);
      const a = Math.max(0, turn);
      const b = Math.max(0, -turn);
      const R = narrow ? 34 : 58;
      const A = narrow ? [w * 0.55, h * 0.16] : [w * 0.6, h * 0.45];
      const B = narrow ? [w * 0.85, h * 0.16] : [w * 0.86, h * 0.45];
      frame.ctx.strokeStyle = "rgba(79,70,229,0.25)";
      frame.ctx.setLineDash([2, 6]);
      frame.ctx.beginPath();
      frame.ctx.moveTo(A[0] + R * 1.2, A[1]);
      frame.ctx.lineTo(B[0] - R * 1.2, B[1]);
      frame.ctx.stroke();
      frame.ctx.setLineDash([]);
      drawSphere(frame, { cx: A[0], cy: A[1], radius: R * (1 + a * 0.08), tint, id: "a", points: 500, talk: 0.15 + a * 0.85 });
      drawSphere(frame, { cx: B[0], cy: B[1], radius: R * (1 + b * 0.08), tint: tint + 0.35, id: "b", points: 500, talk: 0.15 + b * 0.85 });
      break;
    }
    case "globe": {
      const horizon = h * (narrow ? 0.5 : 0.64);
      drawGlobe(frame, { cx: narrow ? w * 0.6 : w * 0.7, horizon, radius: narrow ? w * 0.42 : Math.min(h * 0.62, 360) });
      drawDots(frame, { horizon: horizon / h, tint, strength: 0.8 });
      break;
    }
    case "clock":
      drawDots(frame, { horizon: 0.76, tint, strength: 0.6 });
      drawDotRing(frame, { cx: narrow ? w * 0.75 : w * 0.76, cy: narrow ? h * 0.2 : h * 0.44, radius: narrow ? Math.min(w * 0.18, 80) : Math.min(h * 0.3, 170) });
      break;
    case "stream":
      drawStream(frame);
      break;
    case "opal":
      drawOpal(frame, { cx: narrow ? w * 0.5 : w * 0.78, cy: narrow ? h * 0.12 : h * 0.4, radius: narrow ? w * 0.45 : Math.min(w * 0.3, 380) });
      break;
    case "login":
      drawOpal(frame, { cx: w * 0.3, cy: h * 0.35, radius: Math.max(w, h) * 0.35, strength: 0.55 });
      drawOpal(frame, { cx: w * 0.75, cy: h * 0.7, radius: Math.max(w, h) * 0.28, strength: 0.4 });
      break;
    case "footer":
      drawSpotlight(frame);
      drawDots(frame, { horizon: 0.42, tint, dark: true, strength: 0.85 });
      break;
  }
}

export function Scene({ kind, tint = 0, className }: SceneProps) {
  const canvasRef = useCanvasScene((frame) => render(kind, tint, frame), [kind, tint]);
  return <canvas ref={canvasRef} aria-hidden className={cn("pointer-events-none absolute inset-0 size-full", className)} />;
}
