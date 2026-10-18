/**
 * Design tokens — the single TypeScript source for values JS needs (motion, breakpoints,
 * colours for canvas/SVG). CSS-facing tokens live in `src/styles/theme.css` (Tailwind v4
 * `@theme`). `tests/designTokens.test.ts` fails if the two drift apart.
 *
 * Palette source: SPIN_OPENER_Style_Guide.pdf §03. Values marked `derived` are not in the
 * style guide; they were added for accessible text/surfaces and are listed in docs/DECISIONS.md.
 */

export const colors = {
  /** Style guide: WARM WHITE */
  warmWhite: '#F3F1ED',
  /** Style guide: CHARCOAL */
  charcoal: '#222322',
  /** Style guide: TEAL */
  teal: '#008E96',
  /** Style guide: GRID — construction lines, hairlines, dividers */
  grid: '#D4D1CB',
  /** Style guide: SAGE */
  sage: '#7D806F',
  /** derived — secondary text on warmWhite (≥ 4.5:1) */
  inkMuted: '#5F5E5A',
  /** derived — raised card surface used in the configurator */
  paper: '#F9F8F5',
} as const

export type ColorToken = keyof typeof colors

export const fonts = {
  /** Montserrat (client, D-052): Light 300 for display roles, Regular 400 for everything else. */
  display: "'Montserrat Variable', 'Helvetica Neue', Arial, sans-serif",
  utility: "'Montserrat Variable', 'Helvetica Neue', Arial, sans-serif",
} as const

/**
 * Spacing scale (px). The only steps used for layout spacing; mirrored as `--spacing-s<px>`
 * in theme.css (`gap-s24`, `py-s64`, …).
 */
export const space = { s8: 8, s16: 16, s24: 24, s40: 40, s64: 64, s120: 120 } as const

/** Page grid. Responsive values switch at the `lg` breakpoint (1024px). */
export const layout = {
  columns: 12,
  /** Max content width (px), gutters excluded. */
  pageMax: 1440,
  /** Gutter = clamp(min, vw, max). */
  gutter: { min: 20, vw: 5.25, max: 76 },
  gridGap: { base: 20, desktop: 24 },
  /** Vertical padding of standard sections. */
  section: { base: space.s64, desktop: space.s120 },
} as const

/** Type roles → `type-<role>` utilities in global.css. See docs/DESIGN_SYSTEM.md. */
export const typeRoles = [
  'hero',
  'editorial',
  'section',
  'title',
  'body',
  'lead',
  'small',
  'price',
  'label',
  'caption',
] as const

/** Design widths. Mobile-first: 390 is the primary canvas. */
export const breakpoints = {
  mobile: 390,
  tablet: 768,
  desktop: 1440,
} as const

/** Motion timing. Every animation duration and scroll length is read from here. */
export const motion = {
  ease: {
    standard: 'power2.out',
    inOut: 'power2.inOut',
    css: 'cubic-bezier(0.22, 1, 0.36, 1)',
  },
  duration: {
    micro: 0.18,
    ui: 0.32,
    drawer: 0.42,
    reveal: 0.9,
  },
  /** Scroll distance of the single pinned sequence, as a % of viewport height. */
  spinPinLength: { mobile: 100, desktop: 220 },
  /** Max blur (px) on the motion-blur layer; kept small for mobile GPU cost. */
  spinMaxBlur: { mobile: 2, desktop: 4 },
  /** Scrub smoothing (seconds of catch-up) for scroll-linked timelines. */
  scrub: 0.6,
  /** Max parallax travel (px) for lifestyle/manufacturing imagery. */
  parallax: { mobile: 24, desktop: 60 },
  /** Hero intro on load. CTA must be usable almost immediately. */
  heroIntro: { delay: 0.1, stagger: 0.08, ctaAt: 0.25 },
  /** Hero scroll push-in (scale at the end of the hero). */
  heroPushIn: { mobile: 1.02, desktop: 1.04 },
  /** gsap.matchMedia() conditions. "small" = below the 768px tablet breakpoint. */
  queries: {
    small: '(max-width: 767px) and (prefers-reduced-motion: no-preference)',
    large: '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
    desktop: '(min-width: 1024px) and (prefers-reduced-motion: no-preference)',
    reduced: '(prefers-reduced-motion: reduce)',
  },
} as const
