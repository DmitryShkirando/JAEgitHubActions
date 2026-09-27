import { Page, Locator, expect } from '@playwright/test';

export interface UserData {
  fullName: string;
  email: string;
  currentAddress: string;
  permanentAddress: string;
}

export class TextBoxPage {
  readonly page: Page;

  // Локаторы бокового меню и формы
  readonly textBoxMenuItem: Locator;
  readonly fullNameInput: Locator;
  readonly emailInput: Locator;
  readonly currentAddressInput: Locator;
  readonly permanentAddressInput: Locator;
  readonly submitButton: Locator;

  // Локаторы блока с результатом (Output)
  readonly outputBlock: Locator;
  readonly nameOutput: Locator;
  readonly emailOutput: Locator;
  readonly currentAddressOutput: Locator;
  readonly permanentAddressOutput: Locator;

  constructor(page: Page) {
    this.page = page;

    // Меню слева
    this.textBoxMenuItem = page.getByText('Text Box');

    // Поля ввода
    this.fullNameInput = page.getByPlaceholder('Full Name');
    this.emailInput = page.getByPlaceholder('name@example.com');
    this.currentAddressInput = page.getByPlaceholder('Current Address');
    this.permanentAddressInput = page.locator('#permanentAddress');
    this.submitButton = page.getByRole('button', { name: 'Submit' });

    // Блок результатов
    this.outputBlock = page.locator('#output');
    this.nameOutput = this.outputBlock.locator('#name');
    this.emailOutput = this.outputBlock.locator('#email');
    this.currentAddressOutput = this.outputBlock.locator('#currentAddress');
    this.permanentAddressOutput = this.outputBlock.locator('#permanentAddress');
  }

  async selectTextBoxMenu() {
    await this.textBoxMenuItem.click();
  }

  async fillForm(data: UserData) {
    await this.fullNameInput.fill(data.fullName);
    await this.emailInput.fill(data.email);
    await this.currentAddressInput.fill(data.currentAddress);
    await this.permanentAddressInput.fill(data.permanentAddress);
  }

  async submit() {
    await this.submitButton.click();
  }

  async verifySubmittedData(data: UserData) {
    await expect(this.outputBlock).toBeVisible();
    await expect(this.nameOutput).toContainText(`Name:${data.fullName}`);
    await expect(this.emailOutput).toContainText(`Email:${data.email}`);
    await expect(this.currentAddressOutput).toContainText(
      `Current Address :${data.currentAddress}`,
    );
    await expect(this.permanentAddressOutput).toContainText(
      `Permananet Address :${data.permanentAddress}`,
    );
  }
}
