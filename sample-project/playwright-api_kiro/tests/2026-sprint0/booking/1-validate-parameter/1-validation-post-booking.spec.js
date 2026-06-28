import { test, expect } from "@playwright/test";
import { verifyStatus, verifySchema } from "../../../utils/responseHelper.js";
import { bookingResponseSchema } from "../../../schema/booking.schema.js";
import { generateBookingDates } from "../../../utils/dateHelper.js";

test.describe.serial("@booking-validate-post", () => {
  let response;
  let responseBody;
  const bookingDates = generateBookingDates(1, 5);

  test.beforeEach(async ({}, testInfo) => {
    testInfo.annotations.push({ type: "Test Case ID", description: "TC-API-VAL-POST" });
  });

  test("POST /booking with valid payload returns 200", async ({ request }) => {
    await test.step("Send POST request with complete booking data", async () => {
      response = await request.post(`${process.env.BASE_URL}/booking`, {
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
      });
    });

    await test.step("Verify status code is 200", async () => {
      await verifyStatus(response, 200);
    });

    await test.step("Verify response matches booking schema", async () => {
      responseBody = await response.json();
      verifySchema(responseBody, bookingResponseSchema);
    });

    await test.step("Verify response body fields", async () => {
      expect(responseBody.booking.firstname).toBe("Jim");
      expect(responseBody.booking.lastname).toBe("Brown");
      expect(responseBody.booking.totalprice).toBe(111);
      expect(responseBody.booking.depositpaid).toBe(true);
      expect(responseBody.bookingid).toBeDefined();
    });
  });

  test("POST /booking with missing firstname returns 500", async ({ request }) => {
    await test.step("Send POST request missing firstname", async () => {
      response = await request.post(`${process.env.BASE_URL}/booking`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          lastname: "Brown",
          totalprice: 111,
          depositpaid: true,
          bookingdates: bookingDates,
        },
      });
    });

    await test.step("Verify status code is 500 (Internal Server Error)", async () => {
      await verifyStatus(response, 500);
    });
  });

  test("POST /booking with missing lastname returns 500", async ({ request }) => {
    await test.step("Send POST request missing lastname", async () => {
      response = await request.post(`${process.env.BASE_URL}/booking`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          firstname: "Jim",
          totalprice: 111,
          depositpaid: true,
          bookingdates: bookingDates,
        },
      });
    });

    await test.step("Verify status code is 500", async () => {
      await verifyStatus(response, 500);
    });
  });

  test("POST /booking with missing bookingdates returns 500", async ({ request }) => {
    await test.step("Send POST request missing bookingdates", async () => {
      response = await request.post(`${process.env.BASE_URL}/booking`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          firstname: "Jim",
          lastname: "Brown",
          totalprice: 111,
          depositpaid: true,
        },
      });
    });

    await test.step("Verify status code is 500", async () => {
      await verifyStatus(response, 500);
    });
  });

  test("POST /booking with empty body returns 500", async ({ request }) => {
    await test.step("Send POST request with empty body", async () => {
      response = await request.post(`${process.env.BASE_URL}/booking`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {},
      });
    });

    await test.step("Verify status code is 500", async () => {
      await verifyStatus(response, 500);
    });
  });

  test("POST /booking with invalid totalprice type returns 500", async ({ request }) => {
    await test.step("Send POST with string totalprice", async () => {
      response = await request.post(`${process.env.BASE_URL}/booking`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          firstname: "Jim",
          lastname: "Brown",
          totalprice: "not_a_number",
          depositpaid: true,
          bookingdates: bookingDates,
        },
      });
    });

    await test.step("Verify status code is 500 or 400", async () => {
      const status = response.status();
      expect([400, 500]).toContain(status);
    });
  });
});
