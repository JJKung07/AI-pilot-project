import { test, expect } from '../src/fixtures/fixtures';
import { Users } from '../src/data/test-data';

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ loginPage, inventoryPage }) => {
    await loginPage.goto();
    await loginPage.login(Users.standard.username, Users.standard.password);
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.goToCart();
  });

  test.describe('Step 1 - Customer Information', () => {
    test('should proceed to step 2 with valid info', async ({ cartPage, checkoutStepOnePage, page }) => {
      await cartPage.checkout();
      await checkoutStepOnePage.fillInfo('John', 'Doe', '12345');
      await checkoutStepOnePage.continue();
      await expect(page).toHaveURL(/checkout-step-two\.html/);
    });

    test('should show error when First Name is missing', async ({ cartPage, checkoutStepOnePage }) => {
      await cartPage.checkout();
      await checkoutStepOnePage.fillInfo('', 'Doe', '12345');
      await checkoutStepOnePage.continue();
      await checkoutStepOnePage.verifyErrorMessage('First Name is required');
    });

    test('should show error when Last Name is missing', async ({ cartPage, checkoutStepOnePage }) => {
      await cartPage.checkout();
      await checkoutStepOnePage.fillInfo('John', '', '12345');
      await checkoutStepOnePage.continue();
      await checkoutStepOnePage.verifyErrorMessage('Last Name is required');
    });

    test('should show error when Postal Code is missing', async ({ cartPage, checkoutStepOnePage }) => {
      await cartPage.checkout();
      await checkoutStepOnePage.fillInfo('John', 'Doe', '');
      await checkoutStepOnePage.continue();
      await checkoutStepOnePage.verifyErrorMessage('Postal Code is required');
    });
  });

  test.describe('Step 2 - Order Overview', () => {
    test('should display correct totals for single item', async ({ cartPage, checkoutStepOnePage, checkoutStepTwoPage }) => {
      await cartPage.checkout();
      await checkoutStepOnePage.fillInfo('John', 'Doe', '12345');
      await checkoutStepOnePage.continue();
      await checkoutStepTwoPage.verifyTotals('$29.99', '$2.40', '$32.39');
    });
  });

  test.describe('Step 3 - Order Confirmation', () => {
    test('should complete order and show success message', async ({ cartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage }) => {
      await cartPage.checkout();
      await checkoutStepOnePage.fillInfo('John', 'Doe', '12345');
      await checkoutStepOnePage.continue();
      await checkoutStepTwoPage.finish();
      await checkoutCompletePage.verifyOrderComplete();
    });

    test('should clear cart after successful checkout', async ({ cartPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage, inventoryPage }) => {
      await cartPage.checkout();
      await checkoutStepOnePage.fillInfo('John', 'Doe', '12345');
      await checkoutStepOnePage.continue();
      await checkoutStepTwoPage.finish();
      await checkoutCompletePage.backToHome();
      await inventoryPage.verifyBadgeNotVisible();
    });
  });
});

test.describe('Checkout - Multiple Items', () => {
  test('should display correct totals for multiple items', async ({ loginPage, inventoryPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage }) => {
    await loginPage.goto();
    await loginPage.login(Users.standard.username, Users.standard.password);
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.addToCartByName('Sauce Labs Onesie');
    await inventoryPage.goToCart();
    await cartPage.checkout();
    await checkoutStepOnePage.fillInfo('John', 'Doe', '12345');
    await checkoutStepOnePage.continue();
    await checkoutStepTwoPage.verifyTotals('$37.98', '$3.04', '$41.02');
  });

  test('should display correct totals for all 6 items', async ({ loginPage, inventoryPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage }) => {
    await loginPage.goto();
    await loginPage.login(Users.standard.username, Users.standard.password);
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.addToCartByName('Sauce Labs Bike Light');
    await inventoryPage.addToCartByName('Sauce Labs Bolt T-Shirt');
    await inventoryPage.addToCartByName('Sauce Labs Fleece Jacket');
    await inventoryPage.addToCartByName('Sauce Labs Onesie');
    await inventoryPage.addToCartByName('Test.allTheThings() T-Shirt (Red)');
    await inventoryPage.goToCart();
    await cartPage.checkout();
    await checkoutStepOnePage.fillInfo('John', 'Doe', '12345');
    await checkoutStepOnePage.continue();
    await checkoutStepTwoPage.verifyTotals('$129.94', '$10.40', '$140.34');
  });
});
