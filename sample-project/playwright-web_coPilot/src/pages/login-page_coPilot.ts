import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = this.page.locator('#user-name');
    this.passwordInput = this.page.locator('#password');
    this.loginButton = this.page.locator('#login-button');
    this.errorMessage = this.page.locator('[data-test="error"]');
  }

  async navigate(): Promise<void> {
    await this.page.goto('/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifyOnLoginPage(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }

  async verifyErrorMessage(message: string): Promise<void> {
    await expect(this.errorMessage).toHaveText(message);
  }
}
