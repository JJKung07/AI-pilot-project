import { expect, type Locator, type Page } from '@playwright/test';

export type SortOptionValue = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly sortSelect: Locator;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly inventoryTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = this.page.locator('.inventory_item');
    this.sortSelect = this.page.locator('.product_sort_container');
    this.cartLink = this.page.locator('.shopping_cart_link');
    this.cartBadge = this.page.locator('.shopping_cart_badge');
    this.menuButton = this.page.locator('#react-burger-menu-btn');
    this.logoutLink = this.page.locator('#logout_sidebar_link');
    this.inventoryTitle = this.page.locator('.title');
  }

  private productCard(name: string): Locator {
    return this.page.locator('.inventory_item').filter({ hasText: name });
  }

  async verifyLoaded(): Promise<void> {
    await expect(this.inventoryTitle).toHaveText('Products');
    await expect(this.inventoryItems).toHaveCount(6);
  }

  async verifyProductCount(expectedCount: number): Promise<void> {
    await expect(this.inventoryItems).toHaveCount(expectedCount);
  }

  async verifyProductCard(name: string, descriptionSnippet: string, price: string): Promise<void> {
    const card = this.productCard(name);
    await expect(card.locator('.inventory_item_name')).toHaveText(name);
    await expect(card.locator('.inventory_item_desc')).toContainText(descriptionSnippet);
    await expect(card.locator('.inventory_item_price')).toHaveText(price);
  }

  async verifyProductOrder(expectedNames: readonly string[]): Promise<void> {
    const names = this.page.locator('.inventory_item_name');
    await expect(names).toHaveText([...expectedNames]);
  }

  async sortBy(option: SortOptionValue): Promise<void> {
    await this.sortSelect.selectOption(option);
  }

  async clickProductTitle(name: string): Promise<void> {
    await this.productCard(name).locator('.inventory_item_name').click();
  }

  async clickProductImage(name: string): Promise<void> {
    await this.productCard(name).locator('.inventory_item_img a').click();
  }

  async addProductToCart(name: string): Promise<void> {
    await this.productCard(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeProductFromCart(name: string): Promise<void> {
    await this.productCard(name).getByRole('button', { name: 'Remove' }).click();
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async openMenu(): Promise<void> {
    await this.menuButton.click();
  }

  async logout(): Promise<void> {
    await this.openMenu();
    await this.logoutLink.click();
  }

  async verifyBadgeCount(expectedCount: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(String(expectedCount));
  }

  async verifyBadgeHidden(): Promise<void> {
    await expect(this.cartBadge).toBeHidden();
  }
}
