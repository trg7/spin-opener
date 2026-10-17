/**
 * All user-facing copy. Components never inline marketing strings.
 *
 * Source key:  [brief] master prompt (authoritative)   [board] concept/storyboard (provisional)
 * `TODO(PRODUCT_DATA)` marks copy that implies facts we have not confirmed.
 */
export const siteCopy = {
  brand: {
    name: 'SPIN OPENER',
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
    /** "Made to spin." [brief] — split as on every board. */
    headingLines: ['Made', 'to spin.'],
    /** Rendered one sentence per line on mobile (as on the UX board), inline on desktop. */
    supportLines: [
      'A spinning top.',
      'A bottle opener.',
      'A little something for your coffee table.',
    ], // [brief]
    origin: 'Designed in Melbourne', // [board]
    annotations: { spin: 'Smooth, balanced spin', opener: 'Opens bottles' }, // [board]
    /** Desktop feature row. All three restate the brief's positioning — no new claims. */
    features: ['Designed in Melbourne', '3D printed in small batches', 'A thoughtful gift'], // [board]
    views: { top: 'Top view', side: 'Side view', bottom: 'Bottom view' }, // [board]
  },
  spin: {
    index: '02',
    headingLines: ['Go on.', 'Give it a spin.'], // [brief]
    support:
      "There's something about watching things spin. We can't quite explain it. We just know it's hard to stop.", // [board]
    footnote: 'Smooth. Balanced. Satisfying.', // [board]
  },
  reveal: {
    index: '03',
    headingLines: ['Oh, and', 'it opens bottles.'], // [brief]
    support: 'When the time is right, it opens bottles.', // [board]
  },
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
  },
  details: {
    index: '06',
    heading: 'Details', // TODO(PRODUCT_DATA): no approved heading supplied
    drawingNote: 'Drawn from the 3D model.',
    dimensionsTerm: 'Dimensions',
    dimensions: (diameterMm: number, heightMm: number) =>
      `${diameterMm} mm diameter × ${heightMm} mm tall`,
    mm: (value: number) => `${value} mm`,
    specs: [
      { term: 'Opener', value: 'Zinc-plated steel ring' }, // client-confirmed 2026-10-17
      { term: 'Materials', value: 'To be confirmed' }, // TODO(PRODUCT_DATA): body material
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
