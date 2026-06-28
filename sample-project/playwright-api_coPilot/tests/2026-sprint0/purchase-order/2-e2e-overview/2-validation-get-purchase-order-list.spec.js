import { test } from '@playwright/test';
import { verifyStatus, verifySchema } from '../../../utils/responseHelper.js';

const TAG = '@purchase-order-validate';

const purchaseOrderSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      id: { type: 'number' },
      orderNo: { type: 'string' },
    },
    required: ['id', 'orderNo'],
    additionalProperties: true,
  },
};

test.describe.serial(TAG, () => {
  let response;

  test.beforeEach(async ({}, testInfo) => {
    testInfo.annotations.push({ type: 'Test Case ID', description: 'API-PO-001' });
  });

  test('Get purchase order list returns schema-compliant payload', async ({ request }) => {
    await test.step('GET purchase order list', async () => {
      response = await request.get(`${process.env.PIGPRO_V1}/purchase-order`, {
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${process.env.OAUTH_TOKEN}`,
        },
      });
    });

    await test.step('Verify status code is 200', async () => {
      await verifyStatus(response, 200);
    });

    await test.step('Verify response schema', async () => {
      await verifySchema(response, purchaseOrderSchema);
    });
  });
});
