"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { content } from "@/data/content";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

/** Record log — mono timeline rows with a sweeping scanline (Voidfolio
 *  "Record"). Static under reduced motion. */
export default function RecordLog() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const rows = el.querySelectorAll<HTMLElement>("[data-row]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rows,
        { opacity: 0, x: -18 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 82%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  const group = (year: string, title: string, org: string) => (
    <div
      data-row
      className="grid grid-cols-[4.5rem_1fr] gap-4 py-3 font-mono text-[0.75rem] sm:grid-cols-[7rem_12rem_1fr] sm:gap-6 sm:text-[0.8rem]"
    >
      <span className="text-amber-glow">{year}</span>
      <span className="text-ivory">{title}</span>
      <span className="text-muted sm:col-auto">{org}</span>
    </div>
  );

  return (
    <section id="record" className="relative px-5 py-28 sm:px-8 md:px-12 md:py-40 lg:px-16">
      <div className="mx-auto max-w-7xl">
        <span className="eyebrow">Record</span>

        <div ref={ref} className="mt-10 relative max-w-4xl">
          {/* Sweeping scanline */}
          <div
            aria-hidden="true"
            className="scanline pointer-events-none absolute inset-x-0 top-0 h-px bg-amber-glow/50"
          />
          <div className="border-y border-ivory/12 pt-3">
            <div className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-ivory/10 pb-2 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-muted sm:grid-cols-[7rem_12rem_1fr] sm:gap-6">
              <span>Year</span>
              <span>Role</span>
              <span className="hidden sm:block">Org</span>
            </div>
            {content.recordLog.map((r) => group(r.year, r.title, r.org ?? ""))}

            <div className="py-3">
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-muted">
                Education
              </span>
            </div>
            {content.education.map((r) =>
              group(`${r.year}:`, r.title, `${r.org}`)
            )}
          </div>
        </div>
      </div>
    </section>
  );
}