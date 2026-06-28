# GitHub Copilot Profile

## Overview
* **Vendor**: Microsoft / GitHub
* **Integration Method**: VS Code Extension, JetBrains IDEs, CLI
* **Primary Modes**: Inline completions, Copilot Chat, `/commands`

## Setup for Pilot
1. Install the "GitHub Copilot" and "GitHub Copilot Chat" extensions in VS Code.
2. Sign in with your GitHub Enterprise or Pro account.
3. Ensure the workspace context is active (open the `ai-qa-pilot` folder).

## Key Features for QA
* **Inline Completions**: Excellent for filling out repetitive test data or POM locators.
* **Copilot Chat**: Used for the heavy lifting of the 15-phase evaluation workflow.
* **`@workspace`**: Use this tag to ensure Copilot reads the necessary Markdown files for context.
* **`/tests`**: Useful command for unit tests, though less applicable for E2E generation.

## Usage Guide for the 15 Phases
* For phases requiring document analysis (01-05), ensure you use `@workspace` or have the relevant requirement files open in the editor tabs.
* Copilot relies heavily on open editor tabs for context. Always open the files you want it to reference before pasting the prompt.
* Paste the prompt from the `prompts/` directory directly into Copilot Chat.

## Known Strengths
* Deep familiarity with TypeScript and Playwright due to massive training data.
* Excellent at predicting the next line of code in test files.
* Fast response times.

## Known Limitations
* Context window can sometimes truncate, causing it to forget early requirements by Phase 08.
* Prone to hallucinating DOM selectors if the HTML structure isn't explicitly provided.

## Tips for Better Results
* Keep the target files (e.g., the POM class you want it to write) active in your editor.
* If it generates incomplete code, ask "continue".

## Cross-References
* [Prompts Directory](../prompts/)
* [AI Evaluation Methodology](AI-Evaluation-Methodology.md)
