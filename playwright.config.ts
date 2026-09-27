import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './tests/tests',
  snapshotPathTemplate: '{testDir}/screenshots/{testFilePath}/{arg}{ext}',
  /* Run tests in files in parallel */
  fullyParallel: true,
  // Можно задать числом (например, 4) или процентом от ядер ЦП
  workers: process.env.CI ? 1 : 2,
  retries: 2, // Если тест упал из-за сети, Playwright перезапустит его еще 2 раза
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  // forbidOnly: !!process.env.CI,
  // /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  // /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['line'], ['html']],
  timeout: 40 * 1000, //— это глобальный лимит на выполнение каждого отдельного теста целиком
  expect: {
    timeout: 10 * 1000, // Assertion Timeout (Таймаут проверок expect):
  },

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    navigationTimeout: 15 * 1000, // 15 секунд на любой goto / waitForURL
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: 'https://demo-qa-app.azurewebsites.net/',

    // // 1. Скриншоты: 'off' | 'on' | 'only-on-failure' (только при падении)
    screenshot: 'only-on-failure',

    // // 2. Видео: 'off' | 'on' | 'retain-on-failure' (сохранять видео только если тест упал)
    // video: 'retain-on-failure',

    // // 3. Трассировка: 'off' | 'on' | 'retain-on-failure' | 'on-first-retry' (при первом ретрае)
    trace: 'on-first-retry',
    headless: true,
    // screenshot: 'only-on-failure',
    // video: 'retain-on-failure',
    // // 1. Размер вьюпорта (разрешение экрана)
    // viewport: { width: 1920, height: 1080 },

    // // 2. Эмуляция локали и часового пояса
    // locale: 'ru-RU',
    // timezoneId: 'Europe/Moscow',

    // // 3. Геолокация и разрешения (Permissions)
    // geolocation: { latitude: 53.9006, longitude: 27.5590 },
    // permissions: ['geolocation'],

    // // 4. Игнорирование ошибок HTTPS-сертификатов
    // ignoreHTTPSErrors: true,

    // // 5. Кастомный User-Agent
    // userAgent: 'MyCustomQAUserAgent/1.0',

    // // 6. Специфичные флаги запуска движка браузера (Chromium / Chromium args)
    // launchOptions: {
    //   args: ['--start-maximized', '--disable-web-security'],
    //   slowMo: 100, // задержка между шагами в мс (удобно для отладки)
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
