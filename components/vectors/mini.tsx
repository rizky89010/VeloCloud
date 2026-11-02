"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

// Small animated vector marks used inside illustrations in place of icons.

const ease = [0.25, 1, 0.5, 1] as const;

/** A pulsing status dot. */
export function StatusDot({ className, color = "bg-primary" }: { className?: string; color?: string }) {
  return (
    <span className={cn("relative flex size-2 shrink-0", className)}>
      <span className={cn("absolute inline-flex size-full animate-ping rounded-full opacity-60", color)} />
      <span className={cn("relative inline-flex size-2 rounded-full", color)} />
    </span>
  );
}

/** A tiny document whose text lines write themselves in, staggered by `index`. */
export function DocLines({ index = 0, className }: { index?: number; className?: string }) {
  const lines = [10, 7, 9];
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={cn("size-4", className)}>
      <rect x="2.5" y="1.5" width="11" height="13" rx="2.5" stroke="currentColor" strokeOpacity={0.35} />
      {lines.map((w, i) => (
        <motion.path
          key={i}
          d={`M5 ${5 + i * 3}h${w * 0.6}`}
          stroke="currentColor"
          strokeWidth={1.4}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.25 + i * 0.12, ease }}
        />
      ))}
    </svg>
  );
}

/** Abstract avatar: a softly breathing gradient orb (AI) or a solid ringed orb (human agent). */
export function Orb({ variant, className }: { variant: "ai" | "agent"; className?: string }) {
  return (
    <span className={cn("relative grid size-7 shrink-0 place-items-center", className)} aria-hidden>
      <motion.span
        className={cn(
          "absolute inset-0 rounded-full",
          variant === "ai" ? "bg-gradient-to-br from-coral-400 via-violet-500 to-electric-500" : "bg-indigo-600",
        )}
        animate={variant === "ai" ? { scale: [1, 1.08, 1], rotate: [0, 180, 360] } : { scale: [1, 1.04, 1] }}
        transition={{ duration: variant === "ai" ? 4 : 2.4, repeat: Infinity, ease: "easeInOut" }}
      />
      <span className={cn("relative rounded-full bg-white/90", variant === "ai" ? "size-2" : "size-2.5")} />
    </span>
  );
}

/** Accept-call button: a green disc with an expanding ring. */
export function AcceptPulse() {
  return (
    <span className="relative grid size-11 place-items-center" aria-hidden>
      <motion.span
        className="absolute inset-0 rounded-full border-2 border-emerald-400"
        animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
      />
      <span className="size-11 rounded-full bg-emerald-500" />
      <span className="absolute size-3 rounded-full bg-white" />
    </span>
  );
}

/** Decline-call button: a red disc with a short bar. */
export function DeclineMark() {
  return (
    <span className="grid size-11 place-items-center rounded-full bg-red-500" aria-hidden>
      <span className="h-1 w-4 rounded-full bg-white" />
    </span>
  );
}

/** Payment-card style chip whose contact lines draw in. */
export function CardChip({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 30" fill="none" aria-hidden className={cn("h-8 w-10", className)}>
      <rect x="1" y="1" width="38" height="28" rx="6" fill="white" fillOpacity={0.85} />
      {["M1 10h12M27 10h12", "M1 20h12M27 20h12", "M13 1v28M27 1v28", "M13 15h14"].map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="#8b5cf6"
          strokeOpacity={0.55}
          strokeWidth={1.2}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 + i * 0.12, ease }}
        />
      ))}
    </svg>
  );
}

/** Concentric sound rings around a gradient core: an incoming call, without a phone glyph. */
export function RingingWaves() {
  return (
    <div className="relative grid size-20 place-items-center" aria-hidden>
      {[0, 1, 2].map((ring) => (
        <motion.span
          key={ring}
          className="absolute inset-0 rounded-full border-2 border-violet-400/50"
          initial={{ scale: 0.6, opacity: 0.9 }}
          animate={{ scale: 1.9, opacity: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, delay: ring * 0.6, ease: "easeOut" }}
        />
      ))}
      <motion.span
        className="size-14 rounded-full bg-gradient-to-br from-electric-500 via-indigo-600 to-violet-500 shadow-xl shadow-indigo-500/30"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
