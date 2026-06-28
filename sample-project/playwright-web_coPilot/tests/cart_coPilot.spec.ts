import { expect, test } from '../src/fixtures/fixtures_coPilot';

test.describe('Cart Operations', () => {
  test.beforeEach(async ({ loginPage, testData }) => {
    await loginPage.navigate();
    await loginPage.login(testData.users.standardUser, testData.users.password);
  });

  test('adding a product from the catalog updates badge and button', async ({ inventoryPage, testData }) => {
    // Arrange
    // Act
    await inventoryPage.addProductToCart(testData.products.backpack.name);

    // Assert
    await inventoryPage.verifyBadgeCount(1);
    await expect(inventoryPage.page.getByRole('button', { name: 'Remove' })).toBeVisible();
  });

  test('adding a product from the detail page updates badge', async ({ inventoryPage, productDetailPage, testData }) => {
    // Arrange
    await inventoryPage.clickProductTitle(testData.products.backpack.name);

    // Act
    await productDetailPage.addToCart();

    // Assert
    await inventoryPage.verifyBadgeCount(1);
  });

  test('removing a product from the catalog returns the button to Add to cart', async ({ inventoryPage, testData }) => {
    // Arrange
    await inventoryPage.addProductToCart(testData.products.backpack.name);

    // Act
    await inventoryPage.removeProductFromCart(testData.products.backpack.name);

    // Assert
    await inventoryPage.verifyBadgeHidden();
  });

  test('removing a product from the detail page clears the cart state', async ({ inventoryPage, productDetailPage, testData }) => {
    // Arrange
    await inventoryPage.clickProductTitle(testData.products.backpack.name);
    await productDetailPage.addToCart();

    // Act
    await productDetailPage.removeFromCart();

    // Assert
    await inventoryPage.verifyBadgeHidden();
  });

  test('removing a product from the cart page deletes the row', async ({ inventoryPage, cartPage, testData }) => {
    // Arrange
    await inventoryPage.addProductToCart(testData.products.backpack.name);
    await inventoryPage.openCart();
    await cartPage.verifyLoaded();

    // Act
    await cartPage.removeItem(testData.products.backpack.name);

    // Assert
    await cartPage.verifyEmpty();
  });

  test('continue shopping returns to the inventory page', async ({ inventoryPage, cartPage, testData, page }) => {
    // Arrange
    await inventoryPage.addProductToCart(testData.products.backpack.name);
    await inventoryPage.openCart();

    // Act
    await cartPage.continueShopping();

    // Assert
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('cart badge reflects two unique items', async ({ inventoryPage, testData }) => {
    // Arrange
    await inventoryPage.addProductToCart(testData.products.backpack.name);
    await inventoryPage.addProductToCart(testData.products.bikeLight.name);

    // Act
    // Assert
    await inventoryPage.verifyBadgeCount(2);
  });

  test('cart state persists across navigation', async ({ inventoryPage, cartPage, testData }) => {
    // Arrange
    await inventoryPage.addProductToCart(testData.products.backpack.name);

    // Act
    await inventoryPage.openCart();
    await cartPage.verifyLoaded();
    await cartPage.continueShopping();

    // Assert
    await inventoryPage.verifyBadgeCount(1);
    await inventoryPage.verifyLoaded();
  });

  test('cart page shows empty state when no items are selected', async ({ inventoryPage, cartPage }) => {
    // Arrange
    await inventoryPage.openCart();

    // Act
    await cartPage.verifyLoaded();

    // Assert
    await cartPage.verifyEmpty();
  });
});
