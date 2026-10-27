"use client";

import { useEffect, useRef } from "react";

import { createNoiseTile } from "@/lib/grain";
import {
  isFinePointer,
  isLowPower,
  prefersReducedMotion,
} from "@/lib/motion";
import { pointer } from "@/lib/pointer";

/**
 * DevelopPlate — a canvas "grain shroud" with a colour plate underneath.
 *
 * A fine pointer erases a soft, eased hole out of the monochrome grain near the
 * cursor, revealing the plate (a genuine masked reveal, not an opacity swap).
 * When the cursor leaves, the hole closes back to grain, shedding a few amber
 * flecks. Touch devices auto-develop the plate when it scrolls into view.
 * Reduced-motion resolves to a static, fully-visible plate.
 */

export interface DevelopPlateProps {
  /** Primary plate colour (project hue). */
  color: string;
  /** Secondary glow hue used in the gradient wash. */
  glow?: string;
  /** Oversized serif text drawn on the plate. */
  label: string;
  /** Small mono caption under the label. */
  sublabel?: string;
  /** Extra classes for sizing (parent must define a box). */
  className?: string;
  /** Font size scale for the label (default 0). */
  scale?: number;
}

interface Fleck {
  x: number;
  y: number;
  life: number;
  max: number;
}

function clamp(v: number, min: number, max: number) {
  return Math.min(max, Math.max(min, v));
}

export default function DevelopPlate({
  color,
  glow = "#f5b942",
  label,
  sublabel,
  className = "",
  scale = 0,
}: DevelopPlateProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useRef(false);
  const mode = useRef<"off" | "fine" | "coarse">("off");
  const intersecting = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    reduced.current = prefersReducedMotion();
    const ctx = canvas.getContext("2d")!;

    if (reduced.current || !ctx) {
      // Reduced motion / no canvas: show the static plate.
      canvas.style.opacity = "0";
      return;
    }

    const dprCap = isLowPower() ? 1.25 : 2;
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    let w = 0;
    let h = 0;

    const tile = createNoiseTile(96);

    // State for the reveal window.
    let rad = 0;
    let tx = 0;
    let ty = 0;
    const margin = 90;
    const flecks: Fleck[] = [];
    let fleckTimer = 0;

    mode.current = isFinePointer() ? "fine" : "coarse";

    const resize = () => {
      const rect = root.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      tx = w / 2;
      ty = h / 2;
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(root);

    let running = true;
    let throttle = 0;
    const io = new IntersectionObserver(
      (entries) => {
        intersecting.current = entries[0]?.isIntersecting ?? false;
        if (!entries[0]?.isIntersecting) running = false;
        else if (mode.current !== "off") running = true;
      },
      { threshold: 0.05 }
    );
    io.observe(root);

    const frame = () => {
      throttle = (throttle + 1) % 3;
      const lowPower = isLowPower();
      const refresh = lowPower ? throttle === 0 : true;

      paint();
      const rect = root.getBoundingClientRect();
      const base = Math.max(w, h) * 1.1;

      let target = 0;
      let px: number | null = null;
      let py: number | null = null;

      if (mode.current === "fine") {
        const bright =
          pointer.active &&
          pointer.x >= rect.left - margin &&
          pointer.x <= rect.right + margin &&
          pointer.y >= rect.top - margin &&
          pointer.y <= rect.bottom + margin;
        if (bright) {
          px = clamp(pointer.x - rect.left, 0, w);
          py = clamp(pointer.y - rect.top, 0, h);
          target = base;
        }
      } else if (mode.current === "coarse") {
        if (intersecting.current) {
          px = w / 2;
          py = h / 2;
          target = base;
        }
      }

      // Ease the reveal window open/closed.
      if (px !== null && py !== null) {
        tx += (px - tx) * 0.16;
        ty += (py - ty) * 0.16;
      }
      rad += (target - rad) * 0.11;

      if (rad > 2) {
        ctx.globalCompositeOperation = "destination-out";
        const g = ctx.createRadialGradient(tx, ty, 0, tx, ty, rad);
        g.addColorStop(0, "rgba(0,0,0,0.96)");
        g.addColorStop(0.55, "rgba(0,0,0,0.72)");
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = "source-over";
      }

      // Amber flecks shed while the hole closes.
      if (
        mode.current === "fine" &&
        target === 0 &&
        rad < base * 0.5 &&
        rad > 3
      ) {
        fleckTimer += 1;
        if (fleckTimer % 2 === 0 && flecks.length < 46) {
          const a = Math.random() * Math.PI * 2;
          const rr = Math.random() * rad;
          flecks.push({
            x: tx + Math.cos(a) * rr,
            y: ty + Math.sin(a) * rr,
            life: 0,
            max: 26 + Math.random() * 26,
          });
        }
      }

      ctx.globalCompositeOperation = "source-over";
      for (let i = flecks.length - 1; i >= 0; i--) {
        const f = flecks[i];
        f.life += 1;
        const t = f.life / f.max;
        if (t >= 1) {
          flecks.splice(i, 1);
          continue;
        }
        ctx.fillStyle = `rgba(245,185,66,${(1 - t) * 0.9})`;
        const s = 1.6;
        ctx.fillRect(f.x - s, f.y - s, s * 2, s * 2);
      }

      function paint() {
        ctx.globalCompositeOperation = "source-over";
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#060605";
        ctx.fillRect(0, 0, w, h);
        ctx.globalAlpha = 0.88;
        ctx.fillStyle =
          ctx.createPattern(refresh ? tile.refresh() : tile.canvas, "repeat") ??
          "#060605";
        ctx.fillRect(0, 0, w, h);
        ctx.globalAlpha = 1;
      }

      if (running && !document.hidden) {
        raf = requestAnimationFrame(frame);
      }
    };

    let raf = requestAnimationFrame(frame);

    const resumeIfHidden = () => {
      if (!document.hidden && raf === 0) {
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", resumeIfHidden);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", resumeIfHidden);
      canvas.width = 0;
      canvas.height = 0;
    };
  }, [color, glow, label]);

  return (
    <div
      ref={rootRef}
      className={`relative overflow-hidden ${className}`}
      style={{ backgroundColor: "#060605" }}
    >
      {/* Colour plate (this is what the cursor reveals). */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background: [
            `radial-gradient(120% 130% at 18% 12%, rgba(255,255,255,0.05), transparent 55%)`,
            `radial-gradient(95% 95% at 82% 90%, ${color}99, transparent 58%)`,
            `radial-gradient(80% 80% at 70% 20%, ${glow}1f, transparent 50%)`,
            `linear-gradient(158deg, ${color} 0%, #060605 78%)`,
          ].join(", "),
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span
              className="block select-none font-serif font-semibold leading-none tracking-tight text-ivory/95"
              style={{ fontSize: `clamp(2.4rem, ${6 + scale * 1.5}vw, ${5 + scale * 1.6}rem)` }}
            >
              {label}
            </span>
            {sublabel ? (
              <span className="mt-4 block font-mono text-[0.6rem] uppercase tracking-[0.3em] text-ivory/60">
                {sublabel}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {/* Grain shroud that the cursor develops. */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}