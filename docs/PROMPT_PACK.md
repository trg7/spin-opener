# Prompt pack — AI imagery & video

For generating the shots the 3D model can't give us (hands, bottles, rooms). The product's
**geometry must come from the reference renders** in `references/prompt-pack/` (rendered from
`references/3d/spin-top.blend`). Video/image models redraw objects, so attach the references every
time and reject any output where the top's shape drifts.

## Reference images (attach these)

| File                                     | Shows                                             | Attach when                      |
| ---------------------------------------- | ------------------------------------------------- | -------------------------------- |
| `references/prompt-pack/hero.png`        | ¾ view, upright on its tip                        | **Always**                       |
| `references/prompt-pack/side.png`        | Straight side elevation (true proportions)        | **Always**                       |
| `references/prompt-pack/underside.png`   | ¾ from below: channel, zinc ring, cone, steel tip | The underside or ring is visible |
| `references/prompt-pack/ring-detail.png` | Close-up of the zinc-plated opener ring           | Bottle-opening shots             |

Most tools take 2–4 references; if limited, use `hero` + `underside` for opening shots and
`hero` + `side` otherwise.

## Product description (paste into every prompt)

> A small teal spinning top, 62 mm wide and 65 mm tall, matte 3D-printed plastic with faint
> horizontal layer lines. A thin, tall rounded stem rises from a smooth concave shoulder into a
> wide, flat-edged disc. Underneath: a shallow recessed channel, a thin zinc-plated steel ring
> around a teal cone, ending in a small polished steel ball tip. Exactly as in the reference images.

## Look (paste into every prompt)

> Warm off-white seamless background (#F3F1ED), soft natural daylight from the upper left, gentle
> shadows, shallow depth of field, editorial product-catalogue photography, 85 mm lens, calm and
> minimal. No text, no logos, no labels, no watermarks.

---

## 1. Bottle opening — video (priority)

Two steps: make a still **start frame** with an image model, then animate it with image-to-video.

### 1a. Start frame (image model: GPT-image, Gemini, Flux Kontext, Midjourney omni-reference…)

Attach: `hero.png`, `underside.png`, `ring-detail.png` (+ `side.png` if allowed).
Make one **16:9** and one **9:16**.

> Close-up product photograph. A hand holds the teal spinning top from the reference images by its
> disc, tilted, with its zinc-plated steel ring hooked under the edge of the crown cap of an amber
> glass beer bottle. Only the neck and shoulder of the bottle are in frame; the bottle is plain
> with no label. The top's underside, zinc ring and steel tip are clearly visible.
> [Product description] [Look]

### 1b. Animate (Veo, Kling, Runway Gen-4, Sora, Luma…)

Attach: the start frame from 1a (as first frame). If the tool accepts extra references, add
`underside.png`.

> Locked-off camera, no camera movement. The hand levers the spinning top upward in one smooth
> motion; the zinc ring lifts the crown cap off the amber bottle with a small pop. The cap flips
> up and out of frame and a faint wisp of vapour rises from the bottle neck. The hand pauses
> holding the top. Slow motion. The top keeps exactly the same shape and colour throughout.
> [Look]

Settings: 4–6 s, highest resolution, 16:9 and 9:16 (or one 16:9 at 4K), no audio needed.

**Reject if:** the stem gets thick or short, the disc gets rounded or domed, the ring vanishes or
moves to the disc edge, extra parts appear, the top turns green or blue-grey, or the cap comes
off without the ring touching it.

---

## 2. Lifestyle — on the coffee table (still)

Attach: `hero.png`, `side.png`. Make **4:5** and **16:9**.

> The teal spinning top from the reference images standing upright on its tip on a warm terrazzo
> coffee table, beside a stack of two design books and a small speckled ceramic bowl. Late-afternoon
> window light, soft shadow, plant leaves softly out of focus behind. [Product description] [Look —
> but replace the background clause with: "warm, lived-in living room, softly blurred"]

> **Stand:** the display stand's design isn't confirmed and we have no model of it, so leave it out
> for now. If you want it in, also attach `references/prompt-pack/stand-placeholder-ai.png` (an AI placeholder, low-res)
> and add: "resting on a round charcoal terrazzo display stand".

---

## 3. Manufacturing (still)

Attach: `side.png`, `hero.png`. Make **16:9**.

> Inside a small Melbourne workshop: the build plate of a desktop 3D printer holding six identical
> teal spinning tops from the reference images, freshly printed, upright on the plate. The print
> head is just out of focus at the top of the frame. Moody, warm workshop light, shallow depth of
> field. [Product description] No text, no logos.

> A **real phone photo** of your actual printer beats this — prefer it if you can.

---

## Delivering results

Drop the originals (not screenshots) into `references/incoming/` — any names. I'll check geometry
against the model, then crop, compress and wire them into the asset manifest.
