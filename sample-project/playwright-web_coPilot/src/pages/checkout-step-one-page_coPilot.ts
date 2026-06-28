import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutStepOnePage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly errorMessage: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = this.page.locator('#first-name');
    this.lastNameInput = this.page.locator('#last-name');
    this.postalCodeInput = this.page.locator('#postal-code');
    this.continueButton = this.page.getByRole('button', { name: 'Continue' });
    this.cancelButton = this.page.getByRole('button', { name: 'Cancel' });
    this.errorMessage = this.page.locator('[data-test="error"]');
    this.title = this.page.locator('.title');
  }

  async verifyLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Checkout: Your Information');
  }

  async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continue(): Promise<void> {
    await this.continueButton.click();
  }

  async verifyErrorMessage(message: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(message);
  }
}
