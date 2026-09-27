import { test, expect } from '@playwright/test';

test.describe('DemoQA / Droppable (Drag and Drop)', () => {
  test('Перетаскивание блока в целевую область (Simple Tab)', async ({ page }) => {
    // 1. Переходим на страницу Droppable
    await page.goto('https://demo-qa-app.azurewebsites.net/droppable');

    // 2. Объявляем локаторы для перетаскиваемого элемента (source) и зоны сброса (target)
    const draggable = page.locator('#draggable');
    const droppable = page.locator('#simpleDropContainer #droppable');

    // Проверяем начальный текст целевой области перед перетаскиванием
    await expect(droppable).toHaveText('Drop here');

    // 3. Выполняем Drag and Drop с помощью встроенного метода dragTo
    await draggable.dragTo(droppable);

    // 4. Проверяем, что объект успешно сброшен и текст изменился на "Dropped!"
    await expect(droppable).toHaveText('Dropped!');
  });
});
