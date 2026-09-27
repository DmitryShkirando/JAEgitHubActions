import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly elementsCard: Locator;
  readonly alertsFrameWindowsCard: Locator;

  constructor(page: Page) {
    this.page = page;
    // Локатор карточки/блока "Elements" на главной странице
    this.elementsCard = page.locator('.card').filter({ hasText: 'Elements' });
    this.alertsFrameWindowsCard = page
      .locator('.card')
      .filter({ hasText: 'Alerts, Frame & Windows' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async verifyPageLoaded() {
    // Проверяем, что главная страница загрузилась (карточка Elements видна)
    await expect(this.elementsCard).toBeVisible();
  }

  async openElementsSection() {
    await this.elementsCard.click();
  }

  async openAlertsFrameWindowsSection() {
    await this.alertsFrameWindowsCard.click();
  }
}
