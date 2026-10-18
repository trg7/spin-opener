import { siteCopy } from '@/content/siteCopy'
import { navLinks } from './navLinks'
import { Wordmark } from './Wordmark'

/**
 * Groups sit on the page grid: wordmark cols 1–4, nav from col 6 (the line where band media
 * and the details drawings start), info cols 9–12. Mobile bottom padding clears the sticky bar.
 */
export function SiteFooter() {
  return (
    <footer className="page-x border-t border-grid pb-s120 pt-section md:pb-s64">
      <div className="page-container">
        <div className="flex flex-col gap-s40 md:grid-page md:gap-y-s40">
          <div className="md:col-span-4">
            <Wordmark className="h-10" />
          </div>
          <nav aria-label="Footer" className="md:col-span-3 md:col-start-6">
            {/* 44px targets; the negative margin keeps the first/last label on the group's edges */}
            <ul className="-my-s16 flex flex-col">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="flex min-h-11 items-center type-label underline-offset-4 hover:underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-s8 type-small text-ink-muted md:col-span-4 md:col-start-9">
            <p>{siteCopy.footer.shipping}</p>
            <p>{siteCopy.footer.contact}</p>
          </div>
        </div>
        <p className="mt-s64 border-t border-grid pt-s24 type-caption text-ink-muted">
          {siteCopy.footer.prototype}
        </p>
      </div>
    </footer>
  )
}
