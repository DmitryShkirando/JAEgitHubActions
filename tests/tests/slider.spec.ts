import { test, expect } from '@playwright/test';

test.describe('DemoQA / Slider', () => {
  test('Перемещение слайдера на значение 67', async ({ page }) => {
    // 1. Переходим на страницу со слайдером
    await page.goto('https://demo-qa-app.azurewebsites.net/slider');

    // 2. Находим сам слайдер и поле, отображающее его текущее значение
    const slider = page.getByRole('slider');
    const sliderValueInput = page.locator('#sliderValue');

    // Проверяем дефолтное значение (обычно 25)
    await expect(slider).toHaveValue('25');

    // 3. Устанавливаем значение 67 напрямую через fill
    await slider.fill('67');

    // Генерируем событие change/input, чтобы UI обновил текстовое поле рядом
    await slider.dispatchEvent('change');

    // 4. Проверяем, что значение слайдера и текстового поля изменилось на 67
    await expect(slider).toHaveValue('67');
    await expect(sliderValueInput).toHaveValue('67');
  });

  test('Альтернативный способ: перемещение слайдера стрелками клавиатуры', async ({ page }) => {
    await page.goto('https://demo-qa-app.azurewebsites.net/slider');

    const slider = page.getByRole('slider');
    const sliderValueInput = page.locator('#sliderValue');

    // Фокусируемся на слайдере
    await slider.focus();

    // Получаем текущее значение и высчитываем, сколько шагов нужно сделать
    const currentValue = Number(await slider.inputValue()); // Например, 25
    const targetValue = 67;
    const steps = targetValue - currentValue;

    // Нажимаем стрелку вправо нужное количество раз
    for (let i = 0; i < steps; i++) {
      await slider.press('ArrowRight');
    }

    // Проверяем результат
    await expect(slider).toHaveValue('67');
    await expect(sliderValueInput).toHaveValue('67');
  });
});
