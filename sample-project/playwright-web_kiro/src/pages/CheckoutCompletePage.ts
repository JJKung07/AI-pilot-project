import { type Page, type Locator, expect } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly title: Locator;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;
  readonly ponyExpressImage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
    this.ponyExpressImage = page.locator('[data-test="pony-express"]');
  }

  async verifyOnCompletePage(): Promise<void> {
    await expect(this.title).toHaveText('Checkout: Complete!');
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
  }

  async verifyOrderConfirmation(): Promise<void> {
    await expect(this.completeHeader).toHaveText('Thank you for your order!');
    await expect(this.completeText).toBeVisible();
    await expect(this.ponyExpressImage).toBeVisible();
  }

  async clickBackHome(): Promise<void> {
    await this.backHomeButton.click();
  }
}
