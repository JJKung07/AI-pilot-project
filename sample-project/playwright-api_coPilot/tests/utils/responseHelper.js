import { expect } from '@playwright/test';
import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true, strict: false });

export async function verifyStatus(response, expectedStatus) {
  const actualStatus = response.status();
  expect(actualStatus).toBe(expectedStatus);

  if (actualStatus !== expectedStatus) {
    const responseText = await response.text();
    throw new Error(`Expected status ${expectedStatus} but received ${actualStatus}. Response body: ${responseText}`);
  }
}

export async function verifySchema(response, schema) {
  const body = await response.json();
  const validate = ajv.compile(schema);
  const valid = validate(body);

  expect(valid, JSON.stringify(validate.errors, null, 2)).toBe(true);
  return body;
}

export function verifyErrorResponse(responseBody) {
  expect(responseBody).toHaveProperty('reason');
}

export function verifyErrorMessage(responseBody, code, message) {
  expect(responseBody).toMatchObject({ code, message });
}

export function verifyErrorMessageDataNotFound(responseBody, code, message) {
  expect(responseBody).toMatchObject({ code, message });
}

export function setEnvVariable(responseBody, properties, envVarName) {
  let value = responseBody;

  for (const property of properties) {
    value = value?.[property];
  }

  if (value === undefined || value === null) {
    throw new Error(`Unable to set ${envVarName}; resolved value was empty.`);
  }

  process.env[envVarName] = String(value);
  return process.env[envVarName];
}

export function setEnvVariableString(responseBody, envVarName) {
  if (responseBody === undefined || responseBody === null) {
    throw new Error(`Unable to set ${envVarName}; response body was empty.`);
  }

  process.env[envVarName] = String(responseBody);
  return process.env[envVarName];
}
