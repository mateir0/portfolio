"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import { isFinePointer, prefersReducedMotion } from "@/lib/motion";

/**
 * Custom cursor (fine pointers only): a small amber dot with a trailing ring
 * that springs to the pointer and scales up over interactive/reveal elements
 * flagged with [data-cursor]. Nothing renders on touch devices or under
 * reduced motion (native cursor remains).
 */

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFinePointer() || prefersReducedMotion()) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.style.cursor = "none";
    // Keep native cursor hidden for the whole document.
    const style = document.createElement("style");
    style.textContent =
      "*{cursor:none!important} a,button,[data-cursor],input,textarea,select,label,summary,iframe{cursor:none!important}";
    document.head.appendChild(style);

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, force3D: true });
    const dotX = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const dotY = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const ringX = gsap.quickTo(ring, "x", { duration: 0.42, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.42, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    let hover = false;
    const over = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest?.("[data-cursor]");
      const next = Boolean(t);
      if (next !== hover) {
        hover = next;
        gsap.to(ring, {
          scale: hover ? 1.7 : 1,
          duration: 0.35,
          ease: "power3.out",
        });
        gsap.to(dot, { scale: hover ? 0.5 : 1, duration: 0.35 });
      }
    };

    const leave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    };
    const enter = () => {
      gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
    };

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    document.documentElement.addEventListener("pointerenter", enter);

    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.removeEventListener("pointerenter", enter);
      document.head.removeChild(style);
      document.documentElement.style.cursor = "";
    };
  }, []);

  return (
    <div aria-hidden="true" className="cursor-only pointer-events-none fixed inset-0 z-[120]">
      <div
        ref={ringRef}
        className="absolute h-10 w-10 rounded-full border border-amber-glow/70"
      />
      <div ref={dotRef} className="absolute h-1.5 w-1.5 rounded-full bg-amber-glow" />
    </div>
  );
}