"use client";

/**
 * Lightweight film-grain engine — no WebGL, no heavy canvas libraries.
 * A small noise tile is freshly regenerated every frame (moving grain) and
 * tiled across a target canvas. Allocating the tile once and writing pixel
 * data via putImageData keeps per-frame allocation to a minimum.
 */

export interface NoiseTile {
  canvas: HTMLCanvasElement;
  size: number;
  /** Regenerate pixel data → returning the canvas for pattern use. */
  refresh: () => HTMLCanvasElement;
}

export function createNoiseTile(size = 96): NoiseTile {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const imageData = ctx.createImageData(size, size);

  function refresh(): HTMLCanvasElement {
    const data = imageData.data;
    // Fine monochrome grain on a dark void: centred low values with spread.
    for (let i = 0; i < data.length; i += 4) {
      const v = 22 + Math.random() * 120;
      data[i] = v;
      data[i + 1] = v;
      data[i + 2] = v;
      data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  return { canvas, size, refresh };
}

/** Paint opaque void grain across the whole context. */
export function paintVoidGrain(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  tile: NoiseTile
): void {
  ctx.globalAlpha = 1;
  ctx.fillStyle = "#060605";
  ctx.fillRect(0, 0, w, h);
  ctx.globalAlpha = 0.9;
  ctx.fillStyle = ctx.createPattern(tile.refresh(), "repeat") ?? "#060605";
  ctx.fillRect(0, 0, w, h);
  ctx.globalAlpha = 1;
}