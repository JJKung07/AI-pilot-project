import { type Page, type Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly burgerMenu: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.burgerMenu = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
  }

  async verifyProductCount(count: number) {
    await expect(this.inventoryItems).toHaveCount(count);
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    return this.page.locator('[data-test="inventory-item-name"]').allTextContents();
  }

  async addToCartByName(productName: string) {
    const item = this.inventoryItems.filter({ hasText: productName });
    await item.locator('button:has-text("Add to cart")').click();
  }

  async removeFromCartByName(productName: string) {
    const item = this.inventoryItems.filter({ hasText: productName });
    await item.locator('button:has-text("Remove")').click();
  }

  async clickProduct(productName: string) {
    await this.page.locator('[data-test="inventory-item-name"]', { hasText: productName }).click();
  }

  async goToCart() {
    await this.cartLink.click();
  }

  async verifyBadgeCount(count: number) {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async verifyBadgeNotVisible() {
    await expect(this.cartBadge).not.toBeVisible();
  }

  async logout() {
    await this.burgerMenu.click();
    await this.logoutLink.click();
  }
}
