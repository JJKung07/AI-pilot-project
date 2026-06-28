import { expect, test } from '../src/fixtures/fixtures_coPilot';

test.describe('Product Catalog', () => {
  test.beforeEach(async ({ loginPage, testData }) => {
    await loginPage.navigate();
    await loginPage.login(testData.users.standardUser, testData.users.password);
  });

  test('catalog shows exactly 6 products', async ({ inventoryPage }) => {
    // Arrange
    // Act
    await inventoryPage.verifyLoaded();

    // Assert
    await inventoryPage.verifyProductCount(6);
  });

  test('each product card shows title, description, image, and price', async ({ inventoryPage, testData }) => {
    // Arrange
    // Act
    await inventoryPage.verifyLoaded();

    // Assert
    await inventoryPage.verifyProductCard(testData.products.backpack.name, testData.products.backpack.descriptionSnippet, testData.products.backpack.price);
    await inventoryPage.verifyProductCard(testData.products.bikeLight.name, testData.products.bikeLight.descriptionSnippet, testData.products.bikeLight.price);
    await inventoryPage.verifyProductCard(testData.products.boltTShirt.name, testData.products.boltTShirt.descriptionSnippet, testData.products.boltTShirt.price);
    await inventoryPage.verifyProductCard(testData.products.fleeceJacket.name, testData.products.fleeceJacket.descriptionSnippet, testData.products.fleeceJacket.price);
    await inventoryPage.verifyProductCard(testData.products.onesie.name, testData.products.onesie.descriptionSnippet, testData.products.onesie.price);
    await inventoryPage.verifyProductCard(testData.products.redTShirt.name, testData.products.redTShirt.descriptionSnippet, testData.products.redTShirt.price);
  });

  test('default sort order is Name A-Z', async ({ inventoryPage, testData }) => {
    // Arrange
    // Act
    await inventoryPage.verifyLoaded();

    // Assert
    await inventoryPage.verifyProductOrder(testData.sortOrders.nameAz);
  });

  test('sort by Name Z-A', async ({ inventoryPage, testData }) => {
    // Arrange
    // Act
    await inventoryPage.sortBy('za');

    // Assert
    await inventoryPage.verifyProductOrder(testData.sortOrders.nameZa);
  });

  test('sort by Price Low-High', async ({ inventoryPage, testData }) => {
    // Arrange
    // Act
    await inventoryPage.sortBy('lohi');

    // Assert
    await inventoryPage.verifyProductOrder(testData.sortOrders.priceLowHigh);
  });

  test('sort by Price High-Low', async ({ inventoryPage, testData }) => {
    // Arrange
    // Act
    await inventoryPage.sortBy('hilo');

    // Assert
    await inventoryPage.verifyProductOrder(testData.sortOrders.priceHighLow);
  });

  test('clicking a product title opens the correct detail page', async ({ inventoryPage, productDetailPage, testData }) => {
    // Arrange
    // Act
    await inventoryPage.clickProductTitle(testData.products.backpack.name);

    // Assert
    await productDetailPage.verifyProductDetails(
      testData.products.backpack.name,
      testData.products.backpack.descriptionSnippet,
      testData.products.backpack.price,
    );
  });

  test('clicking a product image opens the correct detail page', async ({ inventoryPage, productDetailPage, testData }) => {
    // Arrange
    // Act
    await inventoryPage.clickProductImage(testData.products.bikeLight.name);

    // Assert
    await productDetailPage.verifyProductDetails(
      testData.products.bikeLight.name,
      testData.products.bikeLight.descriptionSnippet,
      testData.products.bikeLight.price,
    );
  });
});
