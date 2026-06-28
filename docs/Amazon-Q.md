# Amazon Q Developer Profile

## Overview
* **Vendor**: Amazon Web Services (AWS)
* **Integration Method**: VS Code Extension, JetBrains IDEs, CLI
* **Primary Modes**: Inline completions, Q Chat, Security Scanning, `/transform`

## Setup for Pilot
1. Install the "Amazon Q" extension in VS Code.
2. Authenticate using AWS Builder ID or AWS IAM Identity Center.
3. Open the `ai-qa-pilot` workspace.

## Key Features for QA
* **Q Chat**: The primary interface for providing prompts.
* **Security Scanning**: Useful during Phase 05 (Negative Testing) and Phase 10 (Code Review).
* **Workspace Context**: Q can index the local workspace to answer questions about the repository.

## Usage Guide for the 15 Phases
* Use the Q Chat panel to input the prompts.
* If Amazon Q asks for permission to read workspace files, grant it so it can analyze the BRD and User Stories.
* Pay attention to how Q handles the infrastructure/backend assumptions during the API testing phase (Phase 07).

## Known Strengths
* Strong language breadth.
* Built-in security awareness which aids in code review and negative test generation.
* Good at explaining complex AWS/infrastructure concepts (useful for RCA in Phase 12).

## Known Limitations
* May have slightly less specific Playwright community knowledge compared to Copilot.
* Context drift can occur in long, multi-turn conversations.

## Tips for Better Results
* Explicitly mention file paths in your prompts if Q struggles to find them (e.g., "Review the file at requirements/BRD.md").

## Cross-References
* [Prompts Directory](../prompts/)
* [AI Evaluation Methodology](AI-Evaluation-Methodology.md)
