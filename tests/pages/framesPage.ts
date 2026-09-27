import { Page, Locator, expect } from '@playwright/test';

export class FramesPage {
  readonly page: Page;

  // Меню слева
  readonly framesMenuItem: Locator;

  // Локаторы для ифреймов
  readonly sampleFrame1: Locator;

  constructor(page: Page) {
    this.page = page;

    this.framesMenuItem = page.locator(
      "//span[contains(text(), 'Frames')][not(contains(text(), 'Nested'))]",
    );

    this.sampleFrame1 = page
      .frameLocator('//iframe[@id="frame1"]')
      .locator('//h1[@id="sampleHeading"]');
  }

  async selectFramesMenu() {
    await this.framesMenuItem.click();
  }

  async verifyFrame1Content(expectedText: string) {
    // Проверяем текст внутри элемента #sampleHeading, расположенного в первом фрейме
    await expect(this.sampleFrame1).toBeVisible();
    await expect(this.sampleFrame1).toHaveText(expectedText);
  }
}
