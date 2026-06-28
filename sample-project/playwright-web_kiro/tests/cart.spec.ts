import { test, expect } from '../src/fixtures/fixtures';

test.describe('Shopping Cart', () => {
  test.beforeEach(async ({ loginPage, credentials }) => {
    await loginPage.navigate();
    await loginPage.login(credentials.standardUser, credentials.password);
  });

  test.describe('Add to Cart', () => {
    test('should add product from catalog and update badge', async ({
      inventoryPage,
    }) => {
      // Arrange - user is on inventory page with empty cart

      // Act
      await inventoryPage.addToCartByName('Sauce Labs Backpack');

      // Assert
      await inventoryPage.verifyCartBadgeCount(1);
    });

    test('should add multiple products and update badge count', async ({
      inventoryPage,
    }) => {
      // Arrange - user is on inventory page

      // Act
      await inventoryPage.addToCartByName('Sauce Labs Backpack');
      await inventoryPage.addToCartByName('Sauce Labs Bike Light');
      await inventoryPage.addToCartByName('Sauce Labs Onesie');

      // Assert
      await inventoryPage.verifyCartBadgeCount(3);
    });

    test('should add product from detail page', async ({
      inventoryPage,
      productDetailPage,
    }) => {
      // Arrange - navigate to product detail
      await inventoryPage.clickProduct('Sauce Labs Fleece Jacket');

      // Act
      await productDetailPage.addToCart();

      // Assert
      await productDetailPage.verifyRemoveVisible();
    });
  });

  test.describe('Remove from Cart', () => {
    test('should remove product from catalog page', async ({
      inventoryPage,
    }) => {
      // Arrange - add item first
      await inventoryPage.addToCartByName('Sauce Labs Backpack');
      await inventoryPage.verifyCartBadgeCount(1);

      // Act
      await inventoryPage.removeFromCartByName('Sauce Labs Backpack');

      // Assert
      await inventoryPage.verifyCartBadgeNotVisible();
    });

    test('should remove product from cart page', async ({
      inventoryPage,
      cartPage,
    }) => {
      // Arrange - add items and go to cart
      await inventoryPage.addToCartByName('Sauce Labs Backpack');
      await inventoryPage.addToCartByName('Sauce Labs Bike Light');
      await inventoryPage.goToCart();

      // Act
      await cartPage.removeItemByName('Sauce Labs Backpack');

      // Assert
      const count = await cartPage.getCartItemCount();
      expect(count).toBe(1);
    });
  });

  test.describe('Cart Page', () => {
    test('should display added items in cart', async ({
      inventoryPage,
      cartPage,
    }) => {
      // Arrange - add items
      await inventoryPage.addToCartByName('Sauce Labs Backpack');
      await inventoryPage.addToCartByName('Sauce Labs Bike Light');

      // Act
      await inventoryPage.goToCart();

      // Assert
      await cartPage.verifyOnCartPage();
      await cartPage.verifyItemInCart('Sauce Labs Backpack');
      await cartPage.verifyItemInCart('Sauce Labs Bike Light');
      const count = await cartPage.getCartItemCount();
      expect(count).toBe(2);
    });

    test('should show empty cart when no items added', async ({
      inventoryPage,
      cartPage,
    }) => {
      // Arrange - no items in cart

      // Act
      await inventoryPage.goToCart();

      // Assert
      await cartPage.verifyOnCartPage();
      await cartPage.verifyCartEmpty();
    });

    test('should navigate back to catalog with Continue Shopping', async ({
      inventoryPage,
      cartPage,
    }) => {
      // Arrange - go to cart
      await inventoryPage.goToCart();
      await cartPage.verifyOnCartPage();

      // Act
      await cartPage.continueShopping();

      // Assert
      await inventoryPage.verifyOnInventoryPage();
    });

    test('should persist cart state across navigation', async ({
      inventoryPage,
      productDetailPage,
      cartPage,
    }) => {
      // Arrange - add item from catalog
      await inventoryPage.addToCartByName('Sauce Labs Backpack');

      // Act - navigate to detail page and back
      await inventoryPage.clickProduct('Sauce Labs Bike Light');
      await productDetailPage.goBackToProducts();

      // Assert - badge still shows 1
      await inventoryPage.verifyCartBadgeCount(1);

      // Act - go to cart page
      await inventoryPage.goToCart();

      // Assert - item still in cart
      await cartPage.verifyItemInCart('Sauce Labs Backpack');
    });
  });
});
