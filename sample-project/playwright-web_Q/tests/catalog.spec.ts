import { test, expect } from '../src/fixtures/fixtures';
import { Users, SortOrder } from '../src/data/test-data';

test.describe('Product Catalog', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(Users.standard.username, Users.standard.password);
  });

  test('should display exactly 6 products', async ({ inventoryPage }) => {
    await inventoryPage.verifyProductCount(6);
  });

  test('should display products sorted by Name A-Z by default', async ({ inventoryPage }) => {
    const names = await inventoryPage.getProductNames();
    expect(names).toEqual(SortOrder.nameAZ);
  });

  test('should sort products by Name Z-A', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('za');
    const names = await inventoryPage.getProductNames();
    expect(names).toEqual(SortOrder.nameZA);
  });

  test('should sort products by Price Low to High', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('lohi');
    const names = await inventoryPage.getProductNames();
    expect(names).toEqual(SortOrder.priceLowHigh);
  });

  test('should sort products by Price High to Low', async ({ inventoryPage }) => {
    await inventoryPage.sortBy('hilo');
    const names = await inventoryPage.getProductNames();
    expect(names).toEqual(SortOrder.priceHighLow);
  });

  test('should navigate to product detail page when clicking product name', async ({ inventoryPage, productDetailPage }) => {
    await inventoryPage.clickProduct('Sauce Labs Backpack');
    await productDetailPage.verifyProductDetails('Sauce Labs Backpack', '$29.99');
  });

  test('should navigate back from product detail to inventory', async ({ inventoryPage, productDetailPage }) => {
    await inventoryPage.clickProduct('Sauce Labs Backpack');
    await productDetailPage.goBack();
    await inventoryPage.verifyProductCount(6);
  });
});
