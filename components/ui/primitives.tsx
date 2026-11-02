"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";

export function PulseDot({ className }: { className?: string }) {
  return (
    <span className={cn("relative flex size-2", className)}>
      <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
      <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
    </span>
  );
}

type ShimmerButtonProps = {
  href: string;
  children: React.ReactNode;
  size?: "sm" | "lg";
  variant?: "primary" | "outline";
  className?: string;
};

export function ShimmerButton({ href, children, size = "sm", variant = "primary", className }: ShimmerButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full font-semibold whitespace-nowrap transition-[background-color,box-shadow,border-color,scale] duration-300 ease-snappy active:scale-[0.97] active:duration-150",
        variant === "primary"
          ? "bg-gradient-to-r from-primary to-indigo-600 text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/35"
          : "border border-border bg-white text-ink hover:border-slate-300 hover:bg-slate-50",
        size === "sm" ? "h-11 px-5 text-sm" : "h-12 px-7 text-base",
        className,
      )}
    >
      {variant === "primary" && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shimmer"
        />
      )}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </Link>
  );
}

/** Chevron that grows a tail on hover (needs a "group" parent). */
export function HoverArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden className={cn("size-2.5 overflow-visible", className)}>
      <path d="M0 5h7" className="opacity-0 transition-opacity duration-300 ease-snappy group-hover:opacity-100" />
      <path d="M1 1l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 ease-snappy group-hover:translate-x-[3px]" />
    </svg>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}
    >
      <p className="text-sm font-semibold text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl lg:text-5xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base text-pretty text-muted-foreground sm:text-lg">{subtitle}</p>}
    </motion.div>
  );
}

export function Logo({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2.5", className)} aria-label="VeloCloud home">
      <span className="grid size-9 place-items-center rounded-lg bg-gradient-to-br from-electric-500 to-indigo-600 text-xs font-extrabold text-white shadow-md shadow-primary/30">
        VC
      </span>
      <span className={cn("text-[15px] font-extrabold tracking-[0.18em]", tone === "dark" ? "text-ink" : "text-white")}>
        VELOCLOUD
      </span>
    </Link>
  );
}

/** Thin vertical guide lines framing the content column, Stripe-style. */
export function FrameLines() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 mx-auto max-w-7xl">
      <div className="absolute inset-y-0 left-4 w-px bg-border/70 sm:left-6 lg:left-8" />
      <div className="absolute inset-y-0 right-4 w-px bg-border/70 sm:right-6 lg:right-8" />
    </div>
  );
}
