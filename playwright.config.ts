import { defineConfig } from '@playwright/test'

/** Visual capture only (not assertions): `npm run screenshots` → screenshots/<viewport>/*.png */
export default defineConfig({
  testDir: './tests/visual',
  outputDir: './test-results',
  reporter: 'list',
  use: { baseURL: 'http://localhost:4173' },
  projects: [
    {
      name: 'mobile-390',
      use: {
        viewport: { width: 390, height: 844 },
        deviceScaleFactor: 2,
        hasTouch: true,
        isMobile: true,
      },
    },
    { name: 'tablet-768', use: { viewport: { width: 768, height: 1024 }, deviceScaleFactor: 1 } },
    { name: 'laptop-1280', use: { viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 } },
    { name: 'desktop-1440', use: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 } },
  ],
  webServer: {
    command: 'npm run preview -- --port 4173 --strictPort',
    url: 'http://localhost:4173',
    reuseExistingServer: true,
  },
})
