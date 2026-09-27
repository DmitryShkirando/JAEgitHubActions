import { test, expect } from '@playwright/test';

test.describe('DemoQA / Dynamic Properties', () => {
  test('Клик по кнопке "Visible After 5 Seconds" и проверка текста', async ({ page }) => {
    // 1. Переходим на страницу с динамическими свойствами
    await page.goto('https://demo-qa-app.azurewebsites.net/dynamic-properties');

    // 2. Объявляем локатор кнопки
    // Используем пользовательский локатор по роли и имени кнопки
    const visibleAfterButton = page.getByRole('button', { name: 'Visible After 5 Seconds' });

    // 3. Ждем появления кнопки и проверяем ее видимость
    // Web-first assertion toBeVisible() автоматически ждет появления элемента в DOM до 30 секунд
    await expect(visibleAfterButton).toBeVisible();

    // 4. Проверяем точный текст на кнопке
    await expect(visibleAfterButton).toHaveText('Visible After 5 Seconds');

    // 5. Выполняем клик по кнопке
    await visibleAfterButton.click();
  });
});
