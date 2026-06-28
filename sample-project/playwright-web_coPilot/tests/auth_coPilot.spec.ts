import { expect, test } from '../src/fixtures/fixtures_coPilot';

test.describe('Authentication', () => {
  test('login as standard user succeeds', async ({ loginPage, inventoryPage, testData, page }) => {
    // Arrange
    await loginPage.navigate();

    // Act
    await loginPage.login(testData.users.standardUser, testData.users.password);

    // Assert
    await inventoryPage.verifyLoaded();
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('login as problem_user succeeds', async ({ loginPage, inventoryPage, testData, page }) => {
    // Arrange
    await loginPage.navigate();

    // Act
    await loginPage.login(testData.users.problemUser, testData.users.password);

    // Assert
    await inventoryPage.verifyLoaded();
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('login as performance_glitch_user succeeds', async ({ loginPage, inventoryPage, testData, page }) => {
    // Arrange
    await loginPage.navigate();

    // Act
    await loginPage.login(testData.users.performanceGlitchUser, testData.users.password);

    // Assert
    await inventoryPage.verifyLoaded();
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('login as error_user succeeds', async ({ loginPage, inventoryPage, testData, page }) => {
    // Arrange
    await loginPage.navigate();

    // Act
    await loginPage.login(testData.users.errorUser, testData.users.password);

    // Assert
    await inventoryPage.verifyLoaded();
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('login as visual_user succeeds', async ({ loginPage, inventoryPage, testData, page }) => {
    // Arrange
    await loginPage.navigate();

    // Act
    await loginPage.login(testData.users.visualUser, testData.users.password);

    // Assert
    await inventoryPage.verifyLoaded();
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test('locked out user sees error message', async ({ loginPage, testData }) => {
    // Arrange
    await loginPage.navigate();

    // Act
    await loginPage.login(testData.users.lockedUser, testData.users.password);

    // Assert
    await loginPage.verifyErrorMessage('Epic sadface: Sorry, this user has been locked out.');
    await loginPage.verifyOnLoginPage();
  });

  test('invalid password shows authentication error', async ({ loginPage, testData }) => {
    // Arrange
    await loginPage.navigate();

    // Act
    await loginPage.login(testData.users.standardUser, testData.users.invalidPassword);

    // Assert
    await loginPage.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service.');
  });

  test('invalid username shows authentication error', async ({ loginPage, testData }) => {
    // Arrange
    await loginPage.navigate();

    // Act
    await loginPage.login(testData.users.invalidUsername, testData.users.password);

    // Assert
    await loginPage.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service.');
  });

  test('blank credentials show required field error', async ({ loginPage }) => {
    // Arrange
    await loginPage.navigate();

    // Act
    await loginPage.login('', '');

    // Assert
    await loginPage.verifyErrorMessage('Epic sadface: Username is required');
  });

  test('logout redirects back to login page and clears session', async ({ loginPage, inventoryPage, testData, page }) => {
    // Arrange
    await loginPage.navigate();
    await loginPage.login(testData.users.standardUser, testData.users.password);
    await inventoryPage.verifyLoaded();

    // Act
    await inventoryPage.logout();

    // Assert
    await loginPage.verifyOnLoginPage();
    await expect(page).not.toHaveURL(/.*inventory\.html/);
    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/.*\/$/);
    await loginPage.verifyOnLoginPage();
  });
});
