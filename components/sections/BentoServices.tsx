"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ExpandGlyph } from "@/components/vectors/ui";
import { useLanguage } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { FrameLines, SectionHeading } from "@/components/ui/primitives";
import { ParticleField } from "@/components/visuals/ParticleField";
import { SlaDashboard } from "@/components/illustrations/SlaDashboard";
import { RetentionVault } from "@/components/illustrations/RetentionVault";
import { VoicePhone } from "@/components/illustrations/VoicePhone";
import { SmsPhone } from "@/components/illustrations/SmsPhone";
import { NetworkGlobe } from "@/components/illustrations/NetworkGlobe";
import { OmnichannelChat } from "@/components/illustrations/OmnichannelChat";
import { SecurityCard } from "@/components/illustrations/SecurityCard";

// Soft colour light pooling from the bottom of each card, behind the illustration.
const washes = {
  blue: "bg-[radial-gradient(110%_70%_at_100%_100%,rgba(43,140,255,0.20),transparent_65%),radial-gradient(70%_60%_at_0%_100%,rgba(99,102,241,0.14),transparent_60%)]",
  emerald:
    "bg-[radial-gradient(110%_70%_at_100%_100%,rgba(139,92,246,0.18),transparent_65%),radial-gradient(70%_60%_at_0%_100%,rgba(43,140,255,0.14),transparent_60%)]",
  coral:
    "bg-[radial-gradient(110%_70%_at_50%_110%,rgba(236,72,153,0.16),transparent_65%),radial-gradient(70%_60%_at_0%_100%,rgba(99,102,241,0.12),transparent_60%)]",
  indigo:
    "bg-[radial-gradient(110%_70%_at_100%_100%,rgba(99,102,241,0.22),transparent_65%),radial-gradient(70%_60%_at_0%_100%,rgba(236,72,153,0.10),transparent_60%)]",
};

function BentoCard({
  title,
  desc,
  wash,
  href,
  particles,
  artClassName,
  className,
  delay = 0,
  children,
}: {
  title: string;
  desc: string;
  wash: keyof typeof washes;
  href?: string;
  particles?: boolean;
  /** Where the illustration sits inside the card; it is allowed to bleed past the edges. */
  artClassName: string;
  className?: string;
  delay?: number;
  children: React.ReactNode;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6 }}
      className={cn("group relative h-[460px] rounded-3xl p-px md:h-[480px] lg:h-[520px]", className)}
    >
      <div className="absolute inset-0 rounded-3xl bg-border" />
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-electric-400 via-indigo-400 to-violet-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative h-full overflow-hidden rounded-[calc(1.5rem-1px)] bg-white transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-primary/10">
        <div aria-hidden className={cn("absolute inset-0", washes[wash])} />
        {particles && <ParticleField className="absolute inset-x-0 top-1/4 bottom-0 opacity-80" />}

        <div className={cn("absolute", artClassName)}>{children}</div>

        <div className="relative z-10 p-7 pr-20 sm:p-8 sm:pr-24">
          <h3 className="text-[1.6rem] leading-[1.15] font-semibold tracking-tight text-balance text-ink sm:text-[1.75rem]">{title}</h3>
          <p className="mt-2 line-clamp-2 max-w-md text-sm leading-relaxed text-muted-foreground">{desc}</p>
        </div>

        {href && (
          <>
            <span
              aria-hidden
              className="absolute top-6 right-6 z-10 grid size-10 place-items-center rounded-xl border border-border bg-white/80 text-primary backdrop-blur-xl transition-[background-color,color,border-color] duration-300 ease-snappy group-hover:border-primary group-hover:bg-primary group-hover:text-white"
            >
              <ExpandGlyph className="size-4" />
            </span>
            <Link href={href} aria-label={title} className="absolute inset-0 z-20 rounded-[calc(1.5rem-1px)]" />
          </>
        )}
      </div>
    </motion.article>
  );
}

export function BentoServices() {
  const { t } = useLanguage();
  const s = t.services;

  return (
    <section id="solutions" className="relative scroll-mt-28 bg-background py-20 sm:py-28">
      <FrameLines />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />

        <div className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          <BentoCard
            title={s.komdigi.title}
            desc={s.komdigi.desc}
            wash="emerald"
            href="/komdigi-compliance"
            artClassName="inset-x-6 top-44 bottom-6 sm:inset-x-8 sm:top-40"
            className="md:col-span-2"
          >
            <SlaDashboard />
          </BentoCard>
          <BentoCard
            title={s.audit.title}
            desc={s.audit.desc}
            wash="indigo"
            href="/komdigi-compliance"
            artClassName="inset-x-6 top-44 -bottom-4"
            delay={0.08}
          >
            <RetentionVault />
          </BentoCard>

          <BentoCard
            title={s.voice.title}
            desc={s.voice.desc}
            wash="coral"
            href="/voice"
            artClassName="inset-x-0 top-48 flex justify-center"
          >
            <VoicePhone />
          </BentoCard>
          <BentoCard
            title={s.messaging.title}
            desc={s.messaging.desc}
            wash="emerald"
            href="/a2p-messaging"
            artClassName="inset-x-0 top-48 flex justify-center"
            delay={0.08}
          >
            <SmsPhone />
          </BentoCard>
          <BentoCard
            title={s.network.title}
            desc={s.network.desc}
            wash="blue"
            href="/dids"
            artClassName="-right-16 -bottom-24 left-0 top-36"
            delay={0.16}
          >
            <NetworkGlobe zoom={1.25} />
          </BentoCard>

          <BentoCard
            title={s.bpo.title}
            desc={s.bpo.desc}
            wash="blue"
            href="/managed-services"
            particles
            artClassName="inset-x-6 top-44 -bottom-6 sm:inset-x-8 sm:top-40"
            className="md:col-span-2"
          >
            <OmnichannelChat />
          </BentoCard>
          <BentoCard
            title={s.security.title}
            desc={s.security.desc}
            wash="indigo"
            particles
            artClassName="inset-x-6 top-40 bottom-0"
            className="md:col-span-2 lg:col-span-1"
            delay={0.08}
          >
            <SecurityCard />
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
