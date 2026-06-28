# Phase 11 — Debugging Failed Tests

## Objective
Identify and fix common bugs in test automation code.

## Context
CI/CD pipelines frequently fail due to flaky or broken tests. You must analyze the broken code snippets below, find the root cause, and fix them.

## Inputs
* Phase 06, 07, 08 outputs (for context on framework style).

### Broken Code Samples
1. **Playwright Web (Wrong Selector)**
   ```typescript
   // Fails to click login
   await page.locator('.btn_action').click();
   ```
2. **Playwright Web (Missing Await)**
   ```typescript
   // Assertion fails or executes out of order
   expect(page.locator('.shopping_cart_badge')).toHaveText('1');
   ```
3. **Playwright Web (Race Condition)**
   ```typescript
   // Fails intermittently on slow load
   await page.locator('[data-test="add-to-cart"]').click();
   const cartCount = await page.locator('.shopping_cart_badge').textContent();
   ```
4. **Robot Framework (Wrong Keyword)**
   ```robotframework
   *** Test Cases ***
   Valid Login
       Input Text    id=user-name    standard_user
       Input Text    id=password    secret_sauce
       Click Button  id=login-btn
   ```
5. **Playwright API (Missing Auth)**
   ```typescript
   // Returns 403 Forbidden
   const response = await request.put(`/booking/${bookingId}`, {
       data: { firstname: "James", lastname: "Brown" }
   });
   ```

## Tasks
1. Identify the root cause of each failure in the 5 samples.
2. Provide the corrected code for each sample.
3. Explain exactly what the error message would look like in the test report for each bug.
4. Suggest a strategy or linting rule to prevent similar bugs in the future.

## Expected Output
A debugging report with the fixed code and explanations.

## Deliverables
* Markdown document containing the fixes and explanations.

## Constraints
* You MUST identify all 5 bugs accurately.
* You MUST provide the corrected code blocks.
* You MUST explain the anticipated error message that Playwright or Robot Framework would output.
