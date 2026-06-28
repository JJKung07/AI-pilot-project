import { test, expect } from '@playwright/test';
import { createBooking, getBooking, listBookings } from '../../../../src/api/bookingClient.js';
import { generateBookingDates } from '../../../utils/dateHelper.js';
import { bookingListSchema } from '../../../schema/booking-list.schema.js';
import { bookingSchema } from '../../../schema/booking.schema.js';
import { verifySchema, verifyStatus } from '../../../utils/responseHelper.js';

const bookingPayload = {
  firstname: 'Jim',
  lastname: 'Brown',
  totalprice: 111,
  depositpaid: true,
  bookingdates: generateBookingDates(5),
  additionalneeds: 'Breakfast',
};

test.describe.serial('@purchase-order-validate', () => {
  let createdBookingId;
  let createResponse;
  let listResponse;
  let getResponse;

  test.beforeEach(async ({}, testInfo) => {
    testInfo.annotations.push({ type: 'Test Case ID', description: 'API-OVR-001' });
  });

  test('create a booking and capture booking id', async ({ request }) => {
    await test.step('Create booking', async () => {
      createResponse = await createBooking(request, bookingPayload);
    });

    await test.step('Extract booking id from response', async () => {
      await verifyStatus(createResponse, 200);
      const body = await createResponse.json();
      createdBookingId = body.bookingid;
      expect(createdBookingId).toBeGreaterThan(0);
    });
  });

  test('get booking by id returns the created booking details', async ({ request }) => {
    await test.step('Create a booking for detail lookup', async () => {
      createResponse = await createBooking(request, bookingPayload);
      const body = await createResponse.json();
      createdBookingId = body.bookingid;
    });

    await test.step('Get booking details by id', async () => {
      getResponse = await getBooking(request, createdBookingId);
    });

    await test.step('Verify booking detail schema', async () => {
      await verifyStatus(getResponse, 200);
      const body = await verifySchema(getResponse, bookingSchema);
      expect(body.booking.firstname).toBe(bookingPayload.firstname);
      expect(body.booking.lastname).toBe(bookingPayload.lastname);
    });
  });

  test('list bookings by firstname returns a matching booking id', async ({ request }) => {
    await test.step('Create a booking for firstname search', async () => {
      createResponse = await createBooking(request, bookingPayload);
      const body = await createResponse.json();
      createdBookingId = body.bookingid;
    });

    await test.step('Query bookings by firstname', async () => {
      listResponse = await listBookings(request, { firstname: bookingPayload.firstname });
    });

    await test.step('Verify list response', async () => {
      await verifyStatus(listResponse, 200);
      const body = await verifySchema(listResponse, bookingListSchema);
      expect(body.some((item) => item.bookingid === createdBookingId)).toBe(true);
    });
  });

  test('list bookings by lastname returns a matching booking id', async ({ request }) => {
    await test.step('Create a booking for lastname search', async () => {
      createResponse = await createBooking(request, bookingPayload);
      const body = await createResponse.json();
      createdBookingId = body.bookingid;
    });

    await test.step('Query bookings by lastname', async () => {
      listResponse = await listBookings(request, { lastname: bookingPayload.lastname });
    });

    await test.step('Verify list response', async () => {
      await verifyStatus(listResponse, 200);
      const body = await verifySchema(listResponse, bookingListSchema);
      expect(body.some((item) => item.bookingid === createdBookingId)).toBe(true);
    });
  });

  test('list bookings by date range returns a result array', async ({ request }) => {
    await test.step('Create a booking for date filter lookup', async () => {
      createResponse = await createBooking(request, bookingPayload);
      const body = await createResponse.json();
      createdBookingId = body.bookingid;
    });

    await test.step('Query bookings with date filters', async () => {
      listResponse = await listBookings(request, {
        checkin: bookingPayload.bookingdates.checkin,
        checkout: bookingPayload.bookingdates.checkout,
      });
    });

    await test.step('Verify the booking list structure', async () => {
      await verifyStatus(listResponse, 200);
      const body = await verifySchema(listResponse, bookingListSchema);
      expect(Array.isArray(body)).toBe(true);
      expect(body.length).toBeGreaterThanOrEqual(0);
    });
  });
});
