import { siteCopy } from '@/content/siteCopy'
import type { ImageAsset } from '@/data/assetManifest'
import { callouts, HERO_PRODUCT, type Point } from './heroGeometry'

const line = { stroke: 'currentColor', strokeWidth: 1, vectorEffect: 'non-scaling-stroke' } as const

/** Two callouts with leaders and anchor dots over the hero stage (≥1024). See ./heroGeometry.ts. */

export function HeroAnnotations({ image }: { image: ImageAsset }) {
  const aspect = image.height / image.width
  const toStage = ([fx, fy]: Point): Point => [
    HERO_PRODUCT.left + HERO_PRODUCT.width * fx,
    HERO_PRODUCT.top + HERO_PRODUCT.width * aspect * fy,
  ]

  return (
    <div data-hero="annotations" className="pointer-events-none absolute inset-0 hidden lg:block">
      <svg
        viewBox="0 0 100 100"
        overflow="visible"
        className="absolute inset-0 size-full text-charcoal/70"
        aria-hidden="true"
      >
        {Object.entries(callouts).map(([id, c]) => {
          const [dx, dy] = toStage(c.anchor)
          const [ex, ey] = c.elbow
          return (
            <g key={id}>
              <polyline
                points={`${dx},${dy} ${ex},${ey} ${c.lineEnd},${ey}`}
                fill="none"
                {...line}
              />
              <circle cx={dx} cy={dy} r={0.55} fill="currentColor" />
            </g>
          )
        })}
      </svg>

      {siteCopy.hero.annotations.map((a) => {
        const c = callouts[a.id as keyof typeof callouts]
        return (
          <div
            key={a.id}
            className="absolute"
            style={{ left: `${c.labelX}%`, top: `${c.elbow[1]}%` }}
          >
            <p className="absolute bottom-full whitespace-nowrap pb-s8 type-label font-medium text-charcoal">
              {a.index} — {a.title}
            </p>
            <p className="whitespace-nowrap pt-s8 type-caption font-normal text-ink-muted">
              {a.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
          </div>
        )
      })}
    </div>
  )
}
