import { test, expect } from '../src/fixtures/fixtures';
import { Users } from '../src/data/test-data';

test.describe('Shopping Cart', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(Users.standard.username, Users.standard.password);
  });

  test('should add item to cart from catalog and show badge', async ({ inventoryPage }) => {
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.verifyBadgeCount(1);
  });

  test('should add item to cart from product detail page', async ({ inventoryPage, productDetailPage }) => {
    await inventoryPage.clickProduct('Sauce Labs Bike Light');
    await productDetailPage.addToCart();
    await inventoryPage.verifyBadgeCount(1);
  });

  test('should add multiple items and update badge', async ({ inventoryPage }) => {
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.addToCartByName('Sauce Labs Bike Light');
    await inventoryPage.addToCartByName('Sauce Labs Onesie');
    await inventoryPage.verifyBadgeCount(3);
  });

  test('should remove item from catalog page and update badge', async ({ inventoryPage }) => {
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.verifyBadgeCount(1);
    await inventoryPage.removeFromCartByName('Sauce Labs Backpack');
    await inventoryPage.verifyBadgeNotVisible();
  });

  test('should remove item from cart page', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.goToCart();
    await cartPage.verifyItemCount(1);
    await cartPage.removeItem('Sauce Labs Backpack');
    await cartPage.verifyItemCount(0);
  });

  test('should display correct items in cart page', async ({ inventoryPage, cartPage }) => {
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.addToCartByName('Sauce Labs Fleece Jacket');
    await inventoryPage.goToCart();
    await cartPage.verifyItemCount(2);
    await cartPage.verifyItemExists('Sauce Labs Backpack');
    await cartPage.verifyItemExists('Sauce Labs Fleece Jacket');
  });

  test('should persist cart state after navigation', async ({ inventoryPage, productDetailPage }) => {
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.clickProduct('Sauce Labs Bike Light');
    await productDetailPage.goBack();
    await inventoryPage.verifyBadgeCount(1);
  });

  test('should continue shopping from cart page', async ({ inventoryPage, cartPage, page }) => {
    await inventoryPage.goToCart();
    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory\.html/);
  });
});
