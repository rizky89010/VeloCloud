"use client";

import { useEffect, useRef } from "react";

/** Global animation speed. Everything is time-based, so this scales every scene at once. */
export const SPEED = 0.5;

export type Pointer = { x: number; y: number; active: number };

export type Frame = {
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  /** Scene time in seconds (already scaled by SPEED). */
  t: number;
  /** Seconds since last frame (scaled by SPEED). */
  dt: number;
  /** Spring-smoothed pointer in canvas pixels; `active` eases 0→1 while hovering/touching. */
  pointer: Pointer;
  /** Short-lived 0..1 excitement, raised by `pulseScene()` (e.g. typing in a form). */
  energy: number;
  /** True on small/touch screens: scenes draw fewer elements. */
  lite: boolean;
  /** Per-scene scratch space that survives frames. */
  state: Record<string, unknown>;
};

/** Briefly excites any scene listening for pulses. */
export function pulseScene(amount = 0.3) {
  window.dispatchEvent(new CustomEvent("scene:pulse", { detail: amount }));
}

/**
 * Drives a 2D canvas scene: DPR-capped sizing, delta-time, spring-smoothed pointer (mouse + touch),
 * pause while offscreen or the tab is hidden, a 30fps cap on light devices, and a single still
 * frame under prefers-reduced-motion.
 */
export function useCanvasScene(draw: (frame: Frame) => void, deps: unknown[] = []) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawRef = useRef(draw);

  useEffect(() => {
    drawRef.current = draw;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    // Listen on the section behind the canvas so text on top doesn't block the pointer.
    const host = canvas.parentElement ?? canvas;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const lite = coarse || window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, lite ? 1 : 1.5);
    const minFrameMs = lite ? 1000 / 30 : 0;

    const state: Record<string, unknown> = {};
    const pointer: Pointer = { x: 0, y: 0, active: 0 };
    let target: { x: number; y: number } | null = null;
    let energy = 0;
    let time = 3; // start mid-motion so the first frame isn't a flat "t = 0" pose
    let last = 0;
    let frame = 0;
    let visible = false;

    const resize = () => {
      canvas.width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      canvas.height = Math.max(1, Math.floor(canvas.clientHeight * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!pointer.x && !pointer.y) {
        pointer.x = canvas.clientWidth * 0.6;
        pointer.y = canvas.clientHeight * 0.5;
      }
    };

    const render = (dt: number) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      // Not laid out yet: scenes divide by w/h, and a NaN pointer would never recover.
      if (!w || !h) return;
      // Critically-damped style easing: frame-rate independent and never overshoots.
      const follow = 1 - Math.exp(-dt * 6);
      const goal = target ?? { x: w * 0.6, y: h * 0.5 };
      pointer.x += (goal.x - pointer.x) * follow;
      pointer.y += (goal.y - pointer.y) * follow;
      pointer.active += ((target ? 1 : 0) - pointer.active) * (1 - Math.exp(-dt * 4));
      energy *= Math.exp(-dt * 2.5);
      ctx.clearRect(0, 0, w, h);
      drawRef.current({ ctx, w, h, t: time, dt, pointer, energy, lite, state });
    };

    const loop = (now: number) => {
      frame = requestAnimationFrame(loop);
      const elapsed = now - (last || now);
      if (elapsed < minFrameMs) return;
      last = now;
      const dt = Math.min(0.05, elapsed / 1000) * SPEED;
      time += dt;
      render(dt);
    };

    const start = () => {
      if (reducedMotion || frame) return;
      last = 0;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    resize();
    render(0);

    const resizeObserver = new ResizeObserver(() => {
      resize();
      render(0);
    });
    resizeObserver.observe(canvas);

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !document.hidden) start();
      else stop();
    });
    intersection.observe(canvas);

    const onVisibility = () => (document.hidden || !visible ? stop() : start());
    const onMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      target = { x: event.clientX - rect.left, y: event.clientY - rect.top };
    };
    const onLeave = () => (target = null);
    const onPulse = (event: Event) => {
      energy = Math.min(1, energy + ((event as CustomEvent<number>).detail ?? 0.3));
    };

    document.addEventListener("visibilitychange", onVisibility);
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerdown", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointercancel", onLeave);
    window.addEventListener("scene:pulse", onPulse);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerdown", onMove);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointercancel", onLeave);
      window.removeEventListener("scene:pulse", onPulse);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return canvasRef;
}
