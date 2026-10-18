/**
 * All user-facing copy. Components never inline marketing strings.
 *
 * Source key:  [brief] master prompt (authoritative)   [board] concept/storyboard (provisional)
 * `TODO(PRODUCT_DATA)` marks copy that implies facts we have not confirmed.
 */
export const siteCopy = {
  brand: {
    name: 'SPIN OPENER',
    /** Header (desktop) and hero foot (mobile). Client copy, 2026-10-18 (D-050). */
    origin: 'Made in Melbourne.',
  },
  meta: {
    prototypeImage: 'Prototype image',
    imageUnavailable: 'Image unavailable',
    skipToContent: 'Skip to content',
  },
  nav: {
    shop: 'Shop',
    story: 'Story',
    details: 'Details',
    cart: 'Bag',
    menu: 'Menu',
    closeMenu: 'Close menu',
    home: 'SPIN OPENER home',
  },
  hero: {
    index: '01',
    /** "Made to spin." [brief] — two lines; set in capitals by the hero type role (D-050). */
    headingLines: ['Made', 'to spin.'],
    /** Desktop line breaks from the approved hero (D-050); runs on naturally on mobile. */
    supportLines: [
      'A spinning top. A bottle opener.',
      'A little something for your',
      'coffee table.',
    ], // [brief]
    /** Exactly two callouts (D-050). The ring under the disc is the opener (D-033). */
    annotations: [
      { id: 'spin', index: '01', title: 'Spin', lines: ['A smooth,', 'balanced spin.'] },
      { id: 'open', index: '02', title: 'Open', lines: ['Doubles as', 'a bottle opener.'] },
    ],
    views: { top: 'Top view', side: 'Side view', bottom: 'Bottom view' }, // [board]
  },
  spin: {
    index: '02',
    headingLines: ['Go on.', 'Give it a spin.'], // [brief]
    support:
      "There's something about watching things spin. We can't quite explain it. We just know it's hard to stop.", // [board]
    footnote: 'Smooth. Balanced. Satisfying.', // [board]
  },
  /** Chapter 03 — straight after the spin (D-051). Heading replaces the brief's "Oh, and it opens bottles." (D-047) */
  reveal: {
    index: '03',
    headingLines: ['When the time', 'is right,', 'it opens bottles.'], // client 2026-10-17
  },
  /** Chapter 04 — after the reveal, leads into the shop (D-051). */
  lifestyle: {
    index: '04',
    headingLines: ['Looks good', 'doing nothing.'], // [brief]
    support: 'A place to land when the spinning stops.', // [brief]
    exploreStand: 'Explore the stand', // [brief]
  },
  configurator: {
    index: '05',
    headingLines: ['Choose', 'your setup.'], // [brief] — one line from 1024px
    support: 'The spinning top, a stand, or the perfect pair.', // [board]
    setupLegend: 'Setup',
    colourLegend: 'Colour',
    standColourLabel: 'Stand',
    topColourLabel: 'Top',
    quantity: 'Quantity',
    priceTbc: 'Price TBC',
    provisionalPrice: 'Prototype price',
    tbcNotice: 'Pricing for this option is still being confirmed.',
    giftNote: 'A thoughtful gift for curious people.', // [board]
    /** Shown when the selected colour has no imagery yet (honest previews). */
    preview: {
      top: (shown: string, wanted: string) => `Shown in ${shown}. ${wanted} imagery coming soon.`,
      stand: (wanted: string) =>
        `Stand pictured is a placeholder. ${wanted} stand imagery coming soon.`,
    },
  },
  details: {
    index: '06',
    heading: 'Details', // TODO(PRODUCT_DATA): no approved heading supplied
    drawingNote: 'Provisional drawing — final geometry to be confirmed.',
    dimensionTbc: 'TBC',
    specs: [
      { term: 'Dimensions', value: 'To be confirmed' }, // TODO(PRODUCT_DATA)
      { term: 'Materials', value: 'To be confirmed' }, // TODO(PRODUCT_DATA)
      { term: 'Care', value: 'To be confirmed' }, // TODO(PRODUCT_DATA)
      { term: 'Made', value: 'Designed and 3D printed in Melbourne' }, // [brief]
    ],
  },
  manufacturing: {
    index: '07',
    headingLines: ['Made here.', 'Made to spin.'], // [brief]
    support:
      'From idea to object, SPIN OPENER is designed and 3D printed in Melbourne in small batches. A functional object with a playful side.', // [board] TODO(PRODUCT_DATA): confirm
  },
  footer: {
    shipping: 'Shipping & returns — details coming soon', // TODO(PRODUCT_DATA)
    contact: 'Contact — details coming soon', // TODO(PRODUCT_DATA)
    prototype: 'Prototype — not a live store.',
  },
  commerce: {
    addToBag: 'Add to bag', // [brief]
    viewBag: 'View bag', // [brief]
    checkout: 'Checkout', // [brief]
    checkoutUnavailable: 'Prototype — checkout unavailable', // [brief]
    addedToBag: 'Added to your bag.', // [board]
    continueShopping: 'Continue shopping', // [board]
    bagTitle: 'Your bag',
    closeBag: 'Close bag',
    subtotal: 'Subtotal',
    emptyBag: 'Your bag is empty.',
    increase: 'Increase quantity',
    decrease: 'Decrease quantity',
  },
} as const

export type SiteCopy = typeof siteCopy
