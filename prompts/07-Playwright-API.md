# Phase 07 — Playwright API Automation

## Objective
Generate complete Playwright API testing code for the Restful Booker API.

## Context
In addition to the UI, you need to automate the backend API tests. You will use Playwright's APIRequestContext to handle API testing without needing a browser.

## Inputs
* Reference `sample-project/playwright-api/` folder.
* Restful Booker API documentation: https://restful-booker.herokuapp.com/apidoc/index.html
* `requirements/Test-Data.md`

## Tasks
1. **API Client**: Create an API client utility class that wraps Playwright's `APIRequestContext`.
2. **Authentication**: Implement the auth flow: POST to `/auth` to retrieve a token, and store this token for subsequent requests.
3. **CRUD Operations**: Implement tests for all CRUD operations:
   - `GET /booking` (get all booking IDs)
   - `POST /booking` (create a new booking)
   - `GET /booking/{id}` (get a specific booking)
   - `PUT /booking/{id}` (full update, requires auth token)
   - `PATCH /booking/{id}` (partial update, requires auth token)
   - `DELETE /booking/{id}` (delete booking, requires auth token)
4. **Request Chaining**: Create an end-to-end test that chains requests: Create Booking -> Get Booking -> Update Booking -> Delete Booking -> Verify Deleted.
5. **Schema Validation**: Implement JSON Schema validation for all API responses using an external validation utility (like Ajv).
6. **Retry Logic**: Implement retry logic for flaky network responses (max 3 retries with exponential backoff).
7. **Configuration**: Create `playwright.config.ts` for the API project (no browsers configured, use `baseURL` from env).
8. **Validation**: Ensure robust response validation for status codes, headers, and body fields.

## Expected Output
The complete source code for the Playwright API testing framework.

## Deliverables
* Source code blocks for API client, schemas, config, and test files.

## Constraints
* You MUST use Playwright's `APIRequestContext` ONLY. Do not use `axios`, `fetch`, or `node-fetch`.
* Use TypeScript.
* Full CRUD coverage is required.
* Authentication must correctly parse and use the token from the `/auth` endpoint.
* JSON Schema validation is MANDATORY.
* Do NOT generate Postman collections, SoapUI scripts, or ReadyAPI configurations.
