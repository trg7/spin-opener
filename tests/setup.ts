import '@testing-library/jest-dom/vitest'

// jsdom has no matchMedia; GSAP's matchMedia needs it. Default: no queries match
// (equivalent to "no motion contexts active"). Tests can override per case.
if (!window.matchMedia) {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList
}
