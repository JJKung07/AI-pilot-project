# AI Test Generation Guide

คู่มือสำหรับให้ AI สร้าง API test cases ตาม structure และ pattern ของ project นี้

---

## Project Overview

- **Framework:** Playwright Test (API Testing)
- **Language:** JavaScript (ES Modules)
- **Package Manager:** npm
- **Node Type:** `"type": "module"` ใน package.json

---

## Project Structure

```
PigPro_Alpha_API_Playwright/
├── playwright.config.js
├── package.json
├── .env                          # Environment variables (secrets)
├── tests/
│   ├── auth-login/               # Authentication setup (runs first)
│   │   ├── 1-oauth-login.spec.js
│   │   └── 2-auth-azure-ad-login.spec.js
│   ├── utils/
│   │   ├── responseHelper.js     # Shared assertion helpers
│   │   └── dateHelper.js         # Date utility functions
│   ├── schema/
│   │   └── error-response.schema.js  # JSON Schema definitions
│   ├── <sprint-folder>/          # Tests grouped by sprint
│   │   └── <feature-folder>/     # Feature name (e.g., sale-order)
│   │       ├── 1-validate-parameter/   # Parameter validation tests
│   │       ├── 2-e2e-overview/         # E2E overview tests
│   │       ├── 3-e2e-breeder-50/       # E2E by stock type
│   │       ├── 4-e2e-fattening-51/
│   │       └── 5-e2e-piglet-52/
```

### Sprint Folder Naming Convention

- `2026-sprint0/`
- `2026-sprint1/`
- `2026-sprint2/`
- `2026-sprint3-5/`
- `2026-sprint6-7/`
- `2026-sprint8-10/`

### Feature Folder Examples

- `sale-order/`
- `confirm-sale-order/`
- `purchase-order/`
- `transfer-out/`
- `transfer-in/`
- `notification/`

### Test Sub-folder Pattern

- `1-validate-parameter/` — ทดสอบ validation ของ parameters
- `2-e2e-overview/` — ทดสอบ E2E flow ภาพรวม
- `3-e2e-breeder-50/` — E2E เฉพาะ stock type breeder (50)
- `4-e2e-fattening-51/` — E2E เฉพาะ stock type fattening (51)
- `5-e2e-piglet-52/` — E2E เฉพาะ stock type piglet (52)

---

## Test File Naming Convention

```
<number>-<action>-<http-method>-<endpoint-name>.spec.js
```

ตัวอย่าง:
- `6-validation-post-sale-order-50.spec.js`
- `7-validation-post-sale-order-51.spec.js`
- `9-validation-patch-sale-order-50.spec.js`
- `2-validation-get-sale-order-log.spec.js`
- `3-validation-get-sale-order-purchase-order-list.spec.js`

---

## Playwright Config Pattern

```js
import { defineConfig } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig({
  testDir: "./tests",
  reporter: [
    ["html", { open: "always" }],
    ["junit", { outputFile: "test-results/junit.xml" }]
  ],
  fullyParallel: false,
  workers: 1,
  timeout: 120000,
  use: {
    trace: "on-first-retry",
  },
  projects: [
    {
      name: 'auth-setup',
      testMatch: /auth-login.*\.spec\.js/,
    },
    {
      name: 'tests',
      dependencies: ['auth-setup'],
      testIgnore: [
        /auth-login.*\.spec\.js/,
        // ignore specific sprint or test files as needed
      ],
    },
  ],
});
```

---

## Test Code Pattern

### Import Statement

```js
import { test } from "@playwright/test";
import { verifyStatus, verifySchema, verifyErrorResponse, verifyErrorMessage } from "../../../utils/responseHelper.js";
import { generateReceiveDate } from "../../../utils/dateHelper.js";
```

> **Note:** ปรับ relative path (`../../../`) ตามความลึกของไฟล์

### Test Structure (Serial)

```js
test.describe.serial("@<tag-name>", () => {
  let response;
  let responseBody;

  // ตัวแปรที่ใช้ร่วมกัน
  let someVariable;

  test.beforeAll(async () => {
    // Setup ที่ต้องทำก่อน tests ทั้งหมด
  });

  test.beforeEach(async ({}, testInfo) => {
    testInfo.annotations.push({ type: "Test Case ID", description: "<TCID>" });
  });

  test("Test name description", async ({ request }) => {
    await test.step("Step description", async () => {
      // API call
    });

    await test.step("Verify status code is <code>", async () => {
      await verifyStatus(response, 200);
    });

    await test.step("Verify response body", async () => {
      responseBody = await response.json();
      // assertions
    });
  });
});
```

### API Call Patterns

#### POST Request

```js
response = await request.post(`${process.env.BASE_URL}/endpoint`, {
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    Authorization: `Bearer ${process.env.TOKEN}`,
  },
  data: {
    // request body
  }
});
```

#### GET Request

```js
response = await request.get(`${process.env.BASE_URL}/endpoint?param=value`, {
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    Authorization: `Bearer ${process.env.TOKEN}`,
  },
});
```

#### PATCH Request

```js
response = await request.patch(`${process.env.BASE_URL}/endpoint/${id}`, {
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
    Authorization: `Bearer ${process.env.TOKEN}`,
  },
  data: {
    // update body
  }
});
```

#### OAuth Form POST

```js
response = await request.post(`${process.env.OAUTH_URL}`, {
  form: {
    client_id: process.env.CLIENT_ID,
    grant_type: "password",
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    scope: process.env.SCOPE,
    client_secret: process.env.CLIENT_SECRET,
  },
});
```

---

## Utility Functions

### responseHelper.js

| Function | Description |
|----------|-------------|
| `verifyStatus(response, expectedStatus)` | ตรวจสอบ HTTP status code |
| `verifySchema(response, schema)` | ตรวจสอบ response ตาม JSON Schema (ใช้ Ajv) |
| `verifyErrorResponse(responseBody)` | ตรวจสอบว่า error response ตรงตาม error schema |
| `verifyErrorMessage(responseBody, code, message)` | ตรวจสอบ error code & message |
| `verifyErrorMessageDataNotFound(responseBody, code, message)` | ตรวจสอบ data not found error |
| `setEnvVariable(responseBody, properties, envVarName)` | ดึงค่าจาก response เก็บใน env |
| `setEnvVariableString(responseBody, envVarName)` | เก็บค่า string ใน env |

### dateHelper.js

| Function | Description |
|----------|-------------|
| `generateReceiveDate(daysOffset)` | สร้างวันที่ format `YYYY-MM-DDTHH:mm:ss.SSZ` |
| `generateReceiveDateResponse(daysOffset)` | สร้างวันที่ format `YYYY-MM-DDT17:00:00` |
| `generateDateResponse(daysOffset)` | สร้างวันที่ format `YYYY-MM-DD` |
| `generateHistoryTimeStampResponse(daysOffset)` | สร้างวันที่ format `YYYY-MM-DD` |

### Schema Definition Pattern

```js
export const errorResponseSchema = {
  "type": "object",
  "properties": {
    "code": { "type": "string" },
    "message": { "type": "string" }
  },
  "required": ["code", "message"]
};
```

---

## Environment Variables (.env)

ตัวแปรที่ใช้ใน project (ห้ามใส่ค่าจริง):

```env
# OAuth
OAUTH=<oauth-token-endpoint-url>
CLIENT_ID=<client-id>
CLIENT_SECRET=<client-secret>
USERNAME=<username>
PASSWORD=<password>
SCOPE=<scope>

# API Base URLs
PIGPRO_V1=<api-base-url-v1>

# Tokens (set dynamically during auth-setup)
TOKEN=<bearer-token>
OAUTH_TOKEN=<oauth-access-token>
```

---

## Test Tags

ใช้ใน `test.describe` เพื่อ group tests:

- `@sale-order-validate`
- `@confirm-sale-order-validate`
- `@purchase-order-validate`
- `@transfer-out-validate`
- `@transfer-in-validate`
- `@notification`
- `@oauth`

---

## Common Test Scenarios

### 1. Parameter Validation Tests

- Missing required fields → expect 400 + error message
- Invalid data types → expect 400
- Empty string values → expect 400
- Invalid enum values → expect 400
- Null values → expect 400

### 2. E2E Flow Tests

- Create resource → verify 200 + response schema
- Get resource → verify data matches
- Update resource → verify 200
- Get updated resource → verify changes
- Delete/Cancel resource → verify status

### 3. Authentication Tests

- OAuth token acquisition → store token in env
- Azure AD login → store token in env

---

## Key Conventions

1. **Serial execution** — tests ใน describe เดียวกันรันตามลำดับ (`test.describe.serial`)
2. **test.step** — ทุก action ต้องอยู่ใน `test.step()` เพื่อ reporting ที่ชัดเจน
3. **Token from env** — ใช้ `process.env.TOKEN` หรือ `process.env.OAUTH_TOKEN` สำหรับ auth
4. **Prepare data first** — test แรกใน describe มักเป็น "Prepare" เพื่อสร้างข้อมูลก่อน
5. **Annotation** — ใส่ Test Case ID ใน `testInfo.annotations`
6. **Error logging** — `verifyStatus` จะ log response body เมื่อ status ไม่ตรง
7. **Schema validation** — ใช้ Ajv library สำหรับ JSON Schema validation
8. **No parallel** — workers: 1, fullyParallel: false เนื่องจาก tests มี dependency กัน

---

## Instructions for AI

เมื่อสร้าง test ใหม่:

1. สร้างไฟล์ใน folder ที่เหมาะสมตาม sprint และ feature
2. ตั้งชื่อไฟล์ตาม naming convention
3. ใช้ `test.describe.serial` เสมอ
4. ทุก API call ต้องอยู่ใน `test.step`
5. ใช้ helper functions จาก `utils/` แทนการเขียน assertion เอง
6. อ้างอิง env variables สำหรับ URLs และ tokens
7. ใส่ Test Case ID ใน annotations
8. เขียน prepare data test ก่อนถ้า test ต้องการข้อมูล
9. ใช้ relative path ที่ถูกต้องสำหรับ imports
10. ห้ามใส่ค่า secrets หรือข้อมูลจริงในไฟล์ test — ใช้ env variables เท่านั้น
