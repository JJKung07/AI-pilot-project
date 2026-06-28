import { test, expect } from "@playwright/test";
import { verifyStatus, verifySchema, setEnvVariable } from "../utils/responseHelper.js";
import { authTokenSchema } from "../schema/booking.schema.js";

test.describe.serial("@auth-login", () => {
  let response;
  let responseBody;

  test.beforeEach(async ({}, testInfo) => {
    testInfo.annotations.push({ type: "Test Case ID", description: "TC-AUTH-API-001" });
  });

  test("Authenticate and retrieve token", async ({ request }) => {
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

    await test.step("Verify response matches auth token schema", async () => {
      responseBody = await response.json();
      verifySchema(responseBody, authTokenSchema);
    });

    await test.step("Store token in environment variable", async () => {
      setEnvVariable(responseBody, "token", "TOKEN");
    });
  });

  test("Authenticate with invalid credentials returns error", async ({ request }) => {
    await test.step("POST /auth with invalid credentials", async () => {
      response = await request.post(`${process.env.BASE_URL}/auth`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        data: {
          username: "invalid_user",
          password: "wrong_password",
        },
      });
    });

    await test.step("Verify status code is 200", async () => {
      await verifyStatus(response, 200);
    });

    await test.step("Verify response contains reason for bad credentials", async () => {
      responseBody = await response.json();
      expect(responseBody.reason).toBe("Bad credentials");
    });
  });
});
