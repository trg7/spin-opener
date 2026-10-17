# Design system

Source: `references/brief/SPIN_OPENER_Style_Guide.pdf` ("Playful industrial. Precise presentation.
Curious object. Quiet humour."). Tokens: `src/config/designTokens.ts` ↔ `src/styles/theme.css`.

## Colour

| Token                   | Hex       | Use                                                                                           |
| ----------------------- | --------- | --------------------------------------------------------------------------------------------- |
| `warm-white`            | `#F3F1ED` | Page background                                                                               |
| `charcoal`              | `#222322` | Text, primary buttons (pill, charcoal fill, warm-white label), dark stand                     |
| `teal`                  | `#008E96` | Product colour, focus ring, selected-state accents (sparingly — the product carries the teal) |
| `grid`                  | `#D4D1CB` | Construction lines, hairlines, dividers, card borders                                         |
| `sage`                  | `#7D806F` | Rare secondary accent (technical callouts)                                                    |
| `ink-muted` _(derived)_ | `#5F5E5A` | Secondary text; ≥4.5:1 on warm-white and paper (tested)                                       |
| `paper` _(derived)_     | `#F9F8F5` | Raised configurator option surfaces (boards show slightly lighter cards)                      |

Photography supplies the remaining palette (terrazzo, timber, amber glass). No gradients.

## Typography

- **Display** — light grotesk, restrained tracking. Weight ~300, tracking −0.02 to −0.03em, tight leading (0.98–1.08). Sentence case with full stops ("Made to spin.").
- **Utility** — uppercase, compact, precise. 11px, weight ~500, tracking 0.14em. Used for nav, eyebrows ("01 / Hero"), annotations, button labels, price labels in lists.
- **Body** — 15–16px, weight ~350, 1.45 leading, max ~34ch on mobile.
- Provisional family: **Inter Tight Variable** (self-hosted via Fontsource, OFL). Swap in `designTokens.ts` + `theme.css` if a licensed face (e.g. Neue Montreal, Suisse Int'l) is chosen.

| Token                                    | 390px | 1440px |
| ---------------------------------------- | ----- | ------ |
| `text-display-xl` (hero)                 | 52px  | 104px  |
| `text-display-l` (section)               | 38px  | 68px   |
| `text-display-m` (configurator, details) | 28px  | 40px   |
| `text-body`                              | 16px  | 16px   |
| `text-label`                             | 11px  | 11px   |

## Identity

Original wordmark: `brand/spin-opener-wordmark.svg` — letter-spaced `S P I N` centred over `O P E N E R`,
with a short rule beneath (aspect 2.29:1). Use the file as-is; never redraw, re-letter-space or
re-typeset it. Minimum height 32px (mobile header 36px, desktop 44px) so the cap height stays ≥ 7px.

## Layout

- Mobile canvas 390, 16–20px side gutters, safe-area aware. Tablet 768. Desktop design width 1440, 12-col grid, ~64px gutters.
- Controlled asymmetry: copy left-aligned in narrow columns; object large and slightly off-centre.
- Hairline dividers (`grid`) between sections on light backgrounds; photographic sections run full-bleed.
- Cards: 1px `grid` border, `radius-card` 6px max, no shadows. Selected = 1px charcoal border.
- Buttons: charcoal pill, uppercase utility label + thin arrow → (`Add to bag →`). Min height 44px.

## Technical graphics

Construction circles, crosshair, dimension lines with end ticks, small uppercase annotation labels
joined by 1px leader lines. Stroke 1px (0.75px on desktop at 2×), colour `grid`/`ink-muted`. Simplify
on mobile (fewer circles, no side drawings panel, max two annotations).

## Section order

01 Hero · 02 Spin · 03 Reveal · 04 Lifestyle + stand · 05 Choose your setup · 06 Details · 07 Making · Footer.

## Copy voice

Short, dry, curious. No inflated claims, no invented reviews. All strings in `src/content/siteCopy.ts`.
