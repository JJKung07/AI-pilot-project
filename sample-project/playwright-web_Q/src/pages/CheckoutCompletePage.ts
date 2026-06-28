import { type Page, type Locator, expect } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly completeHeader: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async verifyOrderComplete() {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
  }

  async backToHome() {
    await this.backHomeButton.click();
  }
}
