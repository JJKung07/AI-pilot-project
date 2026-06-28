import { test, expect } from "@playwright/test";
import { verifyStatus } from "../../utils/responseHelper.js";

test.describe.serial("@booking-validate-parameter", () => {
  let response;

  test.beforeEach(async ({}, testInfo) => {
    testInfo.annotations.push({ type: "Test Case ID", description: "TC-API-VAL" });
  });

  test("1-POST /booking with missing firstname should return 500", async ({ request }) => {
    await test.step("POST /booking with incomplete body", async () => {
      response = await request.post(`${process.env.BASE_URL}/booking`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          lastname: "Brown",
          totalprice: 111,
          depositpaid: true,
          bookingdates: { checkin: "2024-01-01", checkout: "2024-01-02" },
        },
      });
    });

    await test.step("Verify status code is 500 (server rejects invalid data)", async () => {
      await verifyStatus(response, 500);
    });
  });

  test("2-POST /booking with missing bookingdates should return 500", async ({ request }) => {
    await test.step("POST /booking without bookingdates", async () => {
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

  test("3-POST /booking with invalid date format should return 200 or 500", async ({ request }) => {
    await test.step("POST /booking with bad date format", async () => {
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
          bookingdates: { checkin: "not-a-date", checkout: "also-not-a-date" },
        },
      });
    });

    await test.step("Verify status is either 200 (accepted) or 500 (rejected)", async () => {
      expect([200, 500]).toContain(response.status());
    });
  });

  test("4-PUT /booking without auth token should return 403", async ({ request }) => {
    await test.step("PUT /booking/1 without Cookie header", async () => {
      response = await request.put(`${process.env.BASE_URL}/booking/1`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          firstname: "Jim",
          lastname: "Brown",
          totalprice: 111,
          depositpaid: true,
          bookingdates: { checkin: "2024-01-01", checkout: "2024-01-02" },
        },
      });
    });

    await test.step("Verify status code is 403 (Forbidden)", async () => {
      await verifyStatus(response, 403);
    });
  });

  test("5-PATCH /booking without auth token should return 403", async ({ request }) => {
    await test.step("PATCH /booking/1 without Cookie header", async () => {
      response = await request.patch(`${process.env.BASE_URL}/booking/1`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          firstname: "Updated",
        },
      });
    });

    await test.step("Verify status code is 403 (Forbidden)", async () => {
      await verifyStatus(response, 403);
    });
  });

  test("6-DELETE /booking without auth token should return 403", async ({ request }) => {
    await test.step("DELETE /booking/1 without Cookie header", async () => {
      response = await request.delete(`${process.env.BASE_URL}/booking/1`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });
    });

    await test.step("Verify status code is 403 (Forbidden)", async () => {
      await verifyStatus(response, 403);
    });
  });

  test("7-GET /booking with non-existent ID should return 404", async ({ request }) => {
    await test.step("GET /booking/99999999", async () => {
      response = await request.get(`${process.env.BASE_URL}/booking/99999999`, {
        headers: {
          Accept: "application/json",
        },
      });
    });

    await test.step("Verify status code is 404", async () => {
      await verifyStatus(response, 404);
    });
  });
});
