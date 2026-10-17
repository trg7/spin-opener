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
  nav: {
    shop: 'Shop',
    story: 'Story',
    details: 'Details',
    cart: 'Bag',
  },
  hero: {
    heading: 'Made to spin.', // [brief]
    support: 'A spinning top. A bottle opener. A little something for your coffee table.', // [brief]
    origin: 'Designed in Melbourne', // [board]
    annotations: { spin: 'Smooth, balanced spin', opener: 'Opens bottles' }, // [board]
  },
  spin: {
    heading: 'Go on. Give it a spin.', // [brief]
    support:
      "There's something about watching things spin. We can't quite explain it. We just know it's hard to stop.", // [board]
    footnote: 'Smooth. Balanced. Satisfying.', // [board]
  },
  reveal: {
    heading: 'Oh, and it opens bottles.', // [brief]
    support: 'When the time is right, it opens bottles.', // [board]
  },
  lifestyle: {
    heading: 'Looks good doing nothing.', // [brief]
    support: 'A place to land when the spinning stops.', // [brief]
    exploreStand: 'Explore the stand', // [brief]
  },
  configurator: {
    heading: 'Choose your setup.', // [brief]
    support: 'The spinning top, a stand, or the perfect pair.', // [board]
    priceTbc: 'Price TBC',
    tbcNotice: 'Pricing for this option is still being confirmed.',
  },
  details: {
    heading: 'Details', // TODO(PRODUCT_DATA): no approved heading supplied
    dimensionsPlaceholder: 'Dimensions to be confirmed',
    materialsPlaceholder: 'Materials to be confirmed', // TODO(PRODUCT_DATA)
    carePlaceholder: 'Care instructions to be confirmed', // TODO(PRODUCT_DATA)
  },
  manufacturing: {
    heading: 'Made here. Made to spin.', // [brief]
    support:
      'From idea to object, SPIN OPENER is designed and 3D printed in Melbourne in small batches. A functional object with a playful side.', // [board] TODO(PRODUCT_DATA): confirm
  },
  footer: {
    shipping: 'Shipping & returns — details coming soon', // TODO(PRODUCT_DATA)
    contact: 'Contact — details coming soon', // TODO(PRODUCT_DATA)
  },
  commerce: {
    addToBag: 'Add to bag', // [brief]
    viewBag: 'View bag', // [brief]
    checkout: 'Checkout', // [brief]
    checkoutUnavailable: 'Prototype — checkout unavailable', // [brief]
    addedToBag: 'Added to your bag.', // [board]
    continueShopping: 'Continue shopping', // [board]
    subtotal: 'Subtotal',
    emptyBag: 'Your bag is empty.',
  },
} as const

export type SiteCopy = typeof siteCopy
