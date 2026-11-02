"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n";
import { useActive } from "./useActive";

type Vec = [number, number, number];

const DOTS = 1100;
const JAKARTA: [number, number] = [-6.2, 106.8];
// Abstract destination points (not real routes), spread around the sphere.
const DESTINATIONS: [number, number][] = [
  [35, 140],
  [1, 104],
  [25, 55],
  [51, 0],
  [-34, 151],
  [40, -74],
  [50, 9],
];

function fromLatLon(lat: number, lon: number): Vec {
  const phi = (lat * Math.PI) / 180;
  const lambda = (lon * Math.PI) / 180;
  return [Math.cos(phi) * Math.sin(lambda), Math.sin(phi), Math.cos(phi) * Math.cos(lambda)];
}

function rotateY([x, y, z]: Vec, angle: number): Vec {
  const c = Math.cos(angle);
  const s = Math.sin(angle);
  return [x * c + z * s, y, -x * s + z * c];
}

function slerp(a: Vec, b: Vec, t: number): Vec {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const omega = Math.acos(dot);
  if (omega < 1e-4) return a;
  const sa = Math.sin((1 - t) * omega) / Math.sin(omega);
  const sb = Math.sin(t * omega) / Math.sin(omega);
  return [a[0] * sa + b[0] * sb, a[1] * sa + b[1] * sb, a[2] * sa + b[2] * sb];
}

// Fibonacci sphere: evenly spaced dots.
const dots: Vec[] = Array.from({ length: DOTS }, (_, i) => {
  const y = 1 - (i / (DOTS - 1)) * 2;
  const r = Math.sqrt(1 - y * y);
  const theta = i * Math.PI * (3 - Math.sqrt(5));
  return [Math.cos(theta) * r, y, Math.sin(theta) * r];
});

export function NetworkGlobe({ zoom = 1 }: { zoom?: number }) {
  const { t } = useLanguage();
  const { ref, active } = useActive<HTMLDivElement>();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const origin = fromLatLon(...JAKARTA);
    const targets = DESTINATIONS.map((d) => fromLatLon(...d));

    const draw = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.floor(w * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const time = timeRef.current;
      // Keep Jakarta facing the viewer, with a gentle sway.
      const angle = -(JAKARTA[1] * Math.PI) / 180 + Math.sin(time * 0.25) * 0.5;
      const radius = Math.min(w, h) * 0.46 * zoom;
      const cx = w / 2;
      const cy = h / 2 + radius * 0.08;
      const project = (p: Vec, scale = 1): [number, number, number] => {
        const [x, y, z] = rotateY(p, angle);
        return [cx + x * radius * scale, cy - y * radius * scale, z];
      };

      for (const dot of dots) {
        const [x, y, z] = project(dot);
        if (z < -0.1) continue;
        ctx.fillStyle = `rgba(99, 102, 241, ${0.12 + z * 0.5})`;
        ctx.beginPath();
        ctx.arc(x, y, 1 + z * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      targets.forEach((target, i) => {
        const progress = (time * 0.35 + i / targets.length) % 1;
        const head = Math.min(1, progress * 1.6);
        const steps = 48;
        ctx.beginPath();
        let started = false;
        for (let s = 0; s <= steps * head; s++) {
          const f = s / steps;
          const [x, y, z] = project(slerp(origin, target, f), 1 + Math.sin(f * Math.PI) * 0.28);
          if (z < -0.2) {
            started = false;
            continue;
          }
          if (!started) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
          started = true;
        }
        const fade = progress > 0.75 ? 1 - (progress - 0.75) / 0.25 : 1;
        ctx.strokeStyle = `rgba(139, 92, 246, ${0.75 * fade})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        const [tx, ty, tz] = project(target);
        if (tz > 0 && head >= 1) {
          ctx.fillStyle = `rgba(236, 72, 153, ${fade})`;
          ctx.beginPath();
          ctx.arc(tx, ty, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      const [ox, oy] = project(origin);
      ctx.fillStyle = "rgba(37, 99, 235, 0.18)";
      ctx.beginPath();
      ctx.arc(ox, oy, 10 + Math.sin(time * 3) * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#2563eb";
      ctx.beginPath();
      ctx.arc(ox, oy, 4, 0, Math.PI * 2);
      ctx.fill();
    };

    draw();
    if (!active) return;

    let frame = 0;
    let last = performance.now();
    const loop = (now: number) => {
      timeRef.current += (now - last) / 1000;
      last = now;
      draw();
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [active, zoom]);

  return (
    <div ref={ref} className="relative size-full min-h-[260px]">
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 size-full" />
      <span className="absolute bottom-3 left-3 rounded-full border border-border bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-ink backdrop-blur-xl">
        <span className="mr-1.5 inline-block size-1.5 rounded-full bg-primary align-middle" />
        {t.services.network.origin}
      </span>
    </div>
  );
}
