import { expect, type Locator, type Page } from '@playwright/test';

export class CheckoutStepTwoPage {
  readonly page: Page;
  readonly itemTotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly title: Locator;
  readonly summaryItems: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemTotal = this.page.locator('.summary_subtotal_label');
    this.tax = this.page.locator('.summary_tax_label');
    this.total = this.page.locator('.summary_total_label');
    this.finishButton = this.page.getByRole('button', { name: 'Finish' });
    this.cancelButton = this.page.getByRole('button', { name: 'Cancel' });
    this.title = this.page.locator('.title');
    this.summaryItems = this.page.locator('.cart_item');
  }

  async verifyLoaded(): Promise<void> {
    await expect(this.title).toHaveText('Checkout: Overview');
  }

  async verifySummary(itemTotal: string, tax: string, total: string): Promise<void> {
    await expect(this.itemTotal).toContainText(itemTotal);
    await expect(this.tax).toContainText(tax);
    await expect(this.total).toContainText(total);
  }

  async verifyItemCount(expectedCount: number): Promise<void> {
    await expect(this.summaryItems).toHaveCount(expectedCount);
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }
}
