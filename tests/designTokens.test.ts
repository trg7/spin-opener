import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { colors, layout, space, typeRoles } from '@/config/designTokens'

const themeCss = readFileSync(resolve(__dirname, '../src/styles/theme.css'), 'utf8')
const globalCss = readFileSync(resolve(__dirname, '../src/styles/global.css'), 'utf8')
const rem = (px: number) => `${px / 16}rem`
const kebab = (s: string) => s.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)

const luminance = (hex: string) => {
  const [r, g, b] = [1, 3, 5].map((i) => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }) as [number, number, number]
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const contrast = (a: string, b: string) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number]
  return (hi + 0.05) / (lo + 0.05)
}

describe('design tokens', () => {
  it.each(Object.entries(colors))('theme.css mirrors colour %s', (name, hex) => {
    const match = themeCss.match(new RegExp(`--color-${kebab(name)}:\\s*(#[0-9a-fA-F]{6})`))
    expect(match?.[1]?.toLowerCase()).toBe(hex.toLowerCase())
  })

  it('keeps the style-guide palette intact', () => {
    expect(colors).toMatchObject({
      warmWhite: '#F3F1ED',
      charcoal: '#222322',
      teal: '#008E96',
      grid: '#D4D1CB',
      sage: '#7D806F',
    })
  })

  it('text colours meet WCAG AA on warm white', () => {
    expect(contrast(colors.charcoal, colors.warmWhite)).toBeGreaterThanOrEqual(4.5)
    expect(contrast(colors.inkMuted, colors.warmWhite)).toBeGreaterThanOrEqual(4.5)
    expect(contrast(colors.inkMuted, colors.paper)).toBeGreaterThanOrEqual(4.5)
  })

  it.each(Object.entries(space))('theme.css mirrors spacing step %s', (name, px) => {
    expect(themeCss).toContain(`--spacing-${name}: ${rem(px)};`)
  })

  it('mirrors the page grid', () => {
    const { min, vw, max } = layout.gutter
    expect(themeCss).toContain(`--spacing-gutter: clamp(${rem(min)}, ${vw}vw, ${rem(max)});`)
    expect(themeCss).toContain(`--spacing-grid: ${rem(layout.gridGap.base)};`)
    expect(themeCss).toContain(`--spacing-section: ${rem(layout.section.base)};`)
    expect(globalCss).toContain(`--spacing-grid: ${rem(layout.gridGap.desktop)};`)
    expect(globalCss).toContain(`--spacing-section: ${rem(layout.section.desktop)};`)
    expect(globalCss).toContain(`--page-max: ${rem(layout.pageMax)};`)
    expect(globalCss).toContain(`repeat(${layout.columns}, minmax(0, 1fr))`)
  })

  it.each(typeRoles)('defines type role %s', (role) => {
    expect(themeCss).toContain(`--text-${role}:`)
    expect(globalCss).toContain(`@utility type-${role} {`)
  })
})
