"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/lib/i18n";
import { FrameLines, ShimmerButton, HoverArrow } from "@/components/ui/primitives";
import { CountUp } from "@/components/ui/CountUp";
import { Scene } from "@/components/scenes/Scene";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative overflow-hidden bg-white">
      {/* Dotted horizon + voice sphere; on phones the sphere sits above the headline */}
      <Scene kind="home" />
      <FrameLines />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:min-h-[680px] lg:px-8">
        <div className="relative max-w-2xl pt-[min(68vw,340px)] pb-24 lg:max-w-[52%] lg:pt-36 lg:pb-44">
          {/* Soft white scrim keeps the headline crisp over the moving dots */}
          <div aria-hidden className="absolute -inset-x-6 -inset-y-6 rounded-[3rem] bg-white/70 blur-2xl" />

          <div className="relative">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm font-semibold text-ink"
            >
              {t.hero.counterLabel}{" "}
              <span className="font-medium text-muted-foreground">
                <CountUp to={7.4} decimals={1} duration={2} /> {t.metrics.billion}+
              </span>
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 text-[2.75rem] leading-[1.05] font-extrabold tracking-tight text-balance text-ink sm:text-6xl lg:text-7xl"
            >
              {t.hero.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-6 text-xl leading-snug font-semibold text-pretty text-muted-foreground sm:text-2xl lg:text-[1.75rem]"
            >
              {t.hero.subtitleLead} <span className="text-gradient">{t.hero.subtitleHighlight}</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <ShimmerButton href="/contact" size="lg">
                {t.hero.cta}
                <HoverArrow />
              </ShimmerButton>
              <ShimmerButton href="#solutions" size="lg" variant="outline">
                {t.hero.secondary}
              </ShimmerButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
