import type { RefObject } from 'react'
import { motion } from '@/config/designTokens'
import { sequences, type ImageSequence } from '@/data/assetManifest'
import { gsap, ScrollTrigger, useGSAP } from '@/motion/gsap'
import { fadeUpOnEnter } from '@/motion/presets'
import { FramePlayer } from './framePlayer'

/** Pin from the top if the section fills the viewport, otherwise hold it centred. */
const pinStart = (section: HTMLElement) => () =>
  section.offsetHeight >= window.innerHeight ? 'top top' : 'center center'

const pinEnd = (lengthPct: number) => () => `+=${(window.innerHeight * lengthPct) / 100}`

/**
 * 02 Spin — the single pinned, scrubbed sequence (fully reversible).
 * ≥768: technical drawing dissolves into frame 1 (at rest), then the rendered sequence spins up.
 * <768: the portrait sequence spins up (no technical layer).
 * Reduced motion: no pin; the poster (final frame) is shown statically.
 */
export function useSpinMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = scope.current
      if (!section) return
      const q = gsap.utils.selector(section)
      const canvas = q('[data-spin="canvas"]')[0] as HTMLCanvasElement | undefined
      if (!canvas) return
      const mm = gsap.matchMedia()

      /** Shared: player, lazy preload, canvas-over-poster swap. */
      const setupPlayer = (seq: ImageSequence) => {
        const player = new FramePlayer(canvas, seq.frames)
        ScrollTrigger.create({
          trigger: section,
          start: () => `top bottom+=${window.innerHeight * 1.5}`,
          once: true,
          onEnter: () => player.preload(),
        })
        gsap.set(q('[data-spin="poster"]'), { autoAlpha: 0 })
        gsap.set(canvas, { autoAlpha: 1 })
        player.setProgress(0)
        return player
      }

      const pinnedTimeline = (start: ReturnType<typeof pinStart> | string, lengthPct: number) =>
        gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            pin: true,
            start,
            end: pinEnd(lengthPct),
            scrub: motion.scrub,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })

      mm.add(motion.queries.large, () => {
        const player = setupPlayer(sequences.spin)
        const state = { p: 0 }
        fadeUpOnEnter(q('[data-motion="copy"] > :not([data-spin])'), section)
        pinnedTimeline(pinStart(section), motion.spinPinLength.desktop)
          .fromTo(
            q('[data-spin="technical"]'),
            { autoAlpha: 1 },
            { autoAlpha: 0, duration: 0.2 },
            0.04,
          )
          .fromTo(
            q('[data-spin="geometry"]'),
            { autoAlpha: 1 },
            { autoAlpha: 0.35, duration: 0.4 },
            0.25,
          )
          .to(state, { p: 1, duration: 0.62, onUpdate: () => player.setProgress(state.p) }, 0.22)
          .fromTo(
            q('[data-spin="footnote"]'),
            { autoAlpha: 0, y: 8 },
            { autoAlpha: 1, y: 0, duration: 0.1 },
            0.8,
          )
          .to({}, { duration: 0.1 }) // hold on the final frame before releasing the pin
        return () => player.destroy()
      })

      mm.add(motion.queries.small, () => {
        const player = setupPlayer(sequences.spinPortrait)
        const state = { p: 0 }
        fadeUpOnEnter(q('[data-motion="copy"] > *'), section, 'top 60%')
        pinnedTimeline('top top', motion.spinPinLength.mobile)
          .to(state, { p: 1, duration: 0.8, onUpdate: () => player.setProgress(state.p) }, 0.05)
          .fromTo(
            q('[data-spin="geometry"]'),
            { autoAlpha: 1 },
            { autoAlpha: 0.35, duration: 0.4 },
            0.2,
          )
          .fromTo(
            q('[data-spin="footnote-mobile"]'),
            { autoAlpha: 0, y: 8 },
            { autoAlpha: 1, y: 0, duration: 0.15 },
            0.75,
          )
          .to({}, { duration: 0.1 })
        return () => player.destroy()
      })
    },
    { scope },
  )
}
