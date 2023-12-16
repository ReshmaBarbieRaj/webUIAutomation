import { type PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './test-suites',
  timeout: 15 * 60 * 1000,
  expect: {
    timeout: 10 * 1000
  },
  fullyParallel: false,
  //retries: 2,
  //maxFailures: 10,
  //reporter: [['list'], ['html', { outputFolder : "/reports" }]],
  reporter : 'html',
  use: {
    actionTimeout: 5 * 60 * 1000,
    trace: 'off',
    video: 'off',
    screenshot: 'only-on-failure',
    headless: false,
   // viewport: { width: 1280, height: 720 },
    launchOptions: {
      slowMo: 500,
    }
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
};

export default config;
