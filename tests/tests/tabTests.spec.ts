import { test, expect, chromium } from '@playwright/test';

test.describe('Work with tabs and windows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo-qa-app.azurewebsites.net/browser-windows');
  });

  test('Work with tan', async ({ page, context }) => {
    const newTabButton = page.locator("//button[@id = 'tabButton']");
    // const textOntheNewPage = page.locator("//h1[@id = 'sampleHeading']");

    const pagePromise = context.waitForEvent('page');

    await newTabButton.dblclick();

    const newPage = await pagePromise;

    await newPage.waitForLoadState();
    const sampleHeading = newPage.locator("//h1[@id = 'sampleHeading']");

    await expect(sampleHeading).toBeVisible();
    await expect(sampleHeading).toHaveText('This is a sample page');

    await newPage.close();

    await page.bringToFront();
    await expect(page.locator('#tabButton')).toBeVisible();
  });

  test('Work with New Window', async ({ page, context }) => {
    const newWindowButton = page.locator('#windowButton');

    // 1. Начинаем прослушивание события открытия нового окна/вкладки
    const windowPromise = context.waitForEvent('page');

    // 2. Кликаем по кнопке открытия нового окна
    await newWindowButton.click();

    // 3. Получаем объект нового окна и ждем его загрузки
    const newWindow = await windowPromise;
    await newWindow.waitForLoadState();

    // 4. Ищем элемент НА НОВОМ ОКНЕ (newWindow), а не на исходной странице
    const sampleHeading = newWindow.locator('#sampleHeading');

    await expect(sampleHeading).toBeVisible();
    await expect(sampleHeading).toHaveText('This is a sample page');

    // 5. Закрываем новое окно и возвращаем фокус на главное
    await newWindow.close();
    await page.bringToFront();

    await expect(newWindowButton).toBeVisible();
  });
});

// await newPage.close();

//   // 6. Возвращаемся на исходную страницу и проверяем, что кнопка всё еще видна
//   await page.bringToFront();
//   await expect(page.locator('#tabButton')).toBeVisible();
