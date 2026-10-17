import { render } from '@testing-library/react'
import { motion } from '@/config/designTokens'
import { ScrollTrigger } from '@/motion/gsap'
import { SpinSection } from './SpinSection'

const original = window.matchMedia

/** Make exactly the given media queries "match". */
function mockMedia(matching: string[]) {
  window.matchMedia = (query: string) =>
    ({
      matches: matching.includes(query),
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList
}

describe('useSpinMotion', () => {
  afterEach(() => {
    window.matchMedia = original
  })

  it('creates exactly one pinned trigger when motion is allowed (≥768)', () => {
    mockMedia([motion.queries.large, motion.queries.desktop])
    const { unmount } = render(<SpinSection />)
    const pins = ScrollTrigger.getAll().filter((t) => t.pin)
    expect(pins).toHaveLength(1)
    unmount()
    expect(ScrollTrigger.getAll()).toHaveLength(0) // useGSAP reverts on unmount
  })

  it('creates no triggers and no pin under prefers-reduced-motion', () => {
    mockMedia([motion.queries.reduced])
    const { unmount } = render(<SpinSection />)
    expect(ScrollTrigger.getAll()).toHaveLength(0)
    unmount()
  })

  it('keeps non-base layers hidden in markup (static end state)', () => {
    mockMedia([motion.queries.reduced])
    const { container } = render(<SpinSection />)
    for (const layer of ['rest', 'fast', 'technical']) {
      expect(container.querySelector(`[data-spin="${layer}"]`)?.className).toMatch(/\binvisible\b/)
    }
  })
})
