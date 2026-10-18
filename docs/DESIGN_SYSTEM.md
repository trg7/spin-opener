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

- **Family — Montserrat** (client, D-052; OFL, self-hosted via Fontsource — the Google Fonts
  files, bundled). Supersedes the provisional Inter Tight (D-003).
- **Weights** — Light 300 for large display type only (hero, section headings, prices, menu);
  Regular 400 for everything read at text size (intro lines, body, labels, nav, buttons,
  captions). Callout titles use 500 to sit just above their descriptions.
- **Case** — headings and their intro lines in capitals (D-050, D-051); small functional text
  (card subtitles, notes, spec values, gift line) stays sentence case for readability.
- Montserrat capitals are wide: display sizes are set by the longest deliberate line in its column
  and checked at 390 / 768 / 1024–1440 so no line wraps.

### Type roles (D-049)

One role per job. Use the `type-<role>` utilities (`src/styles/global.css`); sizes live in
`theme.css` and the role list is mirrored in `designTokens.ts` (`typeRoles`, parity-tested).

| Utility          | Use                                                                       | 390px | 1440px |
| ---------------- | ------------------------------------------------------------------------- | ----- | ------ |
| `type-hero`      | The one H1 — Light capitals, +0.035em, 1.05 leading (D-050)               | 52px  | 80px   |
| `type-editorial` | Story-band headings — capitals, +0.03em (D-051); `min(48px, 3.4vw)` ≥1024 | 32px  | 48px   |
| `type-section`   | Shop, details headings — capitals, +0.03em; `min(40px, 2.85vw)` ≥1024     | 28px  | 40px   |
| `type-title`     | Menu items, drawer empty state                                            | 28px  | 40px   |
| `type-price`     | Primary prices (hero, configurator)                                       | 24px  | 28px   |
| `type-body`      | Support paragraphs (`max-w-measure`, 34ch)                                | 16px  | 16px   |
| `type-lead`      | Intro line under every hero/section heading — regular capitals, +0.12em   | 14px  | 14px   |
| `type-small`     | Notes, card subtitles, spec values, footer info                           | 14px  | 14px   |
| `type-label`     | Uppercase utility: nav, buttons, section index, spec terms                | 11px  | 11px   |
| `type-caption`   | Technical metadata: annotations, figure captions, badges                  | 10px  | 10px   |

Display roles (hero/editorial/section) are trimmed to cap height → baseline (`text-box`) and
pulled left by their side bearing, so a heading's first stroke lines up with the label above it
and spacing tokens measure optically. Browsers without `text-box` fall back to slightly looser gaps.

### Header and hero (D-050)

- **Header** — sticky, hairline bottom border, height `--header-h` (64px → 80px at 768). Three
  tracks `1fr auto 1fr`, so the wordmark sits on the viewport centre regardless of the sides.
  ≥1024: origin line left, nav + bag right. <1024: menu button left, bag right. Anchors and the
  spin pin offset by the header (`scroll-padding-top`, `headerOffset()`).
- **Hero ≥1280** — copy cols 1–4; square product stage cols 4–9 (centred on the viewport, under
  the wordmark; fits the screen height); drawings cols 11–12 behind a hairline divider.
  1024–1279: no drawings, stage cols 5–12. Stage: one construction circle (75% of the stage),
  vertical axis, two outer ticks. Two callouts (01 Spin → upper stem, 02 Open → zinc ring), placed
  from `features/hero/heroGeometry.ts` in stage %. Drawings borderless at one scale.

## Identity

Original wordmark: `brand/spin-opener-wordmark.svg` — letter-spaced `S P I N` centred over `O P E N E R`,
with a short rule beneath (aspect 2.29:1). Use the file as-is; never redraw, re-letter-space or
re-typeset it. Minimum height 32px (mobile header 36px, desktop 44px) so the cap height stays ≥ 7px.

## Layout

- **Grid (D-049)** — 12 columns from 1024px (`grid-page`), single-column flow below. Content max
  1440px (`--page-max`). Gutter `clamp(20px, 5.25vw, 76px)` (`page-x`, safe-area aware); column
  gap 20px → 24px at 1024 (`gap-grid`). `--page-inset` = viewport edge → content edge, for
  edge-bleeding media (`bleed-x`, `bleed-right`).
- **Spacing scale** — 8 · 16 · 24 · 40 · 64 · 120 (`*-s8` … `*-s120`). Section padding
  `py-section` = 64px → 120px at 1024. Prefer these over Tailwind's numeric steps for layout.
- **Section intro rhythm** (`SectionIntro`): index → heading 24 · heading → support 24 ·
  → action/footnote 40. Index = `SectionIndex` ("02" + 24px hairline), on every numbered section.
- **Shared column lines** — copy starts at col 1; band media, details drawings/close-ups and the
  footer nav all start at col 6; shop controls at col 8; footer info at col 9.
- **Split bands** — copy cols 1–5, vertically centred on the media; media cols 6–12 bleeding right,
  `min-h-band` (640px), `object-cover`. The box sets the size, never the image's own ratio.
- Controlled asymmetry: copy left-aligned in narrow columns; object large and slightly off-centre.
- Hairline dividers (`grid`) between sections on light backgrounds; photographic sections run full-bleed.
- Cards: 1px `grid` border, `radius-card` 6px max, no shadows. Selected = 1px charcoal border.
- Buttons: charcoal pill, uppercase utility label + thin arrow → (`Add to bag →`). Min height 44px.

## Technical graphics

Construction circles, crosshair, dimension lines with end ticks, small uppercase annotation labels
joined by 1px leader lines. Stroke 1px (0.75px on desktop at 2×), colour `grid`/`ink-muted`. Simplify
on mobile (fewer circles, no side drawings panel, max two annotations).

## Section order

01 Hero · 02 Spin · 03 Reveal · 04 Lifestyle + stand (D-051) · 05 Choose your setup · 06 Details · 07 Making · Footer.

## Copy voice

Short, dry, curious. No inflated claims, no invented reviews. All strings in `src/content/siteCopy.ts`.
