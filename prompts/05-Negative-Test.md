# Phase 05 — Negative Testing

## Objective
Design negative test cases aimed at breaking the application, handling unexpected inputs, and verifying error handling.

## Context
Happy path testing is not enough. As an Enterprise QA, you must design tests that intentionally misuse the system to ensure it degrades gracefully and securely.

## Inputs
* `requirements/Business-Rules.md`
* `requirements/Acceptance-Criteria.md`
* Phase 03 and Phase 04 outputs

## Tasks
1. Design negative test cases for the following areas:
   - **Authentication**: invalid user, wrong password, locked user, SQL injection attempt in login, XSS attempt in login.
   - **Navigation**: direct URL access to `/inventory.html` without session, manipulating cart URLs.
   - **Checkout**: missing required fields, invalid postal code format, using the browser's back button during checkout.
   - **Cart**: attempting to remove items not in the cart, proceeding to checkout with an empty cart.
   - **Sorting**: rapid/spam clicking of sort changes, changing sort while adding items to cart.
2. Produce a Negative Test Case table with the following columns: Test ID, Scenario, Input, Expected Error/Behavior, Risk Level.

## Expected Output
A comprehensive negative test case table.

## Deliverables
* Markdown document containing the negative test cases.

## Constraints
* You MUST classify each negative test case by Risk Level (High, Medium, Low).
* You MUST include test cases relevant to the OWASP Top 10 (specifically Injection and XSS).
* You must state that these tests are for functional observation only and do not constitute a full penetration test.
