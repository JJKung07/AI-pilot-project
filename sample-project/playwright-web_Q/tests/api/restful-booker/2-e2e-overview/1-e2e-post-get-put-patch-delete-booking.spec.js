import { test, expect } from "@playwright/test";
import { verifyStatus, verifySchema } from "../../utils/responseHelper.js";
import { retryRequest } from "../../utils/retryHelper.js";
import { createBookingResponseSchema, bookingSchema, bookingIdsSchema } from "../../schema/booking.schema.js";

test.describe.serial("@booking-e2e-crud", () => {
  let response;
  let responseBody;
  let bookingId;

  const newBooking = {
    firstname: "Jim",
    lastname: "Brown",
    totalprice: 111,
    depositpaid: true,
    bookingdates: {
      checkin: "2024-01-01",
      checkout: "2024-01-02",
    },
    additionalneeds: "Breakfast",
  };

  const updatedBooking = {
    firstname: "James",
    lastname: "Smith",
    totalprice: 222,
    depositpaid: false,
    bookingdates: {
      checkin: "2024-02-01",
      checkout: "2024-02-05",
    },
    additionalneeds: "Lunch",
  };

  test("1-GET /booking - Get all booking IDs", async ({ request }) => {
    await test.step("GET /booking", async () => {
      response = await retryRequest(() =>
        request.get(`${process.env.BASE_URL}/booking`, {
          headers: { Accept: "application/json" },
        })
      );
    });

    await test.step("Verify status code is 200", async () => {
      await verifyStatus(response, 200);
    });

    await test.step("Verify response schema (array of booking IDs)", async () => {
      await verifySchema(response, bookingIdsSchema);
    });
  });

  test("2-POST /booking - Create a new booking", async ({ request }) => {
    await test.step("POST /booking with valid data", async () => {
      response = await request.post(`${process.env.BASE_URL}/booking`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: newBooking,
      });
    });

    await test.step("Verify status code is 200", async () => {
      await verifyStatus(response, 200);
    });

    await test.step("Verify response schema and store bookingId", async () => {
      responseBody = await verifySchema(response, createBookingResponseSchema);
      bookingId = responseBody.bookingid;
      expect(bookingId).toBeGreaterThan(0);
    });

    await test.step("Verify response body matches request", async () => {
      expect(responseBody.booking.firstname).toBe(newBooking.firstname);
      expect(responseBody.booking.lastname).toBe(newBooking.lastname);
      expect(responseBody.booking.totalprice).toBe(newBooking.totalprice);
      expect(responseBody.booking.depositpaid).toBe(newBooking.depositpaid);
      expect(responseBody.booking.bookingdates.checkin).toBe(newBooking.bookingdates.checkin);
      expect(responseBody.booking.bookingdates.checkout).toBe(newBooking.bookingdates.checkout);
      expect(responseBody.booking.additionalneeds).toBe(newBooking.additionalneeds);
    });
  });

  test("3-GET /booking/{id} - Get created booking", async ({ request }) => {
    await test.step("GET /booking by ID", async () => {
      response = await request.get(`${process.env.BASE_URL}/booking/${bookingId}`, {
        headers: { Accept: "application/json" },
      });
    });

    await test.step("Verify status code is 200", async () => {
      await verifyStatus(response, 200);
    });

    await test.step("Verify response schema", async () => {
      responseBody = await verifySchema(response, bookingSchema);
    });

    await test.step("Verify response body matches created booking", async () => {
      expect(responseBody.firstname).toBe(newBooking.firstname);
      expect(responseBody.lastname).toBe(newBooking.lastname);
      expect(responseBody.totalprice).toBe(newBooking.totalprice);
    });
  });

  test("4-PUT /booking/{id} - Full update booking", async ({ request }) => {
    await test.step("PUT /booking with auth token", async () => {
      response = await request.put(`${process.env.BASE_URL}/booking/${bookingId}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Cookie: `token=${process.env.TOKEN}`,
        },
        data: updatedBooking,
      });
    });

    await test.step("Verify status code is 200", async () => {
      await verifyStatus(response, 200);
    });

    await test.step("Verify response schema", async () => {
      responseBody = await verifySchema(response, bookingSchema);
    });

    await test.step("Verify response body matches updated data", async () => {
      expect(responseBody.firstname).toBe(updatedBooking.firstname);
      expect(responseBody.lastname).toBe(updatedBooking.lastname);
      expect(responseBody.totalprice).toBe(updatedBooking.totalprice);
      expect(responseBody.depositpaid).toBe(updatedBooking.depositpaid);
      expect(responseBody.additionalneeds).toBe(updatedBooking.additionalneeds);
    });
  });

  test("5-PATCH /booking/{id} - Partial update booking", async ({ request }) => {
    const partialUpdate = { firstname: "Jane", lastname: "Doe" };

    await test.step("PATCH /booking with partial data", async () => {
      response = await request.patch(`${process.env.BASE_URL}/booking/${bookingId}`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Cookie: `token=${process.env.TOKEN}`,
        },
        data: partialUpdate,
      });
    });

    await test.step("Verify status code is 200", async () => {
      await verifyStatus(response, 200);
    });

    await test.step("Verify response schema", async () => {
      responseBody = await verifySchema(response, bookingSchema);
    });

    await test.step("Verify partial fields updated", async () => {
      expect(responseBody.firstname).toBe(partialUpdate.firstname);
      expect(responseBody.lastname).toBe(partialUpdate.lastname);
    });

    await test.step("Verify non-updated fields remain unchanged", async () => {
      expect(responseBody.totalprice).toBe(updatedBooking.totalprice);
      expect(responseBody.depositpaid).toBe(updatedBooking.depositpaid);
    });
  });

  test("6-DELETE /booking/{id} - Delete booking", async ({ request }) => {
    await test.step("DELETE /booking with auth token", async () => {
      response = await request.delete(`${process.env.BASE_URL}/booking/${bookingId}`, {
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${process.env.TOKEN}`,
        },
      });
    });

    await test.step("Verify status code is 201 (Created/Deleted)", async () => {
      await verifyStatus(response, 201);
    });
  });

  test("7-GET /booking/{id} - Verify booking is deleted", async ({ request }) => {
    await test.step("GET /booking for deleted ID", async () => {
      response = await request.get(`${process.env.BASE_URL}/booking/${bookingId}`, {
        headers: { Accept: "application/json" },
      });
    });

    await test.step("Verify status code is 404 (Not Found)", async () => {
      await verifyStatus(response, 404);
    });
  });
});
