import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage.ts';
import { TextBoxPage, UserData } from '../pages/textboxPage.ts';

test.describe('DemoQA - E2E заполнении формы Text Box', () => {
  test('Переход с главной страницы и успешное заполнении формы Text Box', async ({ page }) => {
    const homePage = new HomePage(page);
    const textBoxPage = new TextBoxPage(page);

    const testData: UserData = {
      fullName: 'Дмитрий QA',
      email: 'dmitry@example.com',
      currentAddress: 'г. Минск, ул. Ленина, д. 10',
      permanentAddress: 'г. Минск, ул. Пушкина, д. 25',
    };

    // 1. Заходим на главную страницу и проверяем загрузку
    await homePage.goto();
    await homePage.verifyPageLoaded();

    // 2. Переходим в раздел /elements по клику на карточку
    await homePage.openElementsSection();
    await expect(page).toHaveURL(/.*elements/);

    // 3. Переходим в подраздел Text Box
    await textBoxPage.selectTextBoxMenu();
    await expect(page).toHaveURL(/.*text-box/);

    // 4. Заполняем форму и отправляем
    await textBoxPage.fillForm(testData);
    await textBoxPage.submit();

    // 5. Проверяем результаты
    await textBoxPage.verifySubmittedData(testData);
  });

  test.skip('New test', () => {});
});
