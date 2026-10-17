import type { ReactNode } from 'react'

/** Small uppercase utility label ("02", "DESIGNED IN MELBOURNE"). */
export function Eyebrow({
  children,
  className = '',
  as: Tag = 'p',
}: {
  children: ReactNode
  className?: string
  as?: 'p' | 'span' | 'dt'
}) {
  return (
    <Tag className={`font-utility text-label font-medium uppercase text-ink-muted ${className}`}>
      {children}
    </Tag>
  )
}
