# Kiro Profile

## Overview
* **Vendor**: Amazon / AWS
* **Integration Method**: Standalone IDE (AWS Kiro IDE)
* **Primary Modes**: Specs-driven development, Agentic Task Execution, Steering, Hooks

## Setup for Pilot
1. Install and launch the AWS Kiro IDE.
2. Open the `ai-qa-pilot` repository as your workspace.
3. Configure your AWS credentials/authentication as required by Kiro.

## Key Features for QA
* **Specs-Driven Development**: Kiro operates heavily on `.spec` files. This aligns perfectly with the Requirement Analysis phases.
* **Agentic Execution**: Kiro can execute multi-step tasks autonomously.
* **Steering**: Ability to course-correct the agent during execution.
* **MCP (Model Context Protocol)**: Access to external tools.

## Usage Guide for the 15 Phases
* **Phase 01-05 (Requirements)**: Treat the provided BRD and User Stories as Kiro specs. Ask Kiro to analyze them and produce the test artifacts.
* **Phase 06-09 (Automation)**: You can provide the prompt as a goal for Kiro's agent. Kiro may attempt to create the files autonomously rather than just outputting text in a chat.
* **Phase 10-15 (Review/Refactor)**: Use Kiro's steering capabilities if it begins to refactor incorrectly.

## Known Strengths
* Highly structured, requirement-to-code workflow matches enterprise QA processes perfectly.
* Superior context retention due to spec files.
* Can autonomously create files and structure projects.

## Known Limitations
* Newer tool; may have less community-driven stackoverflow knowledge ingrained.
* Agentic execution may require more active "steering" if it misinterprets a prompt.

## Tips for Better Results
* Frame the prompts as actionable goals for the agent.
* Let Kiro read the requirements directory as its spec foundation.

## Cross-References
* [Prompts Directory](../prompts/)
* [AI Evaluation Methodology](AI-Evaluation-Methodology.md)
