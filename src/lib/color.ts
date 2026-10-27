"use client";

/** Convert a #rrggbb hex to an rgba() string. */
export function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/** Multiply a hex colour toward black by `factor` (0..1 keeps colour). */
export function shade(hex: string, factor: number): string {
  const h = hex.replace("#", "");
  const r = Math.round(parseInt(h.slice(0, 2), 16) * factor);
  const g = Math.round(parseInt(h.slice(2, 4), 16) * factor);
  const b = Math.round(parseInt(h.slice(4, 6), 16) * factor);
  return `rgb(${r}, ${g}, ${b})`;
}

/** Mix a hex toward a target hex by amount (0..1). */
export function mix(hex: string, target: string, amount: number): string {
  const a = hex.replace("#", "");
  const b = target.replace("#", "");
  const r = Math.round(
    parseInt(a.slice(0, 2), 16) * (1 - amount) + parseInt(b.slice(0, 2), 16) * amount
  );
  const g = Math.round(
    parseInt(a.slice(2, 4), 16) * (1 - amount) + parseInt(b.slice(2, 4), 16) * amount
  );
  const bl = Math.round(
    parseInt(a.slice(4, 6), 16) * (1 - amount) + parseInt(b.slice(4, 6), 16) * amount
  );
  return `rgb(${r}, ${g}, ${bl})`;
}