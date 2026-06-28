# Phase 13 — Refactoring Automation Code

## Objective
Refactor the automation suite to improve maintainability, reduce duplication, and implement the findings from the Phase 10 Code Review.

## Context
The initial code works, but it needs to be hardened for enterprise scale. You will apply DRY principles and robust patterns.

## Inputs
* Phase 10 Code Review findings.
* All code from Phases 06-09.

## Tasks
1. **Refactor Playwright POM**: Extract all locators into a dedicated locators file or object per page. Add JSDoc comments to all action and assertion methods.
2. **Refactor Test Fixtures**: Implement proper fixture chaining. Create an authentication fixture that logs in once per test file (or uses stored state) rather than logging in before every single test.
3. **Refactor Test Data**: Replace any inline test data (hardcoded strings) with a Data Factory pattern or external JSON data file.
4. **Refactor Robot Framework**: Consolidate duplicate keywords into a shared `Common.resource` file to apply the DRY principle.
5. **Add Retry Logic**: Implement Playwright's `retry-on-action-error` or `expect.poll` for any flaky selectors identified.
6. **Reporter Integration**: Add configuration for the `allure-playwright` reporter.
7. Produce a before-and-after comparison of the key refactored files.
8. Show the diff for at minimum 3 refactored files.

## Expected Output
The refactored code and an explanation of the improvements.

## Deliverables
* Source code blocks of the refactored files.
* A Refactoring Log explaining the before/after state.

## Constraints
* You MUST maintain all existing test coverage (do not delete tests).
* Do NOT create new test cases—focus strictly on refactoring existing ones.
* You MUST show a measurable improvement (e.g., reduced line count, eliminated duplication).
* You MUST include a refactoring log showing the diff for at least 3 files.
