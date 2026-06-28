# Phase 10 — Automation Code Review

## Objective
Perform a thorough, senior-level code review of the automation code generated in Phases 06 through 09.

## Context
As a QA Architect, you must ensure the generated automation code adheres to enterprise standards before it is merged into the main branch.

## Inputs
* All code generated in Phase 06 (Playwright Web)
* All code generated in Phase 07 (Playwright API)
* All code generated in Phase 08 (Robot Framework)
* All code generated in Phase 09 (Appium)
* `docs/AI-Evaluation-Methodology.md` (scoring rubric)

## Tasks
1. **Review Playwright Web**: Check POM completeness, selector quality (preference: data-test > role > CSS > XPath), async/await correctness, test isolation, hardcoded values, missing assertions, and error handling.
2. **Review Playwright API**: Check authentication handling, schema validation completeness, retry logic correctness, and test data cleanup.
3. **Review Robot Framework**: Check keyword naming conventions, resource file organization, variable scope, and tag completeness.
4. Produce a formal Code Review Report containing specific findings. Each finding must include: Finding ID, File, Line Reference, Severity (Critical/Major/Minor/Info), Description, and Recommendation.
5. Categorize the findings by severity.
6. Produce an overall code quality score based on the methodology rubric.

## Expected Output
A comprehensive Code Review Report identifying flaws and suggesting improvements.

## Deliverables
* A Markdown Code Review Report.

## Constraints
* You MUST produce at minimum 15 distinct code review findings, even if the code appears good (note best practices or minor improvements if there are no major bugs).
* Severity levels must be justified.
* You MUST reference specific code constructs and patterns.
