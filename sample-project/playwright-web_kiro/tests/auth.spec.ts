import { test, expect } from '../src/fixtures/fixtures';

test.describe('Authentication', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.navigate();
  });

  test.describe('Login - Happy Path', () => {
    test('should login successfully with standard_user', async ({
      loginPage,
      inventoryPage,
      credentials,
    }) => {
      // Arrange - user is on login page
      await loginPage.verifyOnLoginPage();

      // Act
      await loginPage.login(credentials.standardUser, credentials.password);

      // Assert
      await inventoryPage.verifyOnInventoryPage();
    });
  });

  test.describe('Login - Negative Cases', () => {
    test('should show error for locked_out_user', async ({
      loginPage,
      credentials,
    }) => {
      // Arrange - user is on login page

      // Act
      await loginPage.login(credentials.lockedUser, credentials.password);

      // Assert
      await loginPage.verifyErrorMessage(
        'Epic sadface: Sorry, this user has been locked out.'
      );
    });

    test('should show error for invalid password', async ({
      loginPage,
      credentials,
    }) => {
      // Arrange - user is on login page

      // Act
      await loginPage.login(credentials.standardUser, 'wrong_password');

      // Assert
      await loginPage.verifyErrorMessage(
        'Epic sadface: Username and password do not match any user in this service.'
      );
    });

    test('should show error for non-existent username', async ({ loginPage }) => {
      // Arrange - user is on login page

      // Act
      await loginPage.login('invalid_user', 'invalid_pass');

      // Assert
      await loginPage.verifyErrorMessage(
        'Epic sadface: Username and password do not match any user in this service.'
      );
    });

    test('should show error when username is empty', async ({ loginPage }) => {
      // Arrange - user is on login page

      // Act
      await loginPage.login('', 'secret_sauce');

      // Assert
      await loginPage.verifyErrorMessage('Epic sadface: Username is required');
    });

    test('should show error when password is empty', async ({
      loginPage,
      credentials,
    }) => {
      // Arrange - user is on login page

      // Act
      await loginPage.login(credentials.standardUser, '');

      // Assert
      await loginPage.verifyErrorMessage('Epic sadface: Password is required');
    });

    test('should show error when both fields are empty', async ({ loginPage }) => {
      // Arrange - user is on login page

      // Act
      await loginPage.login('', '');

      // Assert
      await loginPage.verifyErrorMessage('Epic sadface: Username is required');
    });
  });

  test.describe('Logout', () => {
    test('should logout successfully and redirect to login page', async ({
      loginPage,
      inventoryPage,
      credentials,
    }) => {
      // Arrange - login first
      await loginPage.login(credentials.standardUser, credentials.password);
      await inventoryPage.verifyOnInventoryPage();

      // Act
      await inventoryPage.logout();

      // Assert
      await loginPage.verifyOnLoginPage();
    });
  });

  test.describe('Session Management', () => {
    test('should redirect to login when accessing inventory without session', async ({
      page,
    }) => {
      // Arrange - no session

      // Act
      await page.goto('/inventory.html');

      // Assert
      await expect(page).toHaveURL(/\/$/);
    });
  });
});
