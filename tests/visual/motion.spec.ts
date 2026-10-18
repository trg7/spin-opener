import { expect, test, type Page } from '@playwright/test'

/** Absolute scroll position where the spin pin starts, and its length, read from the pin spacer. */
async function pinGeometry(page: Page) {
  return page.evaluate(() => {
    const section = document.querySelector('#story') as HTMLElement
    const spacer = section.parentElement as HTMLElement
    const isPinned = spacer.classList.contains('pin-spacer')
    const top = (isPinned ? spacer : section).getBoundingClientRect().top + window.scrollY
    const h = section.offsetHeight
    const vh = window.innerHeight
    const start = h >= vh ? top : top - (vh - h) / 2
    const length = isPinned ? spacer.offsetHeight - h : 0
    return { start, length, isPinned }
  })
}

async function scrollToY(page: Page, y: number) {
  await page.evaluate((top) => window.scrollTo({ top, behavior: 'instant' }), y)
  await page.waitForTimeout(1200) // let the scrub (0.6s) settle
}

test('spin pin: frames, reversibility', async ({ page }, info) => {
  const dir = `screenshots/${info.project.name}/motion`
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await page.waitForLoadState('networkidle')
  const { start, length, isPinned } = await pinGeometry(page)
  expect(isPinned).toBe(true)

  const shots: Record<string, Buffer> = {}
  for (const p of [0, 0.3, 0.55, 0.8, 1]) {
    await scrollToY(page, start + length * p)
    shots[`fwd-${p}`] = await page.screenshot({
      path: `${dir}/spin-${String(Math.round(p * 100)).padStart(3, '0')}.png`,
    })
  }
  // reverse: go back to 30 % from below
  await scrollToY(page, start + length * 0.3)
  const back = await page.screenshot({ path: `${dir}/spin-030-reverse.png` })
  expect(
    back.equals(shots['fwd-0.3'] ?? Buffer.alloc(0)),
    'reverse scroll should restore the same frame',
  ).toBe(true)
})

test('bottle reveal frames', async ({ page }, info) => {
  const dir = `screenshots/${info.project.name}/motion`
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  const top = await page.evaluate(() => {
    const el = document.querySelector('#reveal') as HTMLElement
    return el.getBoundingClientRect().top + window.scrollY
  })
  const vh = page.viewportSize()?.height ?? 0
  for (const [label, y] of [
    ['start', top - vh * 0.85],
    ['mid', top - vh * 0.5],
    ['end', top],
  ] as const) {
    await scrollToY(page, y)
    await page.screenshot({ path: `${dir}/reveal-${label}.png` })
  }
})

test('hero intro', async ({ page }, info) => {
  const dir = `screenshots/${info.project.name}/motion`
  await page.goto('/')
  await page.waitForTimeout(350)
  await page.screenshot({ path: `${dir}/hero-0350ms.png` })
  await page.waitForTimeout(2000)
  await page.screenshot({ path: `${dir}/hero-settled.png` })
})

test('anchor navigation lands #shop just below the sticky header, past the pin', async ({
  page,
}) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => (location.hash = '#shop'))
  await page.waitForTimeout(1500)
  const { top, header } = await page.evaluate(() => ({
    top: document.querySelector('#shop')?.getBoundingClientRect().top ?? Infinity,
    header: document.querySelector<HTMLElement>('[data-site-header]')?.offsetHeight ?? 0,
  }))
  expect(header).toBeGreaterThan(0)
  expect(Math.abs(top - header)).toBeLessThan(4)
})

test('header stays put and keeps the wordmark centred', async ({ page }) => {
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.evaluate(() => window.scrollTo({ top: 3000, behavior: 'instant' }))
  await page.waitForTimeout(300)
  const { top, logoCentre, vw } = await page.evaluate(() => {
    const header = document.querySelector<HTMLElement>('[data-site-header]')
    const logo = header?.querySelector('img')?.getBoundingClientRect()
    if (!header || !logo) return { top: NaN, logoCentre: NaN, vw: 0 }
    return {
      top: header.getBoundingClientRect().top,
      logoCentre: logo.left + logo.width / 2,
      vw: document.documentElement.clientWidth,
    }
  })
  expect(top).toBe(0)
  expect(Math.abs(logoCentre - vw / 2)).toBeLessThan(1)
})

test.describe('reduced motion', () => {
  test.use({ reducedMotion: 'reduce' })
  test('no pin, static end states', async ({ page }, info) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    expect(await page.locator('.pin-spacer').count()).toBe(0)
    await page.locator('#story').scrollIntoViewIfNeeded()
    await page
      .locator('#story')
      .screenshot({ path: `screenshots/${info.project.name}/motion/spin-reduced.png` })
  })
})
