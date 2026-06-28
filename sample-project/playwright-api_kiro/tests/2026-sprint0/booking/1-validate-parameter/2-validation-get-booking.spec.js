import { test, expect } from "@playwright/test";
import { verifyStatus, verifySchema } from "../../../utils/responseHelper.js";
import { bookingSchema, bookingIdsSchema } from "../../../schema/booking.schema.js";

test.describe.serial("@booking-validate-get", () => {
  let response;
  let responseBody;

  test.beforeEach(async ({}, testInfo) => {
    testInfo.annotations.push({ type: "Test Case ID", description: "TC-API-VAL-GET" });
  });

  test("GET /booking returns list of booking IDs", async ({ request }) => {
    await test.step("Send GET request to /booking", async () => {
      response = await request.get(`${process.env.BASE_URL}/booking`, {
        headers: {
          Accept: "application/json",
        },
      });
    });

    await test.step("Verify status code is 200", async () => {
      await verifyStatus(response, 200);
    });

    await test.step("Verify response matches booking IDs schema", async () => {
      responseBody = await response.json();
      verifySchema(responseBody, bookingIdsSchema);
    });

    await test.step("Verify response is non-empty array", async () => {
      expect(Array.isArray(responseBody)).toBe(true);
      expect(responseBody.length).toBeGreaterThan(0);
    });
  });

  test("GET /booking/:id with valid ID returns booking details", async ({ request }) => {
    let bookingId;

    await test.step("Get a valid booking ID first", async () => {
      const listResponse = await request.get(`${process.env.BASE_URL}/booking`, {
        headers: { Accept: "application/json" },
      });
      const list = await listResponse.json();
      bookingId = list[0].bookingid;
    });

    await test.step("Send GET request to /booking/:id", async () => {
      response = await request.get(`${process.env.BASE_URL}/booking/${bookingId}`, {
        headers: { Accept: "application/json" },
      });
    });

    await test.step("Verify status code is 200", async () => {
      await verifyStatus(response, 200);
    });

    await test.step("Verify response matches booking schema", async () => {
      responseBody = await response.json();
      verifySchema(responseBody, bookingSchema);
    });

    await test.step("Verify required fields exist", async () => {
      expect(responseBody.firstname).toBeDefined();
      expect(responseBody.lastname).toBeDefined();
      expect(responseBody.totalprice).toBeDefined();
      expect(responseBody.bookingdates).toBeDefined();
    });
  });

  test("GET /booking/:id with invalid ID returns 404", async ({ request }) => {
    await test.step("Send GET request with non-existent ID", async () => {
      response = await request.get(`${process.env.BASE_URL}/booking/9999999`, {
        headers: { Accept: "application/json" },
      });
    });

    await test.step("Verify status code is 404", async () => {
      await verifyStatus(response, 404);
    });
  });

  test("GET /booking with filter by firstname", async ({ request }) => {
    await test.step("Send GET request with firstname query param", async () => {
      response = await request.get(`${process.env.BASE_URL}/booking?firstname=Jim`, {
        headers: { Accept: "application/json" },
      });
    });

    await test.step("Verify status code is 200", async () => {
      await verifyStatus(response, 200);
    });

    await test.step("Verify response is array", async () => {
      responseBody = await response.json();
      expect(Array.isArray(responseBody)).toBe(true);
    });
  });
});
