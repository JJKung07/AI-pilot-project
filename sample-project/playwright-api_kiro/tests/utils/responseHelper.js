import { expect } from "@playwright/test";
import Ajv from "ajv";

const ajv = new Ajv({ allErrors: true });

/**
 * ตรวจสอบ HTTP status code
 * @param {import('@playwright/test').APIResponse} response
 * @param {number} expectedStatus
 */
export async function verifyStatus(response, expectedStatus) {
  const status = response.status();
  if (status !== expectedStatus) {
    const body = await response.text();
    console.error(`Expected status ${expectedStatus} but got ${status}. Body: ${body}`);
  }
  expect(status).toBe(expectedStatus);
}

/**
 * ตรวจสอบ response ตาม JSON Schema (ใช้ Ajv)
 * @param {object} responseBody
 * @param {object} schema
 */
export function verifySchema(responseBody, schema) {
  const validate = ajv.compile(schema);
  const valid = validate(responseBody);
  if (!valid) {
    console.error("Schema validation errors:", JSON.stringify(validate.errors, null, 2));
  }
  expect(valid).toBe(true);
}

/**
 * ตรวจสอบว่า error response ตรงตาม error schema pattern
 * @param {object} responseBody
 */
export function verifyErrorResponse(responseBody) {
  expect(responseBody).toHaveProperty("reason");
}

/**
 * ตรวจสอบ error code & message
 * @param {object} responseBody
 * @param {string} expectedReason
 */
export function verifyErrorMessage(responseBody, expectedReason) {
  expect(responseBody.reason).toBe(expectedReason);
}

/**
 * ดึงค่าจาก response เก็บใน env variable
 * @param {object} responseBody
 * @param {string} property
 * @param {string} envVarName
 */
export function setEnvVariable(responseBody, property, envVarName) {
  const value = responseBody[property];
  expect(value).toBeDefined();
  process.env[envVarName] = String(value);
}

/**
 * เก็บค่า string ใน env variable
 * @param {string} value
 * @param {string} envVarName
 */
export function setEnvVariableString(value, envVarName) {
  expect(value).toBeDefined();
  process.env[envVarName] = value;
}
