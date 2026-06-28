# Expected Outputs & Quality Indicators

## Phase 01: Requirement Analysis
* **Quality 4/5**: Identifies that `locked_out_user` is a boundary, RTM maps all 20 stories.
* **Failure Modes**: Missing the locked out user; confusing test cases with user stories.

## Phase 02: Requirement Review
* **Quality 4/5**: Flags the 8% tax calculation as needing rounding edge cases. Produces a formal table.
* **Failure Modes**: Refusing to sign off without writing code; hallucinating requirements not in BRD.

## Phase 03: Manual Test Design
* **Quality 4/5**: 40+ tests. Uses Gherkin preconditions. Includes teardown (e.g., clear cookies).
* **Failure Modes**: Assuming automation; writing less than 20 tests; missing cart operations.

## Phase 04: Boundary Value Analysis
* **Quality 4/5**: Analyzes First, Last, Zip, price limits. Explains 255 char max.
* **Failure Modes**: Misunderstanding BVA math (min-1, min); ignoring empty string.

## Phase 05: Negative Testing
* **Quality 4/5**: 20+ cases. Mentions OWASP Top 10 (Injection/XSS). Categorizes by High/Med/Low risk.
* **Failure Modes**: Generating happy path tests; refusing to generate security tests due to safety filters.

## Phase 06: Playwright Web Automation
* **Quality 4/5**: 7 POM classes. `playwright.config.ts` has `workers: 4`. Uses `data-test` selectors.
* **Failure Modes**: Using XPath everywhere; missing `await`; hardcoding credentials.

## Phase 07: Playwright API Automation
* **Quality 4/5**: Uses `APIRequestContext`. Includes token auth, schema validation (Ajv/Zod).
* **Failure Modes**: Hallucinating `axios` or `fetch`; failing to pass token in headers.

## Phase 08: Robot Framework Automation
* **Quality 4/5**: Uses `AppiumLibrary`. Separates locators into `.resource` files. iOS/Android variables.
* **Failure Modes**: Using Selenium keywords (`Click Element` instead of Appium ones); inline locators.

## Phase 09: Appium Mobile Automation
* **Quality 4/5**: Explains `accessibility_id` for React Native. Details UiAutomator2 vs XCUITest.
* **Failure Modes**: Recommending XPath for React Native; confusing Appium with web Selenium.

## Phase 10: Code Review
* **Quality 4/5**: 15+ findings. References specific lines and constructs. Justifies severity.
* **Failure Modes**: "LGTM"; generic advice without referencing the generated code.

## Phase 11: Debugging
* **Quality 4/5**: Fixes all 5 snippets perfectly. Explains Playwright/Robot error output.
* **Failure Modes**: Fixing the symptom not the cause (e.g., adding `sleep` instead of `waitFor`).

## Phase 12: Root Cause Analysis
* **Quality 4/5**: Uses 5-Whys. Distinguishes test defects from app defects.
* **Failure Modes**: Assuming every failure is an application bug; ignoring environment issues.

## Phase 13: Refactoring
* **Quality 4/5**: Shows diffs for 3 files. Extracts locators. Adds retry logic.
* **Failure Modes**: Deleting tests to save space; breaking existing coverage.

## Phase 14: Pull Request
* **Quality 4/5**: Professional PR description. 5+ inline simulated comments.
* **Failure Modes**: Writing a generic summary without checklist; no inline comments.

## Phase 15: Final Comparison
* **Quality 4/5**: Honest self-assessment. Uses rubric. Differentiates Copilot vs Autopilot.
* **Failure Modes**: Claiming perfect scores; generic AI boilerplate ("As an AI language model...").
