"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { CheckGlyph } from "@/components/vectors/ui";
import { useLanguage } from "@/lib/i18n";
import { useFooterCta } from "@/lib/cta-store";
import { getSolution, solutions, type Illustration } from "@/lib/content/solutions";
import { FrameLines, ShimmerButton, HoverArrow } from "@/components/ui/primitives";
import { PageHero } from "./PageHero";
import { VoicePhone } from "@/components/illustrations/VoicePhone";
import { SmsPhone } from "@/components/illustrations/SmsPhone";
import { FirewallFeed } from "@/components/illustrations/FirewallFeed";
import { NetworkGlobe } from "@/components/illustrations/NetworkGlobe";
import { OmnichannelChat } from "@/components/illustrations/OmnichannelChat";
import { SlaDashboard } from "@/components/illustrations/SlaDashboard";

const illustrations: Record<Illustration, () => React.ReactNode> = {
  voice: () => <VoicePhone />,
  sms: () => <SmsPhone />,
  firewall: () => <FirewallFeed />,
  globe: () => <NetworkGlobe />,
  omnichannel: () => <OmnichannelChat />,
  sla: () => <SlaDashboard />,
};

export function SolutionTemplate({ slug, children }: { slug: string; children?: React.ReactNode }) {
  const { t, locale } = useLanguage();
  const solution = getSolution(slug);
  const copy = solution.copy[locale];
  const others = solutions.filter((s) => s.slug !== slug);
  useFooterCta(copy.cta);

  return (
    <>
      <PageHero
        eyebrow={t.nav.solutions}
        title={solution.title}
        subtitle={copy.tagline}
        scene={solution.scene}
        tint={solution.tint}
      >
        <ShimmerButton href="/contact" size="lg">
          {t.nav.cta}
          <HoverArrow />
        </ShimmerButton>
      </PageHero>

      <section className="relative bg-background py-16 sm:py-24">
        <FrameLines />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg leading-relaxed text-pretty text-foreground sm:text-xl">{copy.intro}</p>
            {copy.list && (
              <div className="mt-8">
                <h2 className="text-sm font-semibold text-primary">{copy.listTitle}</h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {copy.list.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] font-medium text-ink">
                      <CheckGlyph animate={false} className="mt-0.5 size-4 text-emerald-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-3xl border border-border bg-gradient-to-br from-white via-white to-slate-50 p-6 sm:p-8"
          >
            {illustrations[solution.illustration]()}
          </motion.div>
        </div>
      </section>

      <section className="relative bg-white py-16 sm:py-24">
        <FrameLines />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-ink sm:text-4xl">{copy.highlightsTitle}</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {copy.highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl border border-border bg-white p-7 transition-shadow duration-300 ease-snappy hover:shadow-xl hover:shadow-primary/10"
              >
                <h3 className="text-xl leading-snug font-semibold tracking-tight text-ink">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {children}


      <section className="border-t border-border bg-background py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-semibold text-muted-foreground">{t.ui.allSolutions}</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={s.href}
                    className="group flex min-h-16 items-center gap-3 rounded-2xl border border-border bg-white px-4 py-3 transition-all duration-200 hover:border-primary/30 hover:shadow-md"
                  >
                    <span className="flex-1">
                      <span className="block font-semibold text-ink">{s.title}</span>
                      <span className="block text-xs text-muted-foreground">{s.copy[locale].menuDesc}</span>
                    </span>
                    <HoverArrow className="text-slate-400 group-hover:text-primary" />
                  </Link>
                </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
