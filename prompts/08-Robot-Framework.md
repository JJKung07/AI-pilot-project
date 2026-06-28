# Phase 08 — Robot Framework Mobile Automation

## Objective
Generate a Robot Framework and Appium test suite for the Sauce Labs My Demo App (Mobile).

## Context
The final domain to automate is Mobile. You will use Robot Framework for its keyword-driven approach, backed by the AppiumLibrary to interact with the React Native mobile application.

## Inputs
* Reference `sample-project/robot-framework/` folder.
* `docs/Environment.md`
* Sauce Labs My Demo App details (React Native).

## Tasks
1. **Resource Files**: Create Robot Framework resource files (`.resource`) for: `AppiumSetup.resource`, `ProductCatalog.resource`, `Cart.resource`, `Checkout.resource`, `Login.resource`.
2. **Test Suites**: Create test suite files (`.robot`) for: Login tests, Product browsing, Cart management, and Checkout flow.
3. **Keywords**: Use `AppiumLibrary` keywords for all mobile interactions.
4. **Cross-Platform**: Ensure the framework supports both Android and iOS by using variables for `PLATFORM`, `APP_PATH`, `DEVICE_NAME`, and `PLATFORM_VERSION`.
5. **Variables**: Create a variables file (`variables.py` or `variables.robot`) for device configurations.
6. **Page Object Pattern**: Implement the Page Object pattern using Robot Framework Resource files (locators and keywords separated from tests).
7. **Tags**: Apply tags for test organization (e.g., `@smoke`, `@regression`, `@checkout`, `@login`).
8. **Teardown**: Ensure the app is closed after each test execution.
9. Generate at minimum 15 test cases across the suites.

## Expected Output
The complete Robot Framework test suite.

## Deliverables
* Source code blocks for `.resource`, `.robot`, and variables files.

## Constraints
* Use Robot Framework 7.x syntax.
* Use AppiumLibrary 2.x keywords.
* Do NOT use SeleniumLibrary keywords.
* Must support both Android and iOS via variable overrides.
* ALL locators must be defined in the resource files, NOT inline within the test cases.
