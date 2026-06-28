import { type Page, type Locator, expect } from '@playwright/test';

export class CheckoutStepTwoPage {
  readonly page: Page;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
  }

  async verifyTotals(subtotal: string, tax: string, total: string) {
    await expect(this.subtotalLabel).toContainText(subtotal);
    await expect(this.taxLabel).toContainText(tax);
    await expect(this.totalLabel).toContainText(total);
  }

  async finish() {
    await this.finishButton.click();
  }
}
