import { test, expect } from '@playwright/test';
import { authenticate, createBooking, patchBooking, updateBooking, getBooking } from '../../../../src/api/bookingClient.js';
import { generateBookingDates } from '../../../utils/dateHelper.js';
import { bookingSchema } from '../../../schema/booking.schema.js';
import { verifySchema, verifyStatus } from '../../../utils/responseHelper.js';

const bookingPayload = {
  firstname: 'Jim',
  lastname: 'Brown',
  totalprice: 111,
  depositpaid: true,
  bookingdates: generateBookingDates(10),
  additionalneeds: 'Breakfast',
};

test.describe.serial('@transfer-out-validate', () => {
  let bookingId;
  let token;
  let response;

  test.beforeAll(async ({ request }) => {
    const authResponse = await authenticate(request, process.env.API_USERNAME ?? 'admin', process.env.API_PASSWORD ?? 'password123');
    await verifyStatus(authResponse, 200);
    const authBody = await authResponse.json();
    token = authBody.token;
  });

  test.beforeEach(async ({}, testInfo) => {
    testInfo.annotations.push({ type: 'Test Case ID', description: 'API-UPD-001' });
  });

  test('update booking with PUT replaces all fields', async ({ request }) => {
    await test.step('Create booking to update', async () => {
      const createResponse = await createBooking(request, bookingPayload);
      const createBody = await createResponse.json();
      bookingId = createBody.bookingid;
    });

    await test.step('Update booking using PUT', async () => {
      response = await updateBooking(request, bookingId, {
        ...bookingPayload,
        firstname: 'John',
        lastname: 'Smith',
      }, token);
    });

    await test.step('Verify the booking changed', async () => {
      await verifyStatus(response, 200);
      const body = await verifySchema(response, bookingSchema);
      expect(body.booking.firstname).toBe('John');
      expect(body.booking.lastname).toBe('Smith');
    });
  });

  test('patch booking firstname only', async ({ request }) => {
    await test.step('Create booking to patch', async () => {
      const createResponse = await createBooking(request, bookingPayload);
      const createBody = await createResponse.json();
      bookingId = createBody.bookingid;
    });

    await test.step('Patch firstname', async () => {
      response = await patchBooking(request, bookingId, { firstname: 'James' }, token);
    });

    await test.step('Verify patch response', async () => {
      await verifyStatus(response, 200);
      const body = await verifySchema(response, bookingSchema);
      expect(body.booking.firstname).toBe('James');
    });
  });

  test('patch booking total price only', async ({ request }) => {
    await test.step('Create booking to patch', async () => {
      const createResponse = await createBooking(request, bookingPayload);
      const createBody = await createResponse.json();
      bookingId = createBody.bookingid;
    });

    await test.step('Patch total price', async () => {
      response = await patchBooking(request, bookingId, { totalprice: 222 }, token);
    });

    await test.step('Verify price update', async () => {
      await verifyStatus(response, 200);
      const body = await verifySchema(response, bookingSchema);
      expect(body.booking.totalprice).toBe(222);
    });
  });

  test('full update booking dates with PUT', async ({ request }) => {
    await test.step('Create booking to update dates', async () => {
      const createResponse = await createBooking(request, bookingPayload);
      const createBody = await createResponse.json();
      bookingId = createBody.bookingid;
    });

    await test.step('Update booking dates', async () => {
      response = await updateBooking(request, bookingId, {
        ...bookingPayload,
        bookingdates: generateBookingDates(20),
      }, token);
    });

    await test.step('Verify the dates were replaced', async () => {
      await verifyStatus(response, 200);
      const body = await verifySchema(response, bookingSchema);
      expect(body.booking.bookingdates.checkin).toBe(generateBookingDates(20).checkin);
      expect(body.booking.bookingdates.checkout).toBe(generateBookingDates(20).checkout);
    });
  });

  test('update with an invalid token returns forbidden', async ({ request }) => {
    await test.step('Create booking for invalid token update', async () => {
      const createResponse = await createBooking(request, bookingPayload);
      const createBody = await createResponse.json();
      bookingId = createBody.bookingid;
    });

    await test.step('Attempt update with invalid token', async () => {
      response = await updateBooking(request, bookingId, bookingPayload, 'invalid-token');
    });

    await test.step('Verify forbidden status', async () => {
      await verifyStatus(response, 403);
    });
  });
});
