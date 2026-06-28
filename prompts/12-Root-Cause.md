# Phase 12 — Root Cause Analysis

## Objective
Perform a Root Cause Analysis (RCA) on a set of simulated test failures to determine if the issue lies in the test code, application, or environment.

## Context
Test failures need investigation. You are tasked with determining why these specific scenarios failed during the nightly run.

## Inputs
* Below failure scenarios:
  1. Login test fails intermittently (50% pass rate) on Playwright Web (SauceDemo).
  2. Sort by Price High-to-Low test fails: The product order in the UI is wrong.
  3. Checkout total calculation test fails: Test expected `$58.29` but UI showed `$57.17`.
  4. Restful Booker `DELETE` booking returns 405 Method Not Allowed instead of 201 Created.
  5. Appium login test fails consistently on iOS but passes on Android.

## Tasks
For each of the 5 scenarios:
1. Hypothesize the most likely root cause.
2. Describe the investigation steps you would take to confirm the root cause.
3. Classify the defect: Is it a Test Code Defect, Application Defect, Environment Issue, Test Data Issue, or AI Hallucination?
4. Recommend the fix.
5. Recommend a prevention measure.

Produce a formal RCA Report table containing: Failure ID, Description, Root Cause Category, Investigation Steps, Fix, and Prevention.

## Expected Output
A formal Root Cause Analysis Report.

## Deliverables
* Markdown document containing the RCA table and analysis.

## Constraints
* You MUST use the "5-Whys" technique for at least 2 of the scenarios.
* You MUST explicitly distinguish between test defects (bad automation) and application defects (actual bugs in the app).
* You MUST include the defect classification table.
