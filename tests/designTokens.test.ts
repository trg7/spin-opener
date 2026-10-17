import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { colors } from '@/config/designTokens'

const themeCss = readFileSync(resolve(__dirname, '../src/styles/theme.css'), 'utf8')
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
})
