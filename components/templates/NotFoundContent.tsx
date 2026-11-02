"use client";

import { useLanguage } from "@/lib/i18n";
import { ShimmerButton } from "@/components/ui/primitives";

export function NotFoundContent() {
  const { t } = useLanguage();

  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center">
      <p className="text-gradient text-7xl font-extrabold tracking-tight">404</p>
      <h1 className="mt-4 text-3xl font-bold text-ink">{t.ui.notFoundTitle}</h1>
      <p className="mt-3 text-muted-foreground">{t.ui.notFoundBody}</p>
      <ShimmerButton href="/" size="lg" className="mt-8">
        {t.ui.backHome}
      </ShimmerButton>
    </section>
  );
}
