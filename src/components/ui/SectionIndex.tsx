/** Section number ("02") followed by a short hairline — the same mark on every numbered section. */
export function SectionIndex({
  children,
  className = '',
}: {
  children: string
  className?: string
}) {
  return (
    <p className={`trim-cap flex items-center gap-s16 type-label text-ink-muted ${className}`}>
      <span className="tabular-nums">{children}</span>
      <span aria-hidden="true" className="h-px w-s24 bg-ink-muted/50" />
    </p>
  )
}
