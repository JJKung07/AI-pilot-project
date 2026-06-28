import { test, expect } from '../src/fixtures/fixtures';

test.describe('Product Catalog', () => {
  test.beforeEach(async ({ loginPage, credentials }) => {
    await loginPage.navigate();
    await loginPage.login(credentials.standardUser, credentials.password);
  });

  test.describe('Product Display', () => {
    test('should display exactly 6 products', async ({ inventoryPage }) => {
      // Arrange - user is on inventory page

      // Act
      const count = await inventoryPage.getProductCount();

      // Assert
      expect(count).toBe(6);
    });

    test('should display products with default sort Name A-Z', async ({
      inventoryPage,
    }) => {
      // Arrange - user is on inventory page (default sort)

      // Act
      const names = await inventoryPage.getProductNames();

      // Assert
      expect(names[0]).toBe('Sauce Labs Backpack');
      expect(names[names.length - 1]).toBe('Test.allTheThings() T-Shirt (Red)');
    });
  });

  test.describe('Sorting', () => {
    test('should sort products by Name A-Z', async ({ inventoryPage }) => {
      // Arrange - user is on inventory page

      // Act
      await inventoryPage.sortBy('az');
      const names = await inventoryPage.getProductNames();

      // Assert
      const sorted = [...names].sort((a, b) => a.localeCompare(b));
      expect(names).toEqual(sorted);
    });

    test('should sort products by Name Z-A', async ({ inventoryPage }) => {
      // Arrange - user is on inventory page

      // Act
      await inventoryPage.sortBy('za');
      const names = await inventoryPage.getProductNames();

      // Assert
      expect(names[0]).toBe('Test.allTheThings() T-Shirt (Red)');
      expect(names[names.length - 1]).toBe('Sauce Labs Backpack');
    });

    test('should sort products by Price Low to High', async ({
      inventoryPage,
    }) => {
      // Arrange - user is on inventory page

      // Act
      await inventoryPage.sortBy('lohi');
      const prices = await inventoryPage.getProductPrices();

      // Assert
      expect(prices[0]).toBe(7.99);
      expect(prices[prices.length - 1]).toBe(49.99);
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).toEqual(sorted);
    });

    test('should sort products by Price High to Low', async ({
      inventoryPage,
    }) => {
      // Arrange - user is on inventory page

      // Act
      await inventoryPage.sortBy('hilo');
      const prices = await inventoryPage.getProductPrices();

      // Assert
      expect(prices[0]).toBe(49.99);
      expect(prices[prices.length - 1]).toBe(7.99);
      const sorted = [...prices].sort((a, b) => b - a);
      expect(prices).toEqual(sorted);
    });
  });

  test.describe('Product Detail', () => {
    test('should navigate to product detail page', async ({
      inventoryPage,
      productDetailPage,
    }) => {
      // Arrange - user is on inventory page

      // Act
      await inventoryPage.clickProduct('Sauce Labs Backpack');

      // Assert
      await productDetailPage.verifyProductDetails(
        'Sauce Labs Backpack',
        '$29.99'
      );
    });

    test('should navigate back from detail to catalog', async ({
      inventoryPage,
      productDetailPage,
    }) => {
      // Arrange - navigate to detail page
      await inventoryPage.clickProduct('Sauce Labs Backpack');
      await productDetailPage.verifyProductDetails(
        'Sauce Labs Backpack',
        '$29.99'
      );

      // Act
      await productDetailPage.goBackToProducts();

      // Assert
      await inventoryPage.verifyOnInventoryPage();
    });
  });
});
