# spin-sequence — agent notes

This is the **only pinned section** on the page. Keep it that way.

- Layers (bottom → top): `base` (spinMotion, static end state) · `rest` · `fast` · `technical`.
  Non-base layers are `invisible opacity-0` in markup so no-JS and reduced-motion show the base frame.
- Pin start is dynamic: `top top` when the section fills the viewport (mobile overlay), otherwise
  `center center` (desktop band is shorter than the viewport). Don't hardcode one.
- Pin length and blur come from `designTokens.motion` (`spinPinLength`, `spinMaxBlur`, `scrub`).
- Mobile has a single portrait frame, so it only pulls back. When a real video/frame sequence lands,
  give mobile the same frame crossfade (add portrait keys to the asset manifest).
- **Never** CSS-rotate the product photo to fake spin — it tilts the object and misrepresents geometry.
- Copy reveal excludes `[data-spin]` children because the timeline owns the footnote.
- Any section added _above_ this one changes pin offsets: ScrollTriggers must still be created in DOM order.
