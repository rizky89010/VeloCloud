"use client";

import { useLanguage } from "@/lib/i18n";

const operators = ["Etisalat", "Airtel", "NTT Communications", "BTS"];

export function OperatorStrip() {
  const { t } = useLanguage();
  // Repeat enough copies to fill wide screens; the track is duplicated so a -50% shift loops seamlessly.
  const track = [...operators, ...operators, ...operators];

  return (
    <section aria-label={t.metrics.operatorsTitle} className="relative border-y border-border bg-white">
      <div className="mx-auto flex max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <p className="hidden shrink-0 py-6 pr-6 text-xs font-semibold tracking-wide text-muted-foreground uppercase md:block md:border-r md:border-border">
          {t.metrics.operatorsTitle}
        </p>
        <div className="group relative flex-1 overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <ul className="flex w-max animate-marquee gap-16 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[...track, ...track].map((name, i) => (
              <li
                key={i}
                aria-hidden={i >= operators.length}
                className="text-xl font-bold tracking-tight whitespace-nowrap text-slate-500 transition-colors duration-200 hover:text-ink sm:text-2xl"
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
