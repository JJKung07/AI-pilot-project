import { type Page, type Locator, expect } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly productImage: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.productDescription = page.locator('[data-test="inventory-item-desc"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    this.productImage = page.locator('img.inventory_details_img');
    this.addToCartButton = page.locator('button:has-text("Add to cart")');
    this.removeButton = page.locator('button:has-text("Remove")');
    this.backButton = page.locator('[data-test="back-to-products"]');
  }

  async verifyProductDetails(name: string, price: string): Promise<void> {
    await expect(this.productName).toHaveText(name);
    await expect(this.productPrice).toHaveText(price);
    await expect(this.productImage).toBeVisible();
    await expect(this.productDescription).toBeVisible();
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async removeFromCart(): Promise<void> {
    await this.removeButton.click();
  }

  async goBackToProducts(): Promise<void> {
    await this.backButton.click();
  }

  async verifyAddToCartVisible(): Promise<void> {
    await expect(this.addToCartButton).toBeVisible();
  }

  async verifyRemoveVisible(): Promise<void> {
    await expect(this.removeButton).toBeVisible();
  }
}
