import { test, expect } from '../src/fixtures/fixtures';

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ loginPage, inventoryPage, credentials }) => {
    await loginPage.navigate();
    await loginPage.login(credentials.standardUser, credentials.password);
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.goToCart();
  });

  test.describe('Step 1 - Customer Information', () => {
    test('should proceed to step 2 with valid information', async ({
      cartPage,
      checkoutStepOnePage,
      checkoutStepTwoPage,
    }) => {
      // Arrange - go to checkout
      await cartPage.proceedToCheckout();
      await checkoutStepOnePage.verifyOnCheckoutStepOne();

      // Act
      await checkoutStepOnePage.submitInformation('John', 'Doe', '12345');

      // Assert
      await checkoutStepTwoPage.verifyOnCheckoutStepTwo();
    });

    test('should show error when First Name is missing', async ({
      cartPage,
      checkoutStepOnePage,
    }) => {
      // Arrange
      await cartPage.proceedToCheckout();

      // Act
      await checkoutStepOnePage.submitInformation('', 'Doe', '12345');

      // Assert
      await checkoutStepOnePage.verifyErrorMessage('First Name is required');
    });

    test('should show error when Last Name is missing', async ({
      cartPage,
      checkoutStepOnePage,
    }) => {
      // Arrange
      await cartPage.proceedToCheckout();

      // Act
      await checkoutStepOnePage.submitInformation('John', '', '12345');

      // Assert
      await checkoutStepOnePage.verifyErrorMessage('Last Name is required');
    });

    test('should show error when Postal Code is missing', async ({
      cartPage,
      checkoutStepOnePage,
    }) => {
      // Arrange
      await cartPage.proceedToCheckout();

      // Act
      await checkoutStepOnePage.submitInformation('John', 'Doe', '');

      // Assert
      await checkoutStepOnePage.verifyErrorMessage('Postal Code is required');
    });

    test('should cancel and return to cart', async ({
      cartPage,
      checkoutStepOnePage,
    }) => {
      // Arrange
      await cartPage.proceedToCheckout();
      await checkoutStepOnePage.verifyOnCheckoutStepOne();

      // Act
      await checkoutStepOnePage.clickCancel();

      // Assert
      await cartPage.verifyOnCartPage();
    });
  });

  test.describe('Step 2 - Order Overview', () => {
    test('should display correct totals for single item', async ({
      cartPage,
      checkoutStepOnePage,
      checkoutStepTwoPage,
    }) => {
      // Arrange
      await cartPage.proceedToCheckout();
      await checkoutStepOnePage.submitInformation('John', 'Doe', '12345');

      // Act - verify on overview page

      // Assert
      await checkoutStepTwoPage.verifyOnCheckoutStepTwo();
      await checkoutStepTwoPage.verifySubtotal('$29.99');
      await checkoutStepTwoPage.verifyTax('$2.40');
      await checkoutStepTwoPage.verifyTotal('$32.39');
    });

    test('should display correct item count', async ({
      cartPage,
      checkoutStepOnePage,
      checkoutStepTwoPage,
    }) => {
      // Arrange
      await cartPage.proceedToCheckout();
      await checkoutStepOnePage.submitInformation('Jane', 'Smith', '99999');

      // Act
      const itemCount = await checkoutStepTwoPage.getItemCount();

      // Assert
      expect(itemCount).toBe(1);
    });

    test('should cancel and return to inventory', async ({
      cartPage,
      checkoutStepOnePage,
      checkoutStepTwoPage,
      inventoryPage,
    }) => {
      // Arrange
      await cartPage.proceedToCheckout();
      await checkoutStepOnePage.submitInformation('John', 'Doe', '12345');
      await checkoutStepTwoPage.verifyOnCheckoutStepTwo();

      // Act
      await checkoutStepTwoPage.clickCancel();

      // Assert
      await inventoryPage.verifyOnInventoryPage();
    });
  });

  test.describe('Step 3 - Order Confirmation', () => {
    test('should complete checkout and show confirmation', async ({
      cartPage,
      checkoutStepOnePage,
      checkoutStepTwoPage,
      checkoutCompletePage,
    }) => {
      // Arrange
      await cartPage.proceedToCheckout();
      await checkoutStepOnePage.submitInformation('John', 'Doe', '12345');
      await checkoutStepTwoPage.verifyOnCheckoutStepTwo();

      // Act
      await checkoutStepTwoPage.clickFinish();

      // Assert
      await checkoutCompletePage.verifyOnCompletePage();
      await checkoutCompletePage.verifyOrderConfirmation();
    });

    test('should clear cart after successful checkout', async ({
      cartPage,
      checkoutStepOnePage,
      checkoutStepTwoPage,
      checkoutCompletePage,
      inventoryPage,
    }) => {
      // Arrange
      await cartPage.proceedToCheckout();
      await checkoutStepOnePage.submitInformation('John', 'Doe', '12345');
      await checkoutStepTwoPage.clickFinish();
      await checkoutCompletePage.verifyOnCompletePage();

      // Act
      await checkoutCompletePage.clickBackHome();

      // Assert - cart should be empty
      await inventoryPage.verifyCartBadgeNotVisible();
    });
  });
});

test.describe('Checkout - Multiple Items', () => {
  test('should calculate correct totals for multiple items', async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    credentials,
  }) => {
    // Arrange - add 2 items
    await loginPage.navigate();
    await loginPage.login(credentials.standardUser, credentials.password);
    await inventoryPage.addToCartByName('Sauce Labs Backpack');
    await inventoryPage.addToCartByName('Sauce Labs Bike Light');
    await inventoryPage.goToCart();

    // Act
    await cartPage.proceedToCheckout();
    await checkoutStepOnePage.submitInformation('John', 'Doe', '12345');

    // Assert - $29.99 + $9.99 = $39.98, tax 8% = $3.20, total = $43.18
    await checkoutStepTwoPage.verifySubtotal('$39.98');
    await checkoutStepTwoPage.verifyTax('$3.20');
    await checkoutStepTwoPage.verifyTotal('$43.18');
  });
});
