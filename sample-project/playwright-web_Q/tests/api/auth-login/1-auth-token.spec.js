import { test } from "@playwright/test";
import { verifyStatus, verifySchema, setEnvVariable } from "../utils/responseHelper.js";
import { authTokenSchema } from "../schema/booking.schema.js";

test.describe.serial("@auth-setup", () => {
  let response;

  test.beforeEach(async ({}, testInfo) => {
    testInfo.annotations.push({ type: "Test Case ID", description: "TC-API-AUTH-001" });
  });

  test("Acquire auth token from /auth endpoint", async ({ request }) => {
    await test.step("POST /auth with valid credentials", async () => {
      response = await request.post(`${process.env.BASE_URL}/auth`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          username: process.env.AUTH_USERNAME,
          password: process.env.AUTH_PASSWORD,
        },
      });
    });

    await test.step("Verify status code is 200", async () => {
      await verifyStatus(response, 200);
    });

    await test.step("Verify response schema and store token", async () => {
      const body = await verifySchema(response, authTokenSchema);
      setEnvVariable(body, "token", "TOKEN");
    });
  });
});
