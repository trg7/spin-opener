import { useEffect, type ReactNode } from 'react'
import { ScrollTrigger } from '@/motion/gsap'

/**
 * Recalculates ScrollTrigger positions once late-arriving content settles (web font swap,
 * full window load). Images carry explicit dimensions, so this is a safety net, not a crutch.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    void document.fonts?.ready.then(refresh)
    if (document.readyState === 'complete') refresh()
    else window.addEventListener('load', refresh, { once: true })
    return () => window.removeEventListener('load', refresh)
  }, [])
  return <>{children}</>
}
