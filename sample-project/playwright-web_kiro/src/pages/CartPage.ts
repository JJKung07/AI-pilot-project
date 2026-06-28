import { type Page, type Locator, expect } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async verifyOnCartPage(): Promise<void> {
    await expect(this.title).toHaveText('Your Cart');
    await expect(this.page).toHaveURL(/cart\.html/);
  }

  async getCartItemCount(): Promise<number> {
    return this.cartItems.count();
  }

  async getCartItemNames(): Promise<string[]> {
    const names = this.page.locator('[data-test="inventory-item-name"]');
    return names.allTextContents();
  }

  async removeItemByName(productName: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: productName });
    await item.locator('button:has-text("Remove")').click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }

  async verifyItemInCart(productName: string): Promise<void> {
    const item = this.cartItems.filter({ hasText: productName });
    await expect(item).toBeVisible();
  }

  async verifyCartEmpty(): Promise<void> {
    await expect(this.cartItems).toHaveCount(0);
  }
}
