"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { content } from "@/data/content";
import { prefersReducedMotion } from "@/lib/motion";

/** Sticky mono index strip (Voidfolio "02 Index"): name · role · location ·
 *  status · stack. Fades back up once the user scrolls. */
export default function HeaderIndex() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: -120,
        opacity: 0,
        ease: "power2.inOut",
        scrollTrigger: { trigger: document.documentElement, start: "top 120", end: "max" },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const p = content.person;

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-0 z-50"
      aria-label="Index"
    >
      <div
        data-cursor
        className="flex items-center justify-between gap-4 border-b border-ivory/10 px-4 py-3 text-[0.6rem] uppercase tracking-[0.22em] text-muted backdrop-blur-[2px] sm:px-6 md:px-10"
      >
        <span className="font-mono">{p.name}</span>
        <span className="hidden font-mono sm:inline">{p.role}</span>
        <span className="hidden font-mono md:inline">{p.location}</span>
        <span className="flex items-center gap-2 font-mono">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-[#22c55e]"
            aria-hidden="true"
          />
          {content.availability.label}
        </span>
        <span className="hidden font-mono lg:inline">
          Next.js · TypeScript · Supabase
        </span>
      </div>
    </header>
  );
}