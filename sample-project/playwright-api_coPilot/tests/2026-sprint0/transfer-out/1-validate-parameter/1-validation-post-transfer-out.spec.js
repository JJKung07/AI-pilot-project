import { test } from '@playwright/test';
import { verifyStatus, verifyErrorMessage } from '../../../utils/responseHelper.js';
import { errorResponseSchema } from '../../../schema/error-response.schema.js';

const TAG = '@transfer-out-validate';

test.describe.serial(TAG, () => {
  let response;
  let responseBody;

  test.beforeEach(async ({}, testInfo) => {
    testInfo.annotations.push({ type: 'Test Case ID', description: 'API-TO-001' });
  });

  test('Reject empty payload for transfer out creation', async ({ request }) => {
    await test.step('POST empty request body', async () => {
      response = await request.post(`${process.env.PIGPRO_V1}/transfer-out`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.OAUTH_TOKEN}`,
        },
        data: {},
      });
    });

    await test.step('Verify status code is 400', async () => {
      await verifyStatus(response, 400);
    });

    await test.step('Verify error response payload', async () => {
      responseBody = await response.json();
      await verifyErrorMessage(responseBody, '400', 'Validation failed');
    });
  });
});
