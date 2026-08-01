import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "line" : "list",
  use: {
    baseURL: "http://127.0.0.1:4173",
    browserName: "chromium",
  },
  webServer: {
    command: "node scripts/serve-tests.mjs",
    url: "http://127.0.0.1:4173/tests/fixtures/scoped-host.html",
    reuseExistingServer: !process.env.CI,
    timeout: 10_000,
  },
});
