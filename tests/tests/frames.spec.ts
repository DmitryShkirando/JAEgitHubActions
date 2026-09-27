import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage.ts';
import { FramesPage } from '../pages/framesPage.ts';

test.describe('DemoQA - Frames Suite', () => {
  test('Переход в Alerts/Frames и проверка содержимого iframe', async ({ page }) => {
    const homePage = new HomePage(page);
    const framesPage = new FramesPage(page);

    // 1. Переходим на главную страницу
    await homePage.goto();
    await homePage.verifyPageLoaded();

    // 2. Нажимаем карточку "Alerts, Frame & Windows"
    await homePage.openAlertsFrameWindowsSection();
    await expect(page).toHaveURL(/.*alertsWindows/);

    // 3. Переходим во вкладку "Frames"
    await framesPage.selectFramesMenu();
    await expect(page).toHaveURL(/.*frames/);

    // 4. Проверяем содержимое первого фрейма
    await framesPage.verifyFrame1Content('This is a sample page');
  });
});
