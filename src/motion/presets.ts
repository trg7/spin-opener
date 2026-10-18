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

/** Overscan scale applied to parallax media so its edges stay outside the frame. */
const PARALLAX_SCALE = 1.1

/**
 * Scrubbed vertical parallax. The target is scaled up slightly so its edges never show
 * inside an `overflow-hidden` frame; travel is capped to what that overscan covers
 * (half the extra height), so tall travel on a short band can't expose the frame edge.
 */
export function parallax(target: Targets, trigger: Element, distance: number) {
  const travel = (_: number, el: HTMLElement) =>
    Math.min(distance, (el.offsetHeight * (PARALLAX_SCALE - 1)) / 2)
  return gsap.fromTo(
    target,
    { y: (i: number, el: HTMLElement) => -travel(i, el), scale: PARALLAX_SCALE },
    {
      y: travel,
      scale: PARALLAX_SCALE,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
      },
    },
  )
}
