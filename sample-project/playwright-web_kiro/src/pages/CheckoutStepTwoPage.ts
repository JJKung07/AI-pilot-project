import { type Page, type Locator, expect } from '@playwright/test';

export class CheckoutStepTwoPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartItems: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
    this.taxLabel = page.locator('[data-test="tax-label"]');
    this.totalLabel = page.locator('[data-test="total-label"]');
    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
  }

  async verifyOnCheckoutStepTwo(): Promise<void> {
    await expect(this.title).toHaveText('Checkout: Overview');
    await expect(this.page).toHaveURL(/checkout-step-two\.html/);
  }

  async getItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async getSubtotal(): Promise<string> {
    const text = await this.subtotalLabel.textContent();
    return text?.replace('Item total: ', '') || '';
  }

  async getTax(): Promise<string> {
    const text = await this.taxLabel.textContent();
    return text?.replace('Tax: ', '') || '';
  }

  async getTotal(): Promise<string> {
    const text = await this.totalLabel.textContent();
    return text?.replace('Total: ', '') || '';
  }

  async verifySubtotal(expected: string): Promise<void> {
    await expect(this.subtotalLabel).toContainText(expected);
  }

  async verifyTax(expected: string): Promise<void> {
    await expect(this.taxLabel).toContainText(expected);
  }

  async verifyTotal(expected: string): Promise<void> {
    await expect(this.totalLabel).toContainText(expected);
  }

  async clickFinish(): Promise<void> {
    await this.finishButton.click();
  }

  async clickCancel(): Promise<void> {
    await this.cancelButton.click();
  }
}
