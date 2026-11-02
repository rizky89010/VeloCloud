"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

const COLORS = ["43,140,255", "79,70,229", "139,92,246", "236,72,153"];

type Particle = { angle: number; radius: number; speed: number; size: number; color: string; phase: number };

/**
 * A soft cloud of drifting dots arranged in a loose ring, used behind card illustrations.
 * Pauses while offscreen and renders a single still frame under reduced motion.
 */
export function ParticleField({ className, count = 260 }: { className?: string; count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const particles: Particle[] = Array.from({ length: count }, (_, i) => ({
      angle: Math.random() * Math.PI * 2,
      radius: 0.55 + Math.random() * 0.45,
      speed: (0.02 + Math.random() * 0.05) * (i % 2 ? 1 : -1),
      size: 0.6 + Math.random() * 1.4,
      color: COLORS[i % COLORS.length],
      phase: Math.random() * Math.PI * 2,
    }));

    let frame = 0;
    let visible = false;
    let last = performance.now();

    const draw = (dt: number, time: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (canvas.width !== Math.floor(w * dpr)) {
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const rx = w * 0.48;
      const ry = h * 0.48;
      for (const p of particles) {
        p.angle += p.speed * dt;
        const wobble = 1 + Math.sin(time * 0.6 + p.phase) * 0.04;
        const x = cx + Math.cos(p.angle) * rx * p.radius * wobble;
        const y = cy + Math.sin(p.angle) * ry * p.radius * wobble;
        const alpha = 0.25 + 0.45 * (0.5 + 0.5 * Math.sin(time + p.phase));
        ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(dt, now / 1000);
      if (visible) frame = requestAnimationFrame(loop);
    };

    draw(0, 0);
    if (reducedMotion) return;

    const observer = new IntersectionObserver(([entry]) => {
      const next = entry.isIntersecting;
      if (next && !visible) {
        last = performance.now();
        frame = requestAnimationFrame(loop);
      }
      visible = next;
    });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [count]);

  return <canvas ref={canvasRef} aria-hidden className={cn("pointer-events-none size-full", className)} />;
}
