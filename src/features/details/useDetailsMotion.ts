import type { RefObject } from 'react'
import { motion } from '@/config/designTokens'
import { gsap, useGSAP } from '@/motion/gsap'

/** 06 Details — drawings, spec rows and close-ups rise in once as the section enters. */
export function useDetailsMotion(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const section = scope.current
      if (!section) return
      const q = gsap.utils.selector(section)
      const mm = gsap.matchMedia()
      mm.add({ small: motion.queries.small, large: motion.queries.large }, () => {
        gsap.from(q('[data-details]'), {
          autoAlpha: 0,
          y: 20,
          duration: motion.duration.reveal,
          ease: motion.ease.standard,
          stagger: 0.08,
          scrollTrigger: { trigger: section, start: 'top 75%', once: true },
        })
      })
    },
    { scope },
  )
}
