import { expect, type Locator, type Page } from '@playwright/test';

export class ProductDetailPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = this.page.locator('.inventory_details_name');
    this.productDescription = this.page.locator('.inventory_details_desc');
    this.productPrice = this.page.locator('.inventory_details_price');
    this.addToCartButton = this.page.getByRole('button', { name: 'Add to cart' });
    this.removeButton = this.page.getByRole('button', { name: 'Remove' });
    this.backButton = this.page.locator('#back-to-products');
  }

  async verifyProductDetails(name: string, descriptionSnippet: string, price: string): Promise<void> {
    await expect(this.productName).toHaveText(name);
    await expect(this.productDescription).toContainText(descriptionSnippet);
    await expect(this.productPrice).toHaveText(price);
  }

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
  }

  async removeFromCart(): Promise<void> {
    await this.removeButton.click();
  }

  async backToProducts(): Promise<void> {
    await this.backButton.click();
  }
}
