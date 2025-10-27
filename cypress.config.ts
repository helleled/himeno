import { defineConfig } from 'cypress'

export default defineConfig({
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,
  responseTimeout: 30000,
  pageLoadTimeout: 120000,
  retries: {
    runMode: 2,
    openMode: 0,
  },
  screenshotsFolder: 'cypress/screenshots',
  videosFolder: 'cypress/videos',
  video: true,
  videoCompression: 32,
  screenshotOnRunFailure: true,
  e2e: {
    baseUrl: 'http://127.0.0.1:61812',
  },
})
