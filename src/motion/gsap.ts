import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * Single GSAP entry point. Features import from here (never from 'gsap' directly) so
 * plugins are registered exactly once.
 */
gsap.registerPlugin(ScrollTrigger, useGSAP)

// Mobile browsers resize the viewport when the URL bar shows/hides; don't recompute on that.
ScrollTrigger.config({ ignoreMobileResize: true })

export { gsap, ScrollTrigger, useGSAP }
