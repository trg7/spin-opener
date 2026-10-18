# Design system

Source: `references/brief/SPIN_OPENER_Style_Guide.pdf` ("Playful industrial. Precise presentation.
Curious object. Quiet humour."). Tokens: `src/config/designTokens.ts` ↔ `src/styles/theme.css`.

## Colour

### Type roles (D-049)

One role per job. Use the `type-<role>` utilities (`src/styles/global.css`); sizes live in
`theme.css` and the role list is mirrored in `designTokens.ts` (`typeRoles`, parity-tested).

| Utility          | Use                                                        | 390px | 1440px |
| ---------------- | ---------------------------------------------------------- | ----- | ------ |
| `type-hero`      | The one H1                                                 | 52px  | 104px  |
| `type-editorial` | Story-band headings (spin, lifestyle, reveal, making)      | 38px  | 68px   |
| `type-section`   | Functional section headings (shop, details)                | 34px  | 52px   |
| `type-title`     | Menu items, drawer empty state                             | 28px  | 40px   |
| `type-price`     | Primary prices (hero, configurator)                        | 24px  | 28px   |
| `type-body`      | Support paragraphs (`max-w-measure`, 34ch)                 | 16px  | 16px   |
| `type-small`     | Notes, card subtitles, spec values, footer info            | 14px  | 14px   |
| `type-label`     | Uppercase utility: nav, buttons, section index, spec terms | 11px  | 11px   |
| `type-caption`   | Technical metadata: annotations, figure captions, badges   | 10px  | 10px   |

Display roles (hero/editorial/section) are trimmed to cap height → baseline (`text-box`) and
pulled left by their side bearing, so a heading's first stroke lines up with the label above it
and spacing tokens measure optically. Browsers without `text-box` fall back to slightly looser gaps.

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

01 Hero · 02 Spin · 03 Lifestyle + stand · 04 Reveal (D-047) · 05 Choose your setup · 06 Details · 07 Making · Footer.

## Copy voice

Short, dry, curious. No inflated claims, no invented reviews. All strings in `src/content/siteCopy.ts`.
