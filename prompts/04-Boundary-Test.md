# Phase 04 — Boundary Value Analysis

## Objective
Apply Boundary Value Analysis (BVA) techniques to the input fields and system limits defined in the SwagLabs requirements.

## Context
To ensure robustness, you need to design tests that specifically target the boundaries of the system's input fields and logic.

## Inputs
* `requirements/Business-Rules.md`
* `requirements/Test-Data.md`
* Phase 03 Manual Test Cases

## Tasks
1. Analyze the checkout input fields: First Name, Last Name, Postal Code.
2. Apply the BVA technique to these fields. Define the min-1, min, min+1, max-1, max, and max+1 test inputs for each field.
3. Analyze system boundaries: product quantity boundaries (only 1 of each item available), cart count boundaries (max possible items), and price boundaries (min and max priced items in the catalog).
4. Produce a BVA test matrix mapping the fields/limits to the specific test inputs.
5. Identify which of these boundary cases are most likely to reveal defects in the application.

## Expected Output
A Boundary Value Analysis report containing the BVA matrix and risk assessment.

## Deliverables
* Markdown document with the BVA matrix and analysis.

## Constraints
* You MUST explicitly state the assumed maximum field lengths in your analysis (use 255 characters as the maximum for all text fields).
* You MUST cover the empty string (0 characters) as the below-minimum (min-1) boundary for required fields.
