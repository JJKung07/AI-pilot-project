import { type Page, type Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly inventoryItems: Locator;
  readonly sortDropdown: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly burgerMenuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.locator('[data-test="title"]');
    this.inventoryItems = page.locator('[data-test="inventory-item"]');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    this.burgerMenuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.locator('[data-test="logout-sidebar-link"]');
  }

  async verifyOnInventoryPage(): Promise<void> {
    await expect(this.title).toHaveText('Products');
    await expect(this.page).toHaveURL(/inventory\.html/);
  }

  async getProductCount(): Promise<number> {
    return this.inventoryItems.count();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo'): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async getProductNames(): Promise<string[]> {
    const names = this.page.locator('[data-test="inventory-item-name"]');
    return names.allTextContents();
  }

  async getProductPrices(): Promise<number[]> {
    const prices = this.page.locator('[data-test="inventory-item-price"]');
    const texts = await prices.allTextContents();
    return texts.map((text) => parseFloat(text.replace('$', '')));
  }

  async addToCartByName(productName: string): Promise<void> {
    const item = this.inventoryItems.filter({ hasText: productName });
    await item.locator('button:has-text("Add to cart")').click();
  }

  async removeFromCartByName(productName: string): Promise<void> {
    const item = this.inventoryItems.filter({ hasText: productName });
    await item.locator('button:has-text("Remove")').click();
  }

  async getCartBadgeCount(): Promise<number> {
    const isVisible = await this.cartBadge.isVisible();
    if (!isVisible) return 0;
    const text = await this.cartBadge.textContent();
    return parseInt(text || '0', 10);
  }

  async goToCart(): Promise<void> {
    await this.cartLink.click();
  }

  async clickProduct(productName: string): Promise<void> {
    await this.page.locator('[data-test="inventory-item-name"]', { hasText: productName }).click();
  }

  async logout(): Promise<void> {
    await this.burgerMenuButton.click();
    await this.logoutLink.click();
  }

  async verifyCartBadgeNotVisible(): Promise<void> {
    await expect(this.cartBadge).not.toBeVisible();
  }

  async verifyCartBadgeCount(expectedCount: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(String(expectedCount));
  }
}
