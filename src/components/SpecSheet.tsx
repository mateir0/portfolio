"use client";

import { useEffect, useMemo, useState } from "react";

import { content } from "@/data/content";
import { prefersReducedMotion } from "@/lib/motion";

/**
 * Decoding spec sheet — mono rows whose values decode in with a
 * typewriter/emerge stagger on load (Voidfolio "spec sheet"). Fully visible
 * under reduced motion.
 */
export default function SpecSheet() {
  const rows = useMemo(() => content.specSheet, []);
  const valueLengths = useMemo(
    () => rows.map((r) => r.value.length),
    [rows]
  );

  const [shown, setShown] = useState<number[]>(() => valueLengths.map(() => 0));

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShown(valueLengths.map((l) => l));
      return;
    }

    let row = 0;
    let char = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      if (row >= rows.length) return;
      const full = valueLengths[row];
      if (char < full) {
        char += 1;
        setShown((prev) => {
          const next = [...prev];
          next[row] = Math.min(char, full);
          return next;
        });
        timer = setTimeout(tick, 26 + Math.random() * 18);
      } else {
        row += 1;
        char = 0;
        timer = setTimeout(tick, 120);
      }
    };

    timer = setTimeout(tick, 850);

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
    };
  }, [rows, valueLengths]);

  return (
    <dl className="flex flex-col gap-2.5 border-t border-ivory/12 pt-4 font-mono text-[0.7rem] sm:text-[0.75rem]">
      {rows.map((row, i) => {
        const n = shown[i] ?? 0;
        const shownValue = row.value.slice(0, n);
        const rest = row.value.slice(n);
        return (
          <div
            key={row.label}
            className="grid grid-cols-1 gap-x-6 gap-y-0.5 sm:grid-cols-[10rem_1fr] sm:items-baseline"
          >
            <dt className="uppercase tracking-[0.24em] text-muted/80">
              {row.label}
            </dt>
            <dd className="min-h-[1.1em] text-ivory">
              <span aria-label={row.value}>{shownValue}</span>
              {n < row.value.length ? (
                <span aria-hidden="true" className="text-amber-glow/80">
                  {rest}
                </span>
              ) : null}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}