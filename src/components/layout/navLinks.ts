import { siteCopy } from '@/content/siteCopy'

/** Anchor targets are the section ids composed in App.tsx. */
export const navLinks = [
  { href: '#shop', label: siteCopy.nav.shop },
  { href: '#story', label: siteCopy.nav.story },
  { href: '#details', label: siteCopy.nav.details },
] as const
