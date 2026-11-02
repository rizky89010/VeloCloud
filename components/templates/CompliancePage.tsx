"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/lib/i18n";
import { FrameLines, ShimmerButton, HoverArrow } from "@/components/ui/primitives";
import { SlaDashboard } from "@/components/illustrations/SlaDashboard";
import { RetentionVault } from "@/components/illustrations/RetentionVault";
import { PageHero } from "./PageHero";

export function CompliancePage() {
  const { t } = useLanguage();
  const s = t.services;
  const blocks = [
    { title: s.komdigi.title, desc: s.komdigi.desc, visual: <SlaDashboard /> },
    { title: s.audit.title, desc: s.audit.desc, visual: <RetentionVault /> },
  ];

  return (
    <>
      <PageHero
        eyebrow={t.ui.complianceTag}
        title={t.ui.complianceTitle}
        subtitle={t.ui.complianceSubtitle}
        scene="clock"
        tint={0.25}
      >
        <ShimmerButton href="/contact" size="lg">
          {t.nav.cta}
          <HoverArrow />
        </ShimmerButton>
      </PageHero>

      <section className="relative bg-background py-16 sm:py-24">
        <FrameLines />
        <div className="relative mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
          {blocks.map(({ title, desc, visual }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid items-center gap-10 lg:grid-cols-2"
            >
              <div className={i % 2 ? "lg:order-2" : undefined}>
                <h2 className=" text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl">{title}</h2>
                <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{desc}</p>
              </div>
              <div className="rounded-3xl border border-border bg-gradient-to-br from-blue-50 via-white to-violet-50 p-5 sm:p-6">
                {visual}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </>
  );
}
