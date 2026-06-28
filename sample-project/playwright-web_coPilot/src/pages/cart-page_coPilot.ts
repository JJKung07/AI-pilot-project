import { expect, type Locator, type Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly cartTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = this.page.locator('.cart_item');
    this.itemNames = this.page.locator('.cart_item .inventory_item_name');
    this.itemPrices = this.page.locator('.cart_item .inventory_item_price');
    this.checkoutButton = this.page.getByRole('button', { name: 'Checkout' });
    this.continueShoppingButton = this.page.getByRole('button', { name: 'Continue Shopping' });
    this.cartTitle = this.page.locator('.title');
  }

  private cartItem(name: string): Locator {
    return this.page.locator('.cart_item').filter({ hasText: name });
  }

  async verifyLoaded(): Promise<void> {
    await expect(this.cartTitle).toHaveText('Your Cart');
  }

  async verifyItemCount(expectedCount: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(expectedCount);
  }

  async verifyEmpty(): Promise<void> {
    await expect(this.cartItems).toHaveCount(0);
  }

  async verifyItemPresent(name: string, price: string): Promise<void> {
    const item = this.cartItem(name);
    await expect(item.locator('.inventory_item_name')).toHaveText(name);
    await expect(item.locator('.inventory_item_price')).toHaveText(price);
  }

  async removeItem(name: string): Promise<void> {
    await this.cartItem(name).getByRole('button', { name: 'Remove' }).click();
  }

  async checkout(): Promise<void> {
    await this.checkoutButton.click();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton.click();
  }
}
