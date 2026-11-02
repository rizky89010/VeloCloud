"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

// Hand-drawn line glyphs for UI controls (1.5px strokes, round caps). Decorative: callers own the labels.

type GlyphProps = { className?: string };

function Svg({ className, children }: GlyphProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={cn("size-5 shrink-0", className)}
    >
      {children}
    </svg>
  );
}

/** Tick that draws itself in when it mounts. */
export function CheckGlyph({ className, animate = true }: GlyphProps & { animate?: boolean }) {
  return (
    <Svg className={className}>
      <motion.path
        d="M5 12.5l4.5 4.5L19 7.5"
        initial={animate ? { pathLength: 0 } : false}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
      />
    </Svg>
  );
}

export function CrossGlyph({ className }: GlyphProps) {
  return (
    <Svg className={className}>
      <motion.path
        d="M7 7l10 10M17 7L7 17"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      />
    </Svg>
  );
}

export function MinusGlyph({ className }: GlyphProps) {
  return (
    <Svg className={className}>
      <path d="M7 12h10" />
    </Svg>
  );
}

export function ChevronDownGlyph({ className }: GlyphProps) {
  return (
    <Svg className={className}>
      <path d="M7 10l5 5 5-5" />
    </Svg>
  );
}

export function ChevronLeftGlyph({ className }: GlyphProps) {
  return (
    <Svg className={className}>
      <path d="M14 7l-5 5 5 5" />
    </Svg>
  );
}

export function ExpandGlyph({ className }: GlyphProps) {
  return (
    <Svg className={className}>
      <path d="M14 5h5v5M10 19H5v-5M19 5l-5.5 5.5M5 19l5.5-5.5" />
    </Svg>
  );
}

export function SpinnerGlyph({ className }: GlyphProps) {
  return (
    <Svg className={cn("animate-spin", className)}>
      <path d="M12 4a8 8 0 1 1-8 8" />
    </Svg>
  );
}

/** Three lines that morph into a cross when open. */
export function MenuGlyph({ open, className }: GlyphProps & { open: boolean }) {
  const ease = [0.25, 1, 0.5, 1] as const;
  return (
    <Svg className={className}>
      {/* Same command structure (M x y L x y) in both states so the path can interpolate. */}
      <motion.path initial={false} animate={{ d: open ? "M6 6 L18 18" : "M5 7 L19 7" }} transition={{ duration: 0.3, ease }} />
      <motion.path d="M5 12 L19 12" animate={{ opacity: open ? 0 : 1 }} transition={{ duration: 0.15 }} />
      <motion.path initial={false} animate={{ d: open ? "M6 18 L18 6" : "M5 17 L19 17" }} transition={{ duration: 0.3, ease }} />
    </Svg>
  );
}
