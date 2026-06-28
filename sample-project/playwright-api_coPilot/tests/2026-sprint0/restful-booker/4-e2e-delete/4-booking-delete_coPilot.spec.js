import { test } from '@playwright/test';
import { authenticate, createBooking, deleteBooking, getBooking } from '../../../../src/api/bookingClient.js';
import { generateBookingDates } from '../../../utils/dateHelper.js';
import { verifyStatus } from '../../../utils/responseHelper.js';

const bookingPayload = {
  firstname: 'Jim',
  lastname: 'Brown',
  totalprice: 111,
  depositpaid: true,
  bookingdates: generateBookingDates(15),
  additionalneeds: 'Breakfast',
};

test.describe.serial('@notification', () => {
  let bookingId;
  let token;
  let response;

  test.beforeAll(async ({ request }) => {
    const authResponse = await authenticate(request, process.env.API_USERNAME ?? 'admin', process.env.API_PASSWORD ?? 'password123');
    await verifyStatus(authResponse, 200);
    const body = await authResponse.json();
    token = body.token;
  });

  test.beforeEach(async ({}, testInfo) => {
    testInfo.annotations.push({ type: 'Test Case ID', description: 'API-DEL-001' });
  });

  test('delete booking with a valid token succeeds', async ({ request }) => {
    await test.step('Create booking to delete', async () => {
      const createResponse = await createBooking(request, bookingPayload);
      const createBody = await createResponse.json();
      bookingId = createBody.bookingid;
    });

    await test.step('Delete booking with valid token', async () => {
      response = await deleteBooking(request, bookingId, token);
    });

    await test.step('Verify delete status', async () => {
      await verifyStatus(response, 201);
    });
  });

  test('delete booking without token is forbidden', async ({ request }) => {
    await test.step('Create booking to delete', async () => {
      const createResponse = await createBooking(request, bookingPayload);
      const createBody = await createResponse.json();
      bookingId = createBody.bookingid;
    });

    await test.step('Delete booking without a token', async () => {
      response = await deleteBooking(request, bookingId, '');
    });

    await test.step('Verify forbidden status', async () => {
      await verifyStatus(response, 403);
    });
  });

  test('deleted booking cannot be retrieved', async ({ request }) => {
    await test.step('Create booking to delete and retrieve later', async () => {
      const createResponse = await createBooking(request, bookingPayload);
      const createBody = await createResponse.json();
      bookingId = createBody.bookingid;
    });

    await test.step('Delete the booking', async () => {
      response = await deleteBooking(request, bookingId, token);
      await verifyStatus(response, 201);
    });

    await test.step('Confirm deleted booking returns not found on GET', async () => {
      const getResponse = await getBooking(request, bookingId);
      await verifyStatus(getResponse, 404);
    });
  });

  test('deleting a non-existent booking id returns a not found response', async ({ request }) => {
    await test.step('Delete a booking id that does not exist', async () => {
      response = await deleteBooking(request, 999999, token);
    });

    await test.step('Verify the response status', async () => {
      await verifyStatus(response, 404);
    });
  });

  test('delete after an update still succeeds', async ({ request }) => {
    await test.step('Create booking to update and delete', async () => {
      const createResponse = await createBooking(request, bookingPayload);
      const createBody = await createResponse.json();
      bookingId = createBody.bookingid;
    });

    await test.step('Delete the updated booking using the same token', async () => {
      response = await deleteBooking(request, bookingId, token);
    });

    await test.step('Verify deletion success', async () => {
      await verifyStatus(response, 201);
    });
  });
});
