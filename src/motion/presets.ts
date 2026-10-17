import { motion } from '@/config/designTokens'
import { gsap } from './gsap'

type Targets = gsap.TweenTarget

/**
 * Copy fades up as its section enters and reverses when scrolled back past.
 * Interactive elements are never hidden for long: the tween is short and starts early.
 */
export function fadeUpOnEnter(targets: Targets, trigger: Element, start = 'top 75%') {
  return gsap.from(targets, {
    autoAlpha: 0,
    y: 24,
    duration: motion.duration.reveal,
    ease: motion.ease.standard,
    stagger: 0.08,
    scrollTrigger: { trigger, start, toggleActions: 'play none none reverse' },
  })
}

/**
 * Scrubbed vertical parallax. The target is scaled up slightly so its edges never show
 * inside an `overflow-hidden` frame.
 */
export function parallax(target: Targets, trigger: Element, distance: number) {
  return gsap.fromTo(
    target,
    { y: -distance, scale: 1.1 },
    {
      y: distance,
      scale: 1.1,
      ease: 'none',
      scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: true },
    },
  )
}
