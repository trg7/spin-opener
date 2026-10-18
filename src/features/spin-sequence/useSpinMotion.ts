import type { RefObject } from 'react'
import { motion } from '@/config/designTokens'
import { gsap, useGSAP } from '@/motion/gsap'
import { headerOffset } from '@/motion/headerOffset'
import { fadeUpOnEnter } from '@/motion/presets'

/**
 * Pin just below the sticky header if the section fills the space under it, otherwise hold it
 * centred in that space.
 */
const pinStart = (section: HTMLElement) => () => {
  const header = headerOffset()
  const visible = window.innerHeight - header
  return section.offsetHeight >= visible ? `top ${header}px` : `center ${header + visible / 2}px`
}

const pinEnd = (lengthPct: number) => () => `+=${(window.innerHeight * lengthPct) / 100}`

/**
 * 02 Spin — the single pinned, scrubbed sequence (fully reversible).
 * ≥768: technical drawing → spinRest → spinMotion → spinMotionFast (+ capped blur).
 * <768: only one portrait frame exists, so: short pin with a camera pull-back.
 * Reduced motion: no pin; spinMotion frame shown statically.
 */
export function useSpinMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = scope.current
      if (!section) return
      const q = gsap.utils.selector(section)
      const mm = gsap.matchMedia()

      mm.add(motion.queries.large, () => {
        fadeUpOnEnter(q('[data-motion="copy"] > :not([data-spin])'), section)
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: pinStart(section),
            end: pinEnd(motion.spinPinLength.desktop),
            scrub: motion.scrub,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        tl.fromTo(
          q('[data-spin="technical"]'),
          { autoAlpha: 1 },
          { autoAlpha: 0, duration: 0.25 },
          0.05,
        )
          .fromTo(q('[data-spin="rest"]'), { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.2 }, 0.4)
          .fromTo(
            q('[data-spin="fast"]'),
            { autoAlpha: 0, filter: 'blur(0px)' },
            { autoAlpha: 1, filter: `blur(${motion.spinMaxBlur.desktop}px)`, duration: 0.2 },
            0.65,
          )
          .fromTo(
            q('[data-spin="footnote"]'),
            { autoAlpha: 0, y: 8 },
            { autoAlpha: 1, y: 0, duration: 0.1 },
            0.8,
          )
          .to({}, { duration: 0.1 }) // hold on the final frame before releasing the pin
      })

      mm.add(motion.queries.small, () => {
        fadeUpOnEnter(q('[data-motion="copy"] > *'), section, 'top 60%')
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section,
            pin: true,
            start: pinStart(section),
            end: pinEnd(motion.spinPinLength.mobile),
            scrub: motion.scrub,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
        tl.fromTo(q('[data-spin="base"]'), { scale: 1.14 }, { scale: 1, duration: 1 }, 0).fromTo(
          q('[data-spin="footnote-mobile"]'),
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.25 },
          0.6,
        )
      })
    },
    { scope },
  )
}
