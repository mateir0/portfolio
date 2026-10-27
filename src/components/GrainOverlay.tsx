"use client";

import { useEffect, useRef } from "react";

import { createNoiseTile } from "@/lib/grain";
import { isLowPower, prefersReducedMotion } from "@/lib/motion";

/**
 * Global site-wide film-grain atmosphere — one fixed, full-screen canvas with
 * a subtle, refreshing noise layer over the whole page (including plates).
 * Pauses when the tab is hidden, throttles on low-power devices, and resolves
 * to a single static frame under prefers-reduced-motion.
 */

export default function GrainOverlay() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const reduced = prefersReducedMotion();
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    const dpr = isLowPower() ? 1 : 2;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const tile = createNoiseTile(140);
    const frameRateTarget = isLowPower() ? 30 : 60;
    let last = performance.now();
    const running = true;
    let raf = 0;

    const draw = (now: number) => {
      const dt = now - last;
      if (dt >= 1000 / frameRateTarget) {
        last = now;
        ctx.clearRect(0, 0, w, h);
        ctx.globalAlpha = 0.42;
        ctx.fillStyle =
          ctx.createPattern(tile.refresh(), "repeat") ?? "transparent";
        ctx.fillRect(0, 0, w, h);
        ctx.globalAlpha = 1;
      }
      if (running && !document.hidden) raf = requestAnimationFrame(draw);
    };

    if (reduced) {
      // Static single frame.
      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = ctx.createPattern(tile.refresh(), "repeat") ?? "transparent";
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;
    } else {
      raf = requestAnimationFrame(draw);
    }

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    window.addEventListener("resize", onResize, { passive: true });

    const onVis = () => {
      if (!document.hidden && !reduced && raf === 0) {
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[60] h-full w-full"
    />
  );
}