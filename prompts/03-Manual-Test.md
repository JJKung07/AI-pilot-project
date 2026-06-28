# Phase 03 — Manual Test Case Design

## Objective
Generate a complete suite of manual test cases covering all user stories for the SwagLabs platform.

## Context
As a QA Engineer, you need to translate the user stories and acceptance criteria into actionable manual test cases that another tester could follow step-by-step.

## Inputs
* `requirements/User-Stories.md`
* `requirements/Acceptance-Criteria.md`
* `requirements/Business-Rules.md`
* Phase 02 Review Output

## Tasks
1. Generate a full manual test suite covering all 20 user stories.
2. Group the test cases by feature module (e.g., Authentication, Catalog, Cart, Checkout).
3. Ensure every test case uses the following format:
   - Test Case ID (e.g., TC-AUTH-001)
   - Title
   - Preconditions
   - Steps (numbered)
   - Expected Result
   - Actual Result (leave blank)
   - Status (leave blank)
   - Priority (High/Medium/Low)
4. You must cover at minimum: Login (all user types), Product catalog display, Sorting (all 4 options), Cart operations (add/remove), Full checkout flow, and Logout.
5. Generate at least 40 total test cases.

## Expected Output
A comprehensive Markdown document containing all manual test cases grouped by module.

## Deliverables
* Markdown file with 40+ manual test cases.

## Constraints
* You MUST use Gherkin-style preconditions (Given).
* You MUST include explicit teardown steps (e.g., clearing browser cookies, closing the browser) where appropriate.
* Do NOT assume any test automation exists; these are strictly manual instructions.
