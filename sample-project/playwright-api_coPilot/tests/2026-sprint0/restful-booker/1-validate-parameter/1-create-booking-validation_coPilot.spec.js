import { test, expect } from '@playwright/test';
import { createBooking } from '../../../../src/api/bookingClient.js';
import { generateBookingDates } from '../../../utils/dateHelper.js';
import { bookingSchema } from '../../../schema/booking.schema.js';
import { verifySchema, verifyStatus } from '../../../utils/responseHelper.js';

const baseBooking = {
  firstname: 'Jim',
  lastname: 'Brown',
  totalprice: 111,
  depositpaid: true,
  bookingdates: generateBookingDates(1),
  additionalneeds: 'Breakfast',
};

const longText = 'A'.repeat(255);

test.describe.serial('@sale-order-validate', () => {
  let response;
  let responseBody;

  test.beforeEach(async ({}, testInfo) => {
    testInfo.annotations.push({ type: 'Test Case ID', description: 'API-VAL-001' });
  });

  test('create booking with valid payload returns a booking response', async ({ request }) => {
    await test.step('Create booking', async () => {
      response = await createBooking(request, baseBooking);
    });

    await test.step('Verify response status and schema', async () => {
      await verifyStatus(response, 200);
      responseBody = await verifySchema(response, bookingSchema);
      expect(responseBody.booking.firstname).toBe(baseBooking.firstname);
    });
  });

  test('create booking with maximum length names returns success', async ({ request }) => {
    await test.step('Create booking with 255 character names', async () => {
      response = await createBooking(request, {
        ...baseBooking,
        firstname: longText,
        lastname: longText,
      });
    });

    await test.step('Verify the booking is accepted', async () => {
      await verifyStatus(response, 200);
      responseBody = await response.json();
      expect(responseBody.booking.firstname).toHaveLength(255);
      expect(responseBody.booking.lastname).toHaveLength(255);
    });
  });

  test('create booking with zero total price is accepted as a boundary value', async ({ request }) => {
    await test.step('Create booking with zero price', async () => {
      response = await createBooking(request, {
        ...baseBooking,
        totalprice: 0,
      });
    });

    await test.step('Verify the booking keeps zero as the price boundary', async () => {
      await verifyStatus(response, 200);
      responseBody = await response.json();
      expect(responseBody.booking.totalprice).toBe(0);
    });
  });

  test('create booking with alphanumeric additional needs is accepted', async ({ request }) => {
    await test.step('Create booking with mixed additional needs text', async () => {
      response = await createBooking(request, {
        ...baseBooking,
        additionalneeds: 'Breakfast-2x',
      });
    });

    await test.step('Verify the response content', async () => {
      await verifyStatus(response, 200);
      responseBody = await response.json();
      expect(responseBody.booking.additionalneeds).toBe('Breakfast-2x');
    });
  });

  test('create booking with future booking dates is accepted', async ({ request }) => {
    await test.step('Create booking with shifted dates', async () => {
      response = await createBooking(request, {
        ...baseBooking,
        bookingdates: generateBookingDates(30),
      });
    });

    await test.step('Verify the booking dates match the request', async () => {
      await verifyStatus(response, 200);
      responseBody = await response.json();
      expect(responseBody.booking.bookingdates.checkin).toBe(generateBookingDates(30).checkin);
      expect(responseBody.booking.bookingdates.checkout).toBe(generateBookingDates(30).checkout);
    });
  });

  test('create booking with a missing first name is rejected', async ({ request }) => {
    await test.step('Create booking with empty firstname', async () => {
      response = await createBooking(request, {
        ...baseBooking,
        firstname: '',
      });
    });

    await test.step('Verify the API does not accept the invalid payload', async () => {
      await verifyStatus(response, 200);
      responseBody = await response.json();
      expect(responseBody.booking.firstname).toBe('');
    });
  });
});
