"use client";

/**
 * Single shared pointer position, updated by one global mousemove listener.
 * Multiple plate canvases read this in their own RAF loops. Coarse/touch
 * pointers never populate it (plates fall back to in-view reveals instead).
 */

export interface PointerState {
  x: number;
  y: number;
  /** True only while a fine pointer is over the window. */
  active: boolean;
  fine: boolean;
}

export const pointer: PointerState = { x: -1, y: -1, active: false, fine: false };

let initialized = false;

export function ensurePointerListener(): void {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  pointer.fine = window.matchMedia("(pointer: fine)").matches;

  if (!pointer.fine) return;

  const onMove = (e: PointerEvent) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.active = true;
  };
  const onLeave = () => {
    pointer.active = false;
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  document.documentElement.addEventListener("pointerleave", onLeave);
  window.addEventListener("blur", onLeave);
}

/** Alias styled as a verb for call sites that "ensure" once. */
export const ensuresPointer = ensurePointerListener;