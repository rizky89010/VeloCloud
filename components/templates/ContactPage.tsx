"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/lib/i18n";
import { company } from "@/lib/company";
import { FrameLines } from "@/components/ui/primitives";
import { CheckGlyph } from "@/components/vectors/ui";
import { Scene } from "@/components/scenes/Scene";
import { ContactForm } from "@/components/contact/ContactForm";

export function ContactPage() {
  const { t } = useLanguage();
  const f = t.form;

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Opal blob behind the form; it swells as the visitor types */}
      <Scene kind="opal" />
      <FrameLines />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_minmax(0,30rem)] lg:items-center lg:gap-16 lg:px-8 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-xl"
        >
          <p className="text-sm font-semibold text-primary">{t.contact.eyebrow}</p>
          <h1 className="mt-4 text-4xl leading-[1.05] font-extrabold tracking-tight text-balance text-ink sm:text-5xl lg:text-6xl">
            {f.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-pretty text-muted-foreground">{f.body}</p>
          <ul className="mt-8 space-y-3">
            {f.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-[15px] text-ink">
                <CheckGlyph animate={false} className="mt-0.5 size-4 text-primary" />
                {point}
              </li>
            ))}
          </ul>
          <ul className="mt-10 flex flex-wrap gap-2.5">
            {f.badges.map((badge) => (
              <li
                key={badge}
                className="rounded-full border border-border bg-white/80 px-4 py-2 text-sm font-semibold text-ink shadow-sm backdrop-blur-xl"
              >
                {badge}
              </li>
            ))}
          </ul>
          <p className="mt-8 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span>{t.wizard.officeLine}</span>
            <a href={`mailto:${company.email}`} className="font-medium text-ink hover:text-primary">
              {company.email}
            </a>
            <span>24/7</span>
          </p>
        </motion.div>

        <ContactForm />
      </div>
    </section>
  );
}
