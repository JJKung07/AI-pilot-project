import { expect, test as base } from '@playwright/test';
import { CartPage } from '../pages/cart-page_coPilot';
import { CheckoutCompletePage } from '../pages/checkout-complete-page_coPilot';
import { CheckoutStepOnePage } from '../pages/checkout-step-one-page_coPilot';
import { CheckoutStepTwoPage } from '../pages/checkout-step-two-page_coPilot';
import { InventoryPage } from '../pages/inventory-page_coPilot';
import { LoginPage } from '../pages/login-page_coPilot';
import { ProductDetailPage } from '../pages/product-detail-page_coPilot';
import { testData, type TestData } from '../data/test-data_coPilot';

type WebFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  productDetailPage: ProductDetailPage;
  cartPage: CartPage;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
  checkoutCompletePage: CheckoutCompletePage;
  testData: TestData;
};

export const test = base.extend<WebFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  inventoryPage: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },
  productDetailPage: async ({ page }, use) => {
    await use(new ProductDetailPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
  checkoutStepOnePage: async ({ page }, use) => {
    await use(new CheckoutStepOnePage(page));
  },
  checkoutStepTwoPage: async ({ page }, use) => {
    await use(new CheckoutStepTwoPage(page));
  },
  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },
  testData: async ({}, use) => {
    await use(testData);
  },
});

export { expect };
