"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * True while the element is on screen and the user allows motion.
 * Illustrations use it to run their loops only when someone can see them.
 */
export function useActive<T extends Element>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reducedMotion = useReducedMotion();
  return { ref, active: inView && !reducedMotion, reducedMotion: !!reducedMotion };
}

/** Steps 0..length-1 on an interval while active, then wraps. Returns the final step under reduced motion. */
export function useSequence(length: number, active: boolean, reducedMotion: boolean, intervalMs = 1400) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setStep((s) => (s + 1) % length), intervalMs);
    return () => clearInterval(id);
  }, [active, length, intervalMs]);

  return reducedMotion ? length - 1 : step;
}
