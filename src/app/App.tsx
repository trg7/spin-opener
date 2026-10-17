import { siteCopy } from '@/content/siteCopy'

/**
 * Stage 0 shell — proves the toolchain, tokens and font load. Replaced in Stage 1 by the
 * section composition described in docs/ARCHITECTURE.md.
 */
export function App() {
  return (
    <main className="mx-auto flex min-h-svh max-w-[90rem] flex-col justify-center gap-6 px-6">
      <p className="font-utility text-label tracking-[0.14em] text-ink-muted uppercase">
        Stage 0 — foundation
      </p>
      <h1 className="font-display text-display-xl font-light">{siteCopy.hero.headingLines.join(' ')}</h1>
      <p className="max-w-[28ch] text-body text-ink-muted">{siteCopy.hero.supportLines.join(' ')}</p>
    </main>
  )
}
