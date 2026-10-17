import { siteCopy } from '@/content/siteCopy'
import { navLinks } from './navLinks'
import { Wordmark } from './Wordmark'

export function SiteFooter() {
  return (
    <footer className="page-x border-t border-grid pb-32 pt-14 md:pb-14">
      <div className="page-container grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <Wordmark className="h-10" />
        </div>
        <nav aria-label="Footer" className="md:col-span-3">
          <ul className="flex flex-col gap-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-utility text-label font-medium uppercase hover:underline"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-col gap-3 text-sm text-ink-muted md:col-span-5">
          <p>{siteCopy.footer.shipping}</p>
          <p>{siteCopy.footer.contact}</p>
          <p className="mt-4 font-utility text-label uppercase">{siteCopy.footer.prototype}</p>
        </div>
      </div>
    </footer>
  )
}
