import { test, type Page } from '@playwright/test'

const sections = ['top', 'story', 'reveal', 'lifestyle', 'shop', 'details', 'making']

/** Scroll the whole page so lazy images load, then return to top. */
async function loadLazyImages(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
      window.scrollTo({ top: y, behavior: 'instant' })
      await new Promise((r) => setTimeout(r, 60))
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  })
  await page.waitForLoadState('networkidle')
}

test('capture page, sections and overlays', async ({ page }, info) => {
  const dir = `screenshots/${info.project.name}`
  await page.goto('/')
  await page.evaluate(() => document.fonts.ready)
  await loadLazyImages(page)

  await page.screenshot({ path: `${dir}/00-first-view.png` })
  await page.screenshot({ path: `${dir}/full-page.png`, fullPage: true })
  for (const [i, id] of sections.entries()) {
    const el = page.locator(`#${id}`)
    if ((await el.count()) === 0) continue
    await el.scrollIntoViewIfNeeded()
    await el.screenshot({ path: `${dir}/${String(i + 1).padStart(2, '0')}-${id}.png` })
  }

  // Viewport mid-story: sticky purchase bar should be visible on mobile
  await page.locator('#reveal').evaluate((el) => el.scrollIntoView({ behavior: 'instant' }))
  await page.waitForTimeout(400)
  await page.screenshot({ path: `${dir}/10-mid-scroll.png` })

  // Cart drawer
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await page.getByRole('button', { name: /^Bag/ }).click()
  await page.waitForTimeout(300)
  await page.screenshot({ path: `${dir}/11-cart-drawer.png` })
  await page.keyboard.press('Escape')

  // Mobile menu
  const menu = page.getByRole('button', { name: 'Menu' })
  if (await menu.isVisible()) {
    await menu.click()
    await page.waitForTimeout(200)
    await page.screenshot({ path: `${dir}/12-menu.png` })
  }
})
