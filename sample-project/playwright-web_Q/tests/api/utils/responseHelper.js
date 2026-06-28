import { expect } from "@playwright/test";
import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });

export async function verifyStatus(response, expectedStatus) {
  const body = await response.text();
  expect(response.status(), `Expected ${expectedStatus} but got ${response.status()}. Body: ${body}`).toBe(expectedStatus);
}

export async function verifySchema(response, schema) {
  const body = await response.json();
  const validate = ajv.compile(schema);
  const valid = validate(body);
  expect(valid, `Schema validation failed: ${JSON.stringify(validate.errors)}`).toBe(true);
  return body;
}

export function verifyErrorResponse(responseBody) {
  expect(responseBody).toHaveProperty("code");
  expect(responseBody).toHaveProperty("message");
}

export function verifyErrorMessage(responseBody, code, message) {
  expect(responseBody.code).toBe(code);
  expect(responseBody.message).toContain(message);
}

export function setEnvVariable(responseBody, property, envVarName) {
  const value = responseBody[property];
  process.env[envVarName] = String(value);
}

export function setEnvVariableString(value, envVarName) {
  process.env[envVarName] = String(value);
}
