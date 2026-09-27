import { type Page, test, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

test.describe('DemoQA - Upload and Download', () => {
  test.beforeEach(async ({ page }) => {
    // Переходим на страницу Upload and Download перед каждым тестом
    await page.goto('https://demoqa.com/upload-download');
  });

  test('Успешное скачивание файла', async ({ page }) => {
    const downloadPromise = page.waitForEvent('download');

    await page.locator("//a[@id = 'downloadButton']").click();

    const download = await downloadPromise;

    const suggestedFileName = download.suggestedFilename();
    expect(suggestedFileName).toBe('sampleFile.jpeg');

    // process.cwd() указывает на корень проекта
    const savePath = path.join(process.cwd(), 'downloads', suggestedFileName);
    await download.saveAs(savePath);

    expect(fs.existsSync(savePath)).toBeTruthy();
  });

  test('Успешная загрузка файла', async ({ page }) => {
    // 1. Подготавливаем локатор для инпута загрузки файла
    const uploadInput = page.locator('#uploadFile');

    // 2. Загружаем файл "на лету" из Buffer без создания физического файла в проекте
    await uploadInput.setInputFiles({
      name: 'test-file.txt',
      mimeType: 'text/plain',
      buffer: Buffer.from('Тестовое содержимое файла для DemoQA'),
    });

    // 3. Проверяем, что на странице отобразился путь с именем загруженного файла
    const uploadedFilePath = page.locator('#uploadedFilePath');
    await expect(uploadedFilePath).toBeVisible();
    await expect(uploadedFilePath).toContainText('test-file.txt');
  });
});
