import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true, strict: false });

export async function verifyStatus(response, expectedStatus) {
  if (response.status() !== expectedStatus) {
    const body = await response.text();
    throw new Error(`Expected status ${expectedStatus} but received ${response.status()}\nResponse body: ${body}`);
  }
}

export async function verifySchema(response, schema) {
  const responseBody = await response.json();
  const validate = ajv.compile(schema);
  const valid = validate(responseBody);
  if (!valid) {
    throw new Error(`Schema validation failed: ${ajv.errorsText(validate.errors)}`);
  }
}

export async function verifyErrorResponse(responseBody) {
  if (!responseBody || typeof responseBody !== 'object') {
    throw new Error('Response body is not an object');
  }
  if (!('message' in responseBody)) {
    throw new Error('Error response must contain message');
  }
}

export async function verifyErrorMessage(responseBody, code, message) {
  await verifyErrorResponse(responseBody);
  if (responseBody.code !== code || responseBody.message !== message) {
    throw new Error(`Expected error code/message ${code} / ${message} but got ${responseBody.code} / ${responseBody.message}`);
  }
}

export async function verifyErrorMessageDataNotFound(responseBody, code, message) {
  await verifyErrorMessage(responseBody, code, message);
}

export function setEnvVariable(responseBody, properties, envVarName) {
  const value = properties.reduce((currentValue, property) => currentValue?.[property], responseBody);
  if (value === undefined || value === null) {
    throw new Error(`Unable to resolve ${envVarName} from response body`);
  }
  process.env[envVarName] = String(value);
}

export function setEnvVariableString(responseBody, envVarName) {
  if (typeof responseBody !== 'string') {
    throw new Error(`Expected string response body for ${envVarName}`);
  }
  process.env[envVarName] = responseBody;
}
