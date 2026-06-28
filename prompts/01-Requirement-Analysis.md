# Phase 01 — Requirement Analysis

## Objective
Analyze the provided Business Requirements Document (BRD) and User Stories to ensure complete test coverage and identify any gaps before automation begins.

## Context
You are acting as a Senior QA Analyst reviewing the SwagLabs Commerce Platform requirements for the first time. The product team has handed over the BRD and User Stories. Your job is to analyze them for testability, completeness, and risk.

## Inputs
* `requirements/BRD.md`
* `requirements/User-Stories.md`

## Tasks
1. Create a complete Requirements Traceability Matrix (RTM) mapping the requirements (REQ-xx) to the corresponding user stories (US-xx) and high-level test conditions.
2. Identify any gaps, ambiguities, or missing requirements in the BRD.
3. Classify the requirements into "Testable" vs. "Non-Testable".
4. Identify Risk Areas: Determine which requirements carry the highest testing risk and explain why.
5. List at least 3 questions you would raise with the Business Analyst regarding these documents.

## Expected Output
A comprehensive markdown document containing the RTM table, gap analysis, risk assessment, and BA questions.

## Deliverables
* Markdown output containing the requested tables and analysis.

## Constraints
* The output MUST be in Markdown format.
* Use Markdown tables for the RTM.
* Do NOT make assumptions about implementation details beyond what is explicitly stated in the BRD.
* You MUST explicitly flag the `locked_out_user` scenario as a boundary case in your risk assessment.
