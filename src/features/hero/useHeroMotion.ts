import type { RefObject } from 'react'
import { motion } from '@/config/designTokens'
import { gsap, useGSAP } from '@/motion/gsap'

/**
 * Hero motion (docs/ANIMATION_SPEC.md §1, §1b).
 * Intro on load: construction draws in, object settles, copy + CTA rise (CTA usable by ~0.6s).
 * Scroll: subtle push-in on the object while the hero leaves.
 * Reduced motion: nothing runs; markup is already the final state.
 */
export function useHeroMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = scope.current
      if (!section) return
      const q = gsap.utils.selector(section)
      const mm = gsap.matchMedia()

      mm.add({ small: motion.queries.small, large: motion.queries.large }, (ctx) => {
        const small = Boolean(ctx.conditions?.small)
        const { delay, stagger, ctaAt } = motion.heroIntro

        const tl = gsap.timeline({ delay, defaults: { ease: motion.ease.standard } })
        tl.from(q('[data-construction] circle'), {
          autoAlpha: 0,
          scale: 0.86,
          transformOrigin: '50% 50%',
          duration: motion.duration.reveal,
          stagger: stagger * 1.5,
        })
          .from(
            q('[data-construction] line'),
            { autoAlpha: 0, scale: 0, transformOrigin: '50% 50%', duration: 0.8, stagger: stagger },
            0.15,
          )
          .from(
            q('[data-hero="product"]'),
            { autoAlpha: 0, y: 18, rotation: -4, duration: 1.1, ease: 'power3.out' },
            0.15,
          )
          .from(
            q('[data-hero="line"], [data-hero="support"]'),
            { autoAlpha: 0, y: 20, duration: 0.7, stagger },
            0,
          )
          .from(
            q('[data-hero="purchase"], [data-hero="foot"]'),
            { autoAlpha: 0, y: 12, duration: 0.5 },
            ctaAt,
          )
          .from(q('[data-hero="annotations"]'), { autoAlpha: 0, duration: 0.6 }, 0.8)
          .from(q('[data-hero="views"] li'), { autoAlpha: 0, y: 12, duration: 0.5, stagger }, 0.6)

        // Scroll push-in (separate property set from the intro: scale only)
        gsap.to(q('[data-hero="product"]'), {
          scale: small ? motion.heroPushIn.mobile : motion.heroPushIn.desktop,
          ease: 'none',
          scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
        })
      })
    },
    { scope },
  )
}
