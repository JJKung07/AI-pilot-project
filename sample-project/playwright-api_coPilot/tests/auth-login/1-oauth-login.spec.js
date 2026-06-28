import { test, expect } from '@playwright/test';
import { authenticate } from '../../src/api/bookingClient.js';
import { verifyStatus, verifyErrorResponse, setEnvVariableString } from '../utils/responseHelper.js';

const AUTH_TAG = '@oauth';

test.describe.serial(AUTH_TAG, () => {
  let response;
  let responseBody;

  test.beforeEach(async ({}, testInfo) => {
    testInfo.annotations.push({ type: 'Test Case ID', description: 'API-AUTH-001' });
  });

  test('Acquire token using Restful Booker auth endpoint', async ({ request }) => {
    await test.step('Send auth request', async () => {
      response = await authenticate(request, process.env.API_USERNAME ?? 'admin', process.env.API_PASSWORD ?? 'password123');
    });

    await test.step('Verify successful response status', async () => {
      await verifyStatus(response, 200);
    });

    await test.step('Store token in env', async () => {
      responseBody = await response.json();
      setEnvVariableString(responseBody.token, 'API_TOKEN');
    });
  });

  test('Invalid auth credentials return a bad credentials response', async ({ request }) => {
    await test.step('Send invalid auth request', async () => {
      response = await authenticate(request, process.env.API_USERNAME ?? 'admin', 'wrongpassword');
    });

    await test.step('Verify bad credentials response', async () => {
      await verifyStatus(response, 200);
      responseBody = await response.json();
      verifyErrorResponse(responseBody);
      expect(responseBody.reason).toBe('Bad credentials');
    });
  });
});
