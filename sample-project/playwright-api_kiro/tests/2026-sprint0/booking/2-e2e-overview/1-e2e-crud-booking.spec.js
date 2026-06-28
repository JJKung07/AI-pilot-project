import { test, expect } from "@playwright/test";
import { verifyStatus, verifySchema } from "../../../utils/responseHelper.js";
import { bookingSchema, bookingResponseSchema } from "../../../schema/booking.schema.js";
import { generateBookingDates } from "../../../utils/dateHelper.js";
import { retryRequest } from "../../../utils/retryHelper.js";

test.describe.serial("@booking-e2e-crud", () => {
  let response;
  let responseBody;
  let bookingId;
  const bookingDates = generateBookingDates(7, 14);

  test.beforeEach(async ({}, testInfo) => {
    testInfo.annotations.push({ type: "Test Case ID", description: "TC-API-E2E-CRUD" });
  });

  test("Step 1: Create a new booking (POST /booking)", async ({ request }) => {
    await test.step("Send POST request to create booking", async () => {
      response = await retryRequest(() =>
        request.post(`${process.env.BASE_URL}/booking`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          data: {
            firstname: "Jim",
            lastname: "Brown",
            totalprice: 111,
            depositpaid: true,
            bookingdates: bookingDates,
            additionalneeds: "Breakfast",
          },
        })
      );
    });

    await test.step("Verify status code is 200", async () => {
      await verifyStatus(response, 200);
    });

    await test.step("Verify response schema and store bookingId", async () => {
      responseBody = await response.json();
      verifySchema(responseBody, bookingResponseSchema);
      bookingId = responseBody.bookingid;
      expect(bookingId).toBeDefined();
      expect(bookingId).toBeGreaterThan(0);
    });

    await test.step("Verify booking data matches input", async () => {
      expect(responseBody.booking.firstname).toBe("Jim");
      expect(responseBody.booking.lastname).toBe("Brown");
      expect(responseBody.booking.totalprice).toBe(111);
      expect(responseBody.booking.depositpaid).toBe(true);
      expect(responseBody.booking.additionalneeds).toBe("Breakfast");
    });
  });

  test("Step 2: Get the created booking (GET /booking/:id)", async ({ request }) => {
    await test.step("Send GET request for created booking", async () => {
      response = await retryRequest(() =>
        request.get(`${process.env.BASE_URL}/booking/${bookingId}`, {
          headers: { Accept: "application/json" },
        })
      );
    });

    await test.step("Verify status code is 200", async () => {
      await verifyStatus(response, 200);
    });

    await test.step("Verify response schema", async () => {
      responseBody = await response.json();
      verifySchema(responseBody, bookingSchema);
    });

    await test.step("Verify booking data matches created data", async () => {
      expect(responseBody.firstname).toBe("Jim");
      expect(responseBody.lastname).toBe("Brown");
      expect(responseBody.totalprice).toBe(111);
      expect(responseBody.depositpaid).toBe(true);
      expect(responseBody.additionalneeds).toBe("Breakfast");
    });
  });

  test("Step 3: Full update booking (PUT /booking/:id)", async ({ request }) => {
    await test.step("Send PUT request with updated data", async () => {
      response = await retryRequest(() =>
        request.put(`${process.env.BASE_URL}/booking/${bookingId}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Cookie: `token=${process.env.TOKEN}`,
          },
          data: {
            firstname: "James",
            lastname: "Wilson",
            totalprice: 222,
            depositpaid: false,
            bookingdates: bookingDates,
            additionalneeds: "Lunch",
          },
        })
      );
    });

    await test.step("Verify status code is 200", async () => {
      await verifyStatus(response, 200);
    });

    await test.step("Verify updated response", async () => {
      responseBody = await response.json();
      verifySchema(responseBody, bookingSchema);
      expect(responseBody.firstname).toBe("James");
      expect(responseBody.lastname).toBe("Wilson");
      expect(responseBody.totalprice).toBe(222);
      expect(responseBody.depositpaid).toBe(false);
      expect(responseBody.additionalneeds).toBe("Lunch");
    });
  });

  test("Step 4: Partial update booking (PATCH /booking/:id)", async ({ request }) => {
    await test.step("Send PATCH request with partial data", async () => {
      response = await retryRequest(() =>
        request.patch(`${process.env.BASE_URL}/booking/${bookingId}`, {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Cookie: `token=${process.env.TOKEN}`,
          },
          data: {
            firstname: "Robert",
            lastname: "Smith",
          },
        })
      );
    });

    await test.step("Verify status code is 200", async () => {
      await verifyStatus(response, 200);
    });

    await test.step("Verify partial update applied correctly", async () => {
      responseBody = await response.json();
      expect(responseBody.firstname).toBe("Robert");
      expect(responseBody.lastname).toBe("Smith");
      // Other fields should remain unchanged
      expect(responseBody.totalprice).toBe(222);
      expect(responseBody.depositpaid).toBe(false);
    });
  });

  test("Step 5: Delete booking (DELETE /booking/:id)", async ({ request }) => {
    await test.step("Send DELETE request", async () => {
      response = await retryRequest(() =>
        request.delete(`${process.env.BASE_URL}/booking/${bookingId}`, {
          headers: {
            "Content-Type": "application/json",
            Cookie: `token=${process.env.TOKEN}`,
          },
        })
      );
    });

    await test.step("Verify status code is 201 (Created — Restful Booker convention)", async () => {
      await verifyStatus(response, 201);
    });
  });

  test("Step 6: Verify booking is deleted (GET /booking/:id)", async ({ request }) => {
    await test.step("Send GET request for deleted booking", async () => {
      response = await request.get(`${process.env.BASE_URL}/booking/${bookingId}`, {
        headers: { Accept: "application/json" },
      });
    });

    await test.step("Verify status code is 404", async () => {
      await verifyStatus(response, 404);
    });
  });
});
