"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

export function CountUp({ to, decimals = 0, duration = 1.6 }: { to: number; decimals?: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const controls = animate(0, to, { duration, ease: "easeOut", onUpdate: setValue });
    return () => controls.stop();
  }, [inView, reducedMotion, to, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {(reducedMotion ? to : value).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
    </span>
  );
}
