import type { RefObject } from 'react'
import { motion } from '@/config/designTokens'
import { gsap, useGSAP } from '@/motion/gsap'
import { fadeUpOnEnter } from '@/motion/presets'

/**
 * 03 Reveal — scrubbed (not pinned), fully reversible. docs/ANIMATION_SPEC.md §3.
 * Frame opens from an inset clip, image settles from 1.15 → 1, and on ≥768 the underside
 * close-up crossfades to the bottle being opened.
 */
export function useRevealMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = scope.current
      if (!section) return
      const q = gsap.utils.selector(section)
      const mm = gsap.matchMedia()

      mm.add({ small: motion.queries.small, large: motion.queries.large }, (ctx) => {
        const large = Boolean(ctx.conditions?.large)
        fadeUpOnEnter(q('[data-motion="copy"] > *'), section)

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'center 45%',
            scrub: motion.scrub,
          },
        })
        tl.fromTo(
          q('[data-reveal="frame"]'),
          { clipPath: 'inset(10% 8% 10% 8%)' },
          { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.6 },
          0,
        ).fromTo(
          q('[data-reveal="layer"], [data-reveal="underside"]'),
          { scale: 1.15 },
          { scale: 1, duration: 1 },
          0,
        )

        if (large) {
          tl.fromTo(
            q('[data-reveal="underside"]'),
            { autoAlpha: 1 },
            { autoAlpha: 0, duration: 0.35 },
            0.5,
          )
        }
      })
    },
    { scope },
  )
}
