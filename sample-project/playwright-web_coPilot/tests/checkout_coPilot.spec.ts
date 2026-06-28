import { expect, test } from '../src/fixtures/fixtures_coPilot';

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ loginPage, inventoryPage, testData }) => {
    await loginPage.navigate();
    await loginPage.login(testData.users.standardUser, testData.users.password);
    await inventoryPage.addProductToCart(testData.products.backpack.name);
    await inventoryPage.openCart();
    await inventoryPage.checkout();
  });

  test('checkout step 1 accepts valid customer information', async ({ checkoutStepOnePage, testData, page }) => {
    // Arrange
    await checkoutStepOnePage.verifyLoaded();

    // Act
    await checkoutStepOnePage.fillInformation(testData.checkout.firstName, testData.checkout.lastName, testData.checkout.postalCode);
    await checkoutStepOnePage.continue();

    // Assert
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
  });

  test('checkout step 1 rejects missing first name', async ({ checkoutStepOnePage, testData }) => {
    // Arrange
    await checkoutStepOnePage.verifyLoaded();

    // Act
    await checkoutStepOnePage.fillInformation('', testData.checkout.lastName, testData.checkout.postalCode);
    await checkoutStepOnePage.continue();

    // Assert
    await checkoutStepOnePage.verifyErrorMessage('Error: First Name is required');
  });

  test('checkout step 1 rejects missing last name', async ({ checkoutStepOnePage, testData }) => {
    // Arrange
    await checkoutStepOnePage.verifyLoaded();

    // Act
    await checkoutStepOnePage.fillInformation(testData.checkout.firstName, '', testData.checkout.postalCode);
    await checkoutStepOnePage.continue();

    // Assert
    await checkoutStepOnePage.verifyErrorMessage('Error: Last Name is required');
  });

  test('checkout step 1 rejects missing postal code', async ({ checkoutStepOnePage, testData }) => {
    // Arrange
    await checkoutStepOnePage.verifyLoaded();

    // Act
    await checkoutStepOnePage.fillInformation(testData.checkout.firstName, testData.checkout.lastName, '');
    await checkoutStepOnePage.continue();

    // Assert
    await checkoutStepOnePage.verifyErrorMessage('Error: Postal Code is required');
  });

  test('checkout step 2 displays item total, tax, and final total', async ({ checkoutStepOnePage, checkoutStepTwoPage, testData, page }) => {
    // Arrange
    await checkoutStepOnePage.verifyLoaded();
    await checkoutStepOnePage.fillInformation(testData.checkout.firstName, testData.checkout.lastName, testData.checkout.postalCode);

    // Act
    await checkoutStepOnePage.continue();

    // Assert
    await checkoutStepTwoPage.verifyLoaded();
    await checkoutStepTwoPage.verifyItemCount(1);
    await checkoutStepTwoPage.verifySummary('$29.99', '$2.40', '$32.39');
    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
  });

  test('checkout step 2 rounds tax correctly for a boundary subtotal', async ({ inventoryPage, checkoutStepOnePage, checkoutStepTwoPage, testData }) => {
    // Arrange
    await expect(checkoutStepOnePage.page).toHaveURL(/.*checkout-step-one\.html/);
    await checkoutStepOnePage.verifyLoaded();
    await checkoutStepOnePage.fillInformation(testData.checkout.firstName, testData.checkout.lastName, testData.checkout.postalCode);
    await checkoutStepOnePage.continue();
    await inventoryPage.page.goBack();
    await inventoryPage.addProductToCart(testData.products.bikeLight.name);
    await inventoryPage.openCart();
    await inventoryPage.page.locator('.checkout_button').click();
    await checkoutStepOnePage.fillInformation(testData.checkout.firstName, testData.checkout.lastName, testData.checkout.postalCode);
    await checkoutStepOnePage.continue();

    // Assert
    await checkoutStepTwoPage.verifySummary('$39.98', '$3.20', '$43.18');
  });

  test('finish completes the order and shows confirmation', async ({ checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage, testData }) => {
    // Arrange
    await checkoutStepOnePage.verifyLoaded();
    await checkoutStepOnePage.fillInformation(testData.checkout.firstName, testData.checkout.lastName, testData.checkout.postalCode);
    await checkoutStepOnePage.continue();

    // Act
    await checkoutStepTwoPage.finish();

    // Assert
    await checkoutCompletePage.verifyLoaded();
    await checkoutCompletePage.verifySuccessMessage();
  });

  test('successful checkout clears the cart', async ({ checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage, inventoryPage, cartPage, testData }) => {
    // Arrange
    await checkoutStepOnePage.verifyLoaded();
    await checkoutStepOnePage.fillInformation(testData.checkout.firstName, testData.checkout.lastName, testData.checkout.postalCode);
    await checkoutStepOnePage.continue();
    await checkoutStepTwoPage.finish();
    await checkoutCompletePage.verifyLoaded();
    await checkoutCompletePage.verifySuccessMessage();

    // Act
    await checkoutCompletePage.backHome();
    await inventoryPage.openCart();

    // Assert
    await cartPage.verifyEmpty();
  });

  test('browser back after checkout completion does not restore the active order flow', async ({ checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage, page, testData }) => {
    // Arrange
    await checkoutStepOnePage.verifyLoaded();
    await checkoutStepOnePage.fillInformation(testData.checkout.firstName, testData.checkout.lastName, testData.checkout.postalCode);
    await checkoutStepOnePage.continue();
    await checkoutStepTwoPage.finish();
    await checkoutCompletePage.verifyLoaded();

    // Act
    await page.goBack();

    // Assert
    await expect(page).toHaveURL(/.*checkout-complete\.html|.*checkout-step-two\.html/);
  });
});
