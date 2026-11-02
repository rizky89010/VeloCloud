"use client";

import { useEffect, useSyncExternalStore } from "react";

// Lets a page set a custom footer CTA headline (the footer lives in the layout, outside the page tree).

let override: string | null = null;
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};
const emit = () => listeners.forEach((listener) => listener());

export function useCtaOverride() {
  return useSyncExternalStore(
    subscribe,
    () => override,
    () => null,
  );
}

/** Call from a page to replace the footer CTA headline while that page is mounted. */
export function useFooterCta(title: string | undefined) {
  useEffect(() => {
    if (!title) return;
    override = title;
    emit();
    return () => {
      override = null;
      emit();
    };
  }, [title]);
}
