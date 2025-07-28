// @ts-check
import { defineConfig } from '@playwright/test';

/**
 * Playwright Test Configuration
 */
export default defineConfig({
  testDir: 'e2e',
  timeout: 30 * 1000,
  webServer: {
    // start Vite dev server and wait until it's ready
    command: 'npm run dev',
    url: 'http://127.0.0.1:5173',
    timeout: 120 * 1000, // wait up to 2 minutes for dev server
    reuseExistingServer: false,
  },
  use: {
    headless: true,
    baseURL: 'http://127.0.0.1:5173',
    ignoreHTTPSErrors: true,
  },
});
