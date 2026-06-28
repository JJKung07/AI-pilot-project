import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = this.page.locator('.complete-header');
    this.completeText = this.page.locator('.complete-text');
    this.backHomeButton = this.page.getByRole('link', { name: 'Back Home' });
    this.title = this.page.locator('.title');
  }

  async verifyLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Checkout: Complete!');
  }

  async verifySuccessMessage(): Promise<void> {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }

  async backHome(): Promise<void> {
    await this.backHomeButton.click();
  }
}
