import { test } from '@playwright/test';
import { authenticate } from '../../src/api/bookingClient.js';
import { authResponseSchema } from '../schema/auth-response.schema.js';
import { errorResponseSchema } from '../schema/error-response.schema.js';
import { setEnvVariableString, verifyErrorResponse, verifySchema, verifyStatus } from '../utils/responseHelper.js';

test.describe.serial('@oauth', () => {
  let authResponse;
  let authBody;

  test.beforeEach(async ({}, testInfo) => {
    testInfo.annotations.push({ type: 'Test Case ID', description: 'API-AUTH-001' });
  });

  test('obtain an auth token with valid credentials', async ({ request }) => {
    await test.step('Send valid auth request', async () => {
      authResponse = await authenticate(request, process.env.API_USERNAME ?? 'admin', process.env.API_PASSWORD ?? 'password123');
    });

    await test.step('Verify auth status and token schema', async () => {
      await verifyStatus(authResponse, 200);
      authBody = await verifySchema(authResponse, authResponseSchema);
      setEnvVariableString(authBody.token, 'API_TOKEN');
    });
  });

  test('auth response contains a token string', async ({ request }) => {
    await test.step('Send valid auth request', async () => {
      authResponse = await authenticate(request, process.env.API_USERNAME ?? 'admin', process.env.API_PASSWORD ?? 'password123');
    });

    await test.step('Verify token field exists and is not empty', async () => {
      await verifyStatus(authResponse, 200);
      authBody = await authResponse.json();
      authBody.token = authBody.token ?? '';
      await verifySchema(authResponse, authResponseSchema);
    });
  });

  test('invalid password returns bad credentials', async ({ request }) => {
    await test.step('Send invalid password auth request', async () => {
      authResponse = await authenticate(request, process.env.API_USERNAME ?? 'admin', 'wrongpassword');
    });

    await test.step('Verify error response', async () => {
      await verifyStatus(authResponse, 200);
      authBody = await authResponse.json();
      verifyErrorResponse(authBody);
      expect(authBody.reason).toBe('Bad credentials');
    });
  });

  test('missing username returns bad credentials', async ({ request }) => {
    await test.step('Send request without username', async () => {
      authResponse = await authenticate(request, '', process.env.API_PASSWORD ?? 'password123');
    });

    await test.step('Verify error response', async () => {
      await verifyStatus(authResponse, 200);
      authBody = await authResponse.json();
      verifyErrorResponse(authBody);
      expect(authBody.reason).toBe('Bad credentials');
    });
  });

  test('missing password returns bad credentials', async ({ request }) => {
    await test.step('Send request without password', async () => {
      authResponse = await authenticate(request, process.env.API_USERNAME ?? 'admin', '');
    });

    await test.step('Verify error response', async () => {
      await verifyStatus(authResponse, 200);
      authBody = await authResponse.json();
      verifyErrorResponse(authBody);
      expect(authBody.reason).toBe('Bad credentials');
    });
  });
});
