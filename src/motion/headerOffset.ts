/** Height of the sticky site header (px). Scroll-pinned content holds below it. */
export function headerOffset(): number {
  return document.querySelector<HTMLElement>('[data-site-header]')?.offsetHeight ?? 0
}
