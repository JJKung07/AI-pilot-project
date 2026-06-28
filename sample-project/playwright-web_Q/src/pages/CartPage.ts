import { type Page, type Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async verifyItemCount(count: number) {
    await expect(this.cartItems).toHaveCount(count);
  }

  async verifyItemExists(productName: string) {
    await expect(this.cartItems.filter({ hasText: productName })).toBeVisible();
  }

  async removeItem(productName: string) {
    const item = this.cartItems.filter({ hasText: productName });
    await item.locator('button:has-text("Remove")').click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}
