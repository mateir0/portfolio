"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { content } from "@/data/content";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/** Odometer — big numerals that roll in on scroll (Voidfolio "Since" strip).
 *  Values come straight from content (static, not fetched). */
export default function Odometer() {
  const ref = useRef<HTMLDivElement>(null);
  const counters = useMemo(() => content.odometer, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const digits = el.querySelectorAll<HTMLElement>("[data-digit]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        digits,
        { yPercent: 110 },
        {
          yPercent: 0,
          stagger: 0.06,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative border-y border-ivory/10 px-5 py-20 sm:px-8 md:px-12 md:py-28 lg:px-16">
      <div ref={ref} className="mx-auto max-w-7xl">
        <span className="eyebrow">In numbers</span>
        <div className="mt-10 grid gap-y-14 sm:grid-cols-3 sm:gap-8">
          {counters.map((counter, i) => (
            <div key={counter.label} className="flex flex-col">
              <div className="flex overflow-hidden font-serif text-[clamp(4rem,10vw,8rem)] font-semibold leading-none tracking-tight text-ivory">
                {counter.value.split("").map((ch, j) =>
                  /\d/.test(ch) ? (
                    <span key={j} data-digit className="inline-block">
                      {ch}
                    </span>
                  ) : (
                    <span key={j} className="inline-block text-amber">
                      {ch}
                    </span>
                  )
                )}
              </div>
              <span className="mt-3 font-mono text-[0.65rem] uppercase tracking-[0.22em] text-muted">
                0{i + 1} — {counter.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}