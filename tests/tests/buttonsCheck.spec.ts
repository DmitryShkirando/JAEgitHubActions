import { test, expect } from '@playwright/test';

test.describe('DemoQA / Buttons', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://demo-qa-app.azurewebsites.net/buttons');
  });

  test('1. Двойной клик по кнопке (Double Click)', async ({ page }) => {
    const doubleClickBtn = page.getByRole('button', { name: 'Double Click Me' });
    const doubleClickMessage = page.locator('#doubleClickMessage');

    await doubleClickBtn.dblclick();

    await expect(doubleClickMessage).toBeVisible();
    await expect(doubleClickMessage).toHaveText('You have done a double click');
  });

  test('2. Клик правой кнопкой мыши (Right Click)', async ({ page }) => {
    const rightClickBtn = page.getByRole('button', { name: 'Right Click Me' });
    const rightClickMessage = page.locator('#rightClickMessage');

    await rightClickBtn.click({ button: 'right' });

    await expect(rightClickMessage).toBeVisible();
    await expect(rightClickMessage).toHaveText('You have done a right click');
  });

  test('3. Обычный динамический клик (Dynamic Click)', async ({ page }) => {
    const dynamicClickBtn = page.getByRole('button', { name: 'Click Me', exact: true });
    const dynamicClickMessage = page.locator('#dynamicClickMessage');

    await dynamicClickBtn.click();

    await expect(dynamicClickMessage).toBeVisible();
    await expect(dynamicClickMessage).toHaveText('You have done a dynamic click');
  });
});
