import { type Page, type Locator, expect } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;
  readonly productImage: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('[data-test="inventory-item-name"]');
    this.productPrice = page.locator('[data-test="inventory-item-price"]');
    this.productDescription = page.locator('[data-test="inventory-item-desc"]');
    this.productImage = page.locator('img.inventory_details_img');
    this.addToCartButton = page.locator('button:has-text("Add to cart")');
    this.removeButton = page.locator('button:has-text("Remove")');
    this.backButton = page.locator('[data-test="back-to-products"]');
  }

  async verifyProductDetails(name: string, price: string) {
    await expect(this.productName).toHaveText(name);
    await expect(this.productPrice).toHaveText(price);
  }

  async addToCart() {
    await this.addToCartButton.click();
  }

  async goBack() {
    await this.backButton.click();
  }
}
