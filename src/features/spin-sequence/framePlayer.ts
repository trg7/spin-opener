/**
 * Scroll-scrubbed image-sequence player for the spin section (framework-free).
 * Frames are preloaded on demand; `setProgress(0..1)` draws the nearest decoded frame,
 * `contain`-fitted and DPR-aware. Drawing is skipped when nothing changed.
 */

/** Frame index for a 0..1 progress value. */
export const frameIndex = (progress: number, count: number) =>
  Math.min(count - 1, Math.max(0, Math.round(progress * (count - 1))))

/** Closest loaded frame to `index`, preferring earlier frames on ties; -1 if none loaded. */
export function nearestLoaded(index: number, loaded: readonly boolean[]) {
  for (let d = 0; d < loaded.length; d++) {
    if (loaded[index - d]) return index - d
    if (loaded[index + d]) return index + d
  }
  return -1
}

/** `object-fit: contain` rectangle for an image inside a box. */
export function containRect(boxW: number, boxH: number, imgW: number, imgH: number) {
  const scale = Math.min(boxW / imgW, boxH / imgH)
  const w = imgW * scale
  const h = imgH * scale
  return { x: (boxW - w) / 2, y: (boxH - h) / 2, w, h }
}

/** Resolves once the image is decoded (`decode()` where supported, `onload` otherwise). */
function loadImage(img: HTMLImageElement): Promise<void> {
  if (typeof img.decode === 'function') return img.decode()
  return new Promise((resolve, reject) => {
    img.onload = () => resolve()
    img.onerror = () => reject(new Error(`failed to load ${img.src}`))
  })
}

export class FramePlayer {
  private images: HTMLImageElement[] = []
  private loaded: boolean[] = []
  private requested = false
  private progress = 0
  private drawn = -1
  private resizeObserver: ResizeObserver | undefined

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly frames: readonly string[],
  ) {
    this.loaded = frames.map(() => false)
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => this.resize())
      this.resizeObserver.observe(canvas)
    }
    this.resize()
  }

  /** Start loading all frames (first and last first, so both ends draw immediately). */
  preload() {
    if (this.requested) return
    this.requested = true
    const order = [0, this.frames.length - 1, ...this.frames.keys()].filter(
      (v, i, a) => a.indexOf(v) === i,
    )
    for (const i of order) {
      const img = new Image()
      img.decoding = 'async'
      img.src = this.frames[i] ?? ''
      this.images[i] = img
      loadImage(img)
        .then(() => {
          this.loaded[i] = true
          // redraw if this frame is closer to the wanted one than what is on screen
          this.draw(true)
        })
        .catch(() => undefined)
    }
  }

  setProgress(progress: number) {
    this.progress = progress
    this.draw(false)
  }

  destroy() {
    this.resizeObserver?.disconnect()
    for (const img of this.images) if (img) img.src = ''
  }

  private resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const { width, height } = this.canvas.getBoundingClientRect()
    const w = Math.round(width * dpr)
    const h = Math.round(height * dpr)
    if (w && h && (this.canvas.width !== w || this.canvas.height !== h)) {
      this.canvas.width = w
      this.canvas.height = h
      this.draw(true)
    }
  }

  private draw(force: boolean) {
    const want = frameIndex(this.progress, this.frames.length)
    const index = nearestLoaded(want, this.loaded)
    if (index < 0 || (!force && index === this.drawn)) return
    const img = this.images[index]
    const ctx = this.canvas.getContext('2d')
    if (!img || !ctx) return
    const r = containRect(
      this.canvas.width,
      this.canvas.height,
      img.naturalWidth,
      img.naturalHeight,
    )
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.drawImage(img, r.x, r.y, r.w, r.h)
    this.drawn = index
  }
}
