# Stage 1 review — static fidelity

_2026-10-17 · captured with `npm run screenshots` (Playwright Chromium; 390×844 @2x, 768×1024, 1440×900)._
Screenshots are written to `screenshots/<viewport>/` (gitignored, regenerate locally).

## What was compared

| Section                    | Reference                                         | Result                                                                                                                               |
| -------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Header                     | Storyboard desktop / UX mobile                    | Original wordmark; nav right on desktop; menu + bag on mobile (D-008)                                                                |
| Hero                       | Storyboard hero, UX screen 01                     | Layout, type scale, construction circles, annotations, technical views, feature row all match. Price + CTA above the fold at 390×844 |
| Spin                       | Storyboard 02, UX screen 02                       | Mobile: full-screen image, overlaid heading, centred footnote — matches. Desktop: copy left, image right                             |
| Reveal                     | Storyboard 03, UX screen 03                       | Matches composition; heading sits above the image on mobile (board overlays it)                                                      |
| Lifestyle + stand          | Storyboard 04, UX screen 04                       | Matches; "Explore the stand" anchor present                                                                                          |
| Choose your setup          | Storyboard 05, UX screen 05 + purchase row        | Row cards on mobile, column cards on desktop, selection border, colour, quantity, single CTA                                         |
| Details                    | Storyboard 06, UX screen 06                       | Side + top drawings with TBC dimensions, spec placeholders, macro strip                                                              |
| Making                     | Storyboard 07                                     | Copy left, print-bed image right                                                                                                     |
| Drawer / sticky bar / menu | UX "Add to cart interaction", mobile expectations | Empty-state drawer with mocked checkout; sticky bar appears after hero CTA, hides over the configurator                              |

## Known mismatches (intentional)

1. **No prices, badges or savings from boards** — A$14.99 / A$34.99 / "Most popular" / "Save when you buy together" removed (brief).
2. **Six colours → Teal only**; stand Charcoal only (D-004).
3. **"Ships from Melbourne"** removed; gift note kept.
4. **Dimensions read "TBC"** instead of 78 mm / 52 mm.
5. **Desktop story bands are split (copy | image)** rather than full-bleed with overlaid copy, so the low-resolution placeholders aren't stretched to 1440px. Revisit when real assets land.
6. **Storyboard chapter index (01–07) on the spin band** not implemented — candidate for Stage 2 alongside the pin.
7. **Wordmark is the centred original lockup**; boards approximated it left-aligned.

## Known issues (to fix later)

- **Image softness**: all photography is upscaled from tiny AI-board crops (max 495px wide). Most visible in the desktop spin/reveal bands and details macros. Needs real or higher-resolution imagery.
- **Hero photo halo**: the feathered mask leaves a soft beige pool around the product. A transparent cutout render fixes this.
- **Add to bag CTAs are inert** until Stage 3 (D-022).
- Not yet checked on a real iOS device (safe areas, `svh` behaviour); Stage 4.
