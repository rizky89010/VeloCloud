"use client";

import { motion } from "motion/react";
import { CheckGlyph, MinusGlyph } from "@/components/vectors/ui";
import { useLanguage } from "@/lib/i18n";
import { cliRoutes, voicePlans } from "@/lib/content/solutions";
import { cn } from "@/lib/cn";
import { FrameLines, ShimmerButton } from "@/components/ui/primitives";

export function VoicePlans() {
  const { t, locale } = useLanguage();
  const v = voicePlans[locale];

  return (
    <section className="relative bg-background py-16 sm:py-24">
      <FrameLines />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-balance text-ink sm:text-4xl">{v.title}</h2>
          <p className="mt-4 text-lg text-pretty text-muted-foreground">{v.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {v.plans.map((plan, i) => {
            const popular = i === 0;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className={cn(
                  "relative flex flex-col rounded-3xl border bg-white p-6 transition-shadow duration-300 hover:shadow-xl",
                  popular ? "border-primary shadow-lg shadow-primary/10" : "border-border",
                )}
              >
                {popular && (
                  <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-primary to-indigo-600 px-3 py-1 text-xs font-bold text-white">
                    {v.popular}
                  </span>
                )}
                <h3 className="text-2xl font-extrabold text-ink">{plan.name}</h3>
                <p className="mt-2 text-sm font-medium text-muted-foreground">{plan.desc}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-ink">
                      <CheckGlyph animate={false} className="mt-0.5 size-4 text-emerald-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <ShimmerButton href="/contact" variant={popular ? "primary" : "outline"} className="mt-8 w-full">
                  {t.ui.contactUs}
                </ShimmerButton>
              </motion.div>
            );
          })}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="flex flex-col rounded-3xl bg-navy-950 p-6 text-white"
          >
            <h3 className="text-2xl font-extrabold">{v.custom.name}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-300">{v.custom.desc}</p>
            <ShimmerButton href="/contact" className="mt-8 w-full">
              {t.ui.contactUs}
            </ShimmerButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 overflow-hidden rounded-3xl border border-border bg-white"
        >
          <div className="border-b border-border p-6 sm:p-8">
            <h3 className="text-xl font-bold text-ink">{v.cliTitle}</h3>
            <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{v.cliNote}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold text-muted-foreground">
                <tr>
                  {v.cliHead.map((head, i) => (
                    <th key={head} scope="col" className={cn("px-6 py-3", i > 1 && "text-center")}>
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {cliRoutes.map(([country, location, direct, certified]) => (
                  <tr key={country}>
                    <td className="px-6 py-3 font-semibold text-ink">{country}</td>
                    <td className="px-6 py-3 text-muted-foreground">{location}</td>
                    {[direct, certified].map((yes, i) => (
                      <td key={i} className="px-6 py-3 text-center">
                        {yes ? (
                          <><CheckGlyph animate={false} className="mx-auto size-4 text-emerald-600" /><span className="sr-only">Yes</span></>
                        ) : (
                          <><MinusGlyph className="mx-auto size-4 text-slate-300" /><span className="sr-only">No</span></>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
