# Playwright API Automation Project

## Overview
This project skeleton evaluates an AI assistant's ability to generate API tests using Playwright's `APIRequestContext` for the Restful Booker API.

## Prerequisites
* Node.js 20+

## Setup
1. `npm install`
2. `cp .env.example .env`
3. `npx playwright install`

## Structure
* `src/api/` - API client utilities
* `src/schemas/` - JSON schemas for Ajv validation
* `src/utils/` - Helper functions
* `tests/` - API spec files

## Running
```bash
npm test
```
