import type { RefObject } from 'react'
import { motion } from '@/config/designTokens'
import { gsap, useGSAP } from './gsap'
import { fadeUpOnEnter, parallax } from './presets'

/**
 * Default motion for a StoryBand section: copy fades up on enter (reversible) and the
 * media layer gets a scrubbed parallax. Reduced motion → nothing (static end state).
 */
export function useStoryBandMotion(
  scope: RefObject<HTMLElement | null>,
  { parallax: withParallax = true }: { parallax?: boolean } = {},
) {
  useGSAP(
    () => {
      const section = scope.current
      if (!section) return
      const mm = gsap.matchMedia()
      mm.add({ small: motion.queries.small, large: motion.queries.large }, (ctx) => {
        fadeUpOnEnter(section.querySelectorAll('[data-motion="copy"] > *'), section)
        // Move the photo, not its wrapper, so the placeholder badge stays put in the frame corner.
        const layer = section.querySelector('[data-motion="media"] > :first-child')
        const media = layer?.querySelector('picture') ?? layer
        if (withParallax && media) {
          const small = Boolean(ctx.conditions?.small)
          parallax(media, section, small ? motion.parallax.mobile : motion.parallax.desktop)
        }
      })
    },
    { scope },
  )
}
