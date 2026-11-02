"use client";

import { motion } from "motion/react";
import { FrameLines } from "@/components/ui/primitives";
import { Scene, type SceneKind } from "@/components/scenes/Scene";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  scene = "dots",
  tint = 0,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  scene?: SceneKind;
  tint?: number;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-white">
      <Scene kind={scene} tint={tint} />
      <FrameLines />
      <div className="relative mx-auto max-w-7xl px-4 pt-16 pb-36 sm:px-6 sm:pt-20 lg:px-8 lg:pt-24 lg:pb-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative max-w-2xl md:max-w-[60%]"
        >
          {/* Soft scrim so headlines stay crisp over the moving dots */}
          <div aria-hidden className="absolute -inset-6 rounded-[3rem] bg-white/70 blur-2xl" />
          <div className="relative">
          <p className="text-sm font-semibold text-primary">{eyebrow}</p>
          <h1 className="mt-5 text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {subtitle && <p className="mt-5 text-lg text-pretty text-muted-foreground sm:text-xl">{subtitle}</p>}
          {children && <div className="mt-8 flex flex-col gap-3 sm:flex-row">{children}</div>}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
