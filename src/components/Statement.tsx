"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { content } from "@/data/content";
import { prefersReducedMotion } from "@/lib/motion";

gsap.registerPlugin(ScrollTrigger);

interface Token {
  t: string;
  accent: boolean;
  space: boolean;
}

/** Statement that develops word-by-word out of grain on scroll (Voidfolio
 *  "Practice"). Amber words stay amber. Static under reduced motion. */
export default function Statement() {
  const ref = useRef<HTMLDivElement>(null);

  const tokens = useMemo<Token[]>(() => {
    const out: Token[] = [];
    for (const seg of content.statement) {
      const parts = seg.text.split(/(\s+)/);
      for (const part of parts) {
        if (!part) continue;
        if (/^\s+$/.test(part)) {
          out.push({ t: part, accent: Boolean(seg.accent), space: true });
        } else {
          out.push({ t: part, accent: Boolean(seg.accent), space: false });
        }
      }
    }
    return out;
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 78%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="statement"
      className="relative px-5 py-28 sm:px-8 md:px-12 md:py-40 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <span className="eyebrow">Statement</span>
        <div
          ref={ref}
          className="mt-10 max-w-4xl font-serif text-[clamp(1.7rem,4.3vw,3.4rem)] font-medium leading-[1.18] tracking-tight text-ivory"
        >
          {tokens.map((tok, i) =>
            tok.space ? (
              <span key={i}>{tok.t}</span>
            ) : (
              <span
                key={i}
                data-word
                className={
                  tok.accent ? "font-medium italic text-amber" : "text-ivory"
                }
              >
                {tok.t}
              </span>
            )
          )}
        </div>
        <div className="hairline mt-14" />
      </div>
    </section>
  );
}