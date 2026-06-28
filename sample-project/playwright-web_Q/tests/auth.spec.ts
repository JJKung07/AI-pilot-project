import { test, expect } from '../src/fixtures/fixtures';
import { Users } from '../src/data/test-data';

test.describe('Authentication', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should login successfully with standard_user', async ({ loginPage, page }) => {
    await loginPage.login(Users.standard.username, Users.standard.password);
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('should show error for locked_out_user', async ({ loginPage }) => {
    await loginPage.login(Users.locked.username, Users.locked.password);
    await loginPage.verifyErrorMessage('Sorry, this user has been locked out.');
  });

  test('should show error for invalid credentials', async ({ loginPage }) => {
    await loginPage.login(Users.invalid.username, Users.invalid.password);
    await loginPage.verifyErrorMessage('Username and password do not match any user in this service');
  });

  test('should show error when username is empty', async ({ loginPage }) => {
    await loginPage.login('', Users.standard.password);
    await loginPage.verifyErrorMessage('Username is required');
  });

  test('should show error when password is empty', async ({ loginPage }) => {
    await loginPage.login(Users.standard.username, '');
    await loginPage.verifyErrorMessage('Password is required');
  });

  test('should logout successfully', async ({ loginPage, inventoryPage }) => {
    await loginPage.login(Users.standard.username, Users.standard.password);
    await inventoryPage.logout();
    await loginPage.verifyOnLoginPage();
  });

  test('should redirect to login when accessing inventory without session', async ({ page }) => {
    await page.goto('/inventory.html');
    await expect(page).toHaveURL(/saucedemo\.com\/?$/);
  });
});
