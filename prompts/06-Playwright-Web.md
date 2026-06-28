# Phase 06 — Playwright Web Automation

## Objective
Generate a complete, enterprise-grade Playwright TypeScript automation framework for the SwagLabs web application.

## Context
Manual testing is complete. It is time to automate the regression suite using Playwright and TypeScript. The framework must be scalable, maintainable, and follow industry best practices.

## Inputs
* All `requirements/` documents.
* `requirements/Test-Data.md`
* Phase 01-05 outputs.
* Reference the `sample-project/playwright-web/` folder structure.

## Tasks
1. **Page Object Model (POM)**: Create POM classes for the following pages: `LoginPage`, `InventoryPage`, `ProductDetailPage`, `CartPage`, `CheckoutStepOnePage`, `CheckoutStepTwoPage`, `CheckoutCompletePage`.
2. **POM Structure**: Each POM class MUST include:
   - A constructor accepting a `page: Page` parameter.
   - Element locators defined as `readonly` properties.
   - Action methods (e.g., `login(user, pass)`).
   - Assertion methods (e.g., `verifyErrorMessage(msg)`).
3. **Fixtures**: Create a test fixtures file (`fixtures.ts`) extending the base Playwright test object to include instantiated POMs.
4. **Test Files**: Create test files (`.spec.ts`) for:
   - Authentication (login success, logout, locked user).
   - Product catalog (all 4 sort options, verifying product count).
   - Cart operations (adding/removing, verifying badge count).
   - Checkout flow (happy path and validation errors).
5. **Configuration**: Generate a `playwright.config.ts` file that includes:
   - `baseURL` retrieved from environment variables.
   - 3 browser projects (chromium, firefox, webkit).
   - Parallel execution enabled (`workers: 4`).
   - HTML reporter.
   - Screenshot on failure, Video on failure.
6. **Structure**: Ensure all tests use the Arrange-Act-Assert pattern and have descriptive `test.describe` blocks.
7. Generate at least 25 automated test cases in total.

## Expected Output
The complete source code for the Playwright automation framework.

## Deliverables
* Source code blocks for POM classes, fixtures, configuration, and test files.

## Constraints
* Use TypeScript exclusively.
* Strict type checking is required; do NOT use `any` types.
* The Page Object Model is MANDATORY.
* Do NOT hardcode credentials in the test files; use test fixtures or environment variables.
* Use the Playwright 1.44+ API.
* You MUST use `data-test` attributes for locators where they would be available in SauceDemo.
* Parallel execution must be explicitly configured in `playwright.config.ts`.
