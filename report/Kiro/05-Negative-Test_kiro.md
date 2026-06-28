# Phase 05 — Negative Testing

**โปรเจกต์**: SwagLabs Commerce Platform  
**บทบาท**: Enterprise QA Engineer  
**วันที่**: 2026-06-28  
**เอกสารอ้างอิง**: `requirements/Business-Rules.md`, `requirements/Acceptance-Criteria.md`, Phase 03 & Phase 04 Outputs

---

> ⚠️ **Disclaimer**: Test cases ในเอกสารนี้มีไว้สำหรับ **functional observation เท่านั้น** และ **ไม่ถือเป็น full penetration test** การทดสอบ security อย่างเต็มรูปแบบต้องดำเนินการโดย Security Team ที่มีเครื่องมือและสิทธิ์เฉพาะ

---

## 1. Authentication — Negative Test Cases

| Test ID | Scenario | Input | Expected Error/Behavior | Risk Level |
|---|---|---|---|---|
| NEG-AUTH-001 | Login ด้วย username ที่ไม่มีในระบบ | username: `hacker123`, password: `secret_sauce` | แสดง error: "Epic sadface: Username and password do not match any user in this service." — ไม่ระบุว่า username หรือ password ผิด | 🟡 Medium |
| NEG-AUTH-002 | Login ด้วย password ผิด | username: `standard_user`, password: `wrong_pass` | แสดง error เดียวกัน (ไม่เปิดเผยว่า user มีอยู่จริง) | 🟡 Medium |
| NEG-AUTH-003 | Login ด้วย locked_out_user | username: `locked_out_user`, password: `secret_sauce` | แสดง error: "Epic sadface: Sorry, this user has been locked out." ผู้ใช้ยังอยู่หน้า login | 🔴 High |
| NEG-AUTH-004 | **SQL Injection attempt ใน username** | username: `' OR '1'='1' --`, password: `anything` | แสดง error authentication failed — ไม่มีการ bypass login, ไม่แสดง DB error | 🔴 High |
| NEG-AUTH-005 | **SQL Injection attempt ใน password** | username: `standard_user`, password: `' OR '1'='1' --` | แสดง error authentication failed — input ถูก sanitize | 🔴 High |
| NEG-AUTH-006 | **XSS attempt ใน username** | username: `<script>alert('XSS')</script>`, password: `test` | ไม่มี script execution, แสดง error message ปกติ, input ถูก escape | 🔴 High |
| NEG-AUTH-007 | **XSS attempt ใน password** | username: `standard_user`, password: `<img src=x onerror=alert(1)>` | ไม่มี script execution, แสดง error ปกติ | 🔴 High |
| NEG-AUTH-008 | Login ด้วย username มี spaces นำหน้า/ท้าย | username: ` standard_user `, password: `secret_sauce` | อาจ login สำเร็จ (trim) หรือแสดง error — ต้อง verify behavior | 🟡 Medium |
| NEG-AUTH-009 | Login ด้วย special characters | username: `!@#$%^&*()`, password: `!@#$%^&*()` | แสดง error ปกติ — ไม่ crash | 🟡 Medium |
| NEG-AUTH-010 | Login ด้วย extremely long input (10000 chars) | username: `"A" × 10000`, password: `"B" × 10000` | แสดง error ปกติ — ไม่ crash, ไม่ hang | 🟡 Medium |

---

## 2. Navigation — Negative Test Cases

| Test ID | Scenario | Input | Expected Error/Behavior | Risk Level |
|---|---|---|---|---|
| NEG-NAV-001 | เข้า `/inventory.html` โดยไม่มี session | URL: `saucedemo.com/inventory.html` (no cookie) | Redirect ไปหน้า login | 🔴 High |
| NEG-NAV-002 | เข้า `/cart.html` โดยไม่มี session | URL: `saucedemo.com/cart.html` (no cookie) | Redirect ไปหน้า login | 🔴 High |
| NEG-NAV-003 | เข้า `/checkout-step-one.html` โดยไม่มี session | URL: `saucedemo.com/checkout-step-one.html` (no cookie) | Redirect ไปหน้า login | 🔴 High |
| NEG-NAV-004 | เข้า `/checkout-step-two.html` โดยไม่มี session | URL: `saucedemo.com/checkout-step-two.html` (no cookie) | Redirect ไปหน้า login | 🔴 High |
| NEG-NAV-005 | เข้า `/checkout-complete.html` โดยไม่มี session | URL: `saucedemo.com/checkout-complete.html` (no cookie) | Redirect ไปหน้า login | 🟡 Medium |
| NEG-NAV-006 | เข้า `/inventory-item.html?id=999` (invalid product ID) | URL with invalid product ID | แสดง error หรือ redirect — ไม่ crash | 🟡 Medium |
| NEG-NAV-007 | Manipulate cart URL parameters | เพิ่ม query params เช่น `?item=99&quantity=100` | ไม่มีผลต่อ cart state — system ไม่รับ URL manipulation | 🟡 Medium |

---

## 3. Checkout — Negative Test Cases

| Test ID | Scenario | Input | Expected Error/Behavior | Risk Level |
|---|---|---|---|---|
| NEG-CHK-001 | Checkout Step 1 — ทุก field ว่าง | First: `""`, Last: `""`, Zip: `""` | แสดง error: "Error: First Name is required" | 🔴 High |
| NEG-CHK-002 | Checkout Step 1 — First Name เป็น spaces only | First: `"   "`, Last: `Doe`, Zip: `12345` | ควรแสดง error (ถ้า trim) หรือผ่าน (ถ้าไม่ trim) — verify behavior | 🟡 Medium |
| NEG-CHK-003 | Checkout Step 1 — Postal Code เป็น special chars | First: `John`, Last: `Doe`, Zip: `!@#$%` | อาจผ่าน (ไม่มี format validation ตาม BRD) หรือ error — verify | 🟡 Medium |
| NEG-CHK-004 | Checkout Step 1 — XSS ใน First Name | First: `<script>alert(1)</script>`, Last: `Doe`, Zip: `12345` | ไม่มี script execution, input ถูก escape/sanitize | 🔴 High |
| NEG-CHK-005 | Checkout Step 1 — SQL Injection ใน Postal Code | First: `John`, Last: `Doe`, Zip: `' DROP TABLE users; --` | ไม่มีผลต่อ database, ระบบ handle gracefully | 🔴 High |
| NEG-CHK-006 | กด browser Back button ระหว่าง checkout (Step 2 → Step 1) | อยู่ที่ Step 2 แล้วกด Back | กลับไป Step 1 — ข้อมูลอาจยังอยู่หรือหาย, checkout flow ไม่เสียหาย | 🟡 Medium |
| NEG-CHK-007 | กด browser Back button หลัง confirmation | อยู่ที่ Complete page แล้วกด Back | ไม่ควร submit order ซ้ำ — ไม่เกิด double submission | 🔴 High |
| NEG-CHK-008 | Checkout ด้วย cart ว่าง | Navigate ไป `/checkout-step-one.html` โดย cart ว่าง | ควร block หรือแสดง warning — ไม่ crash | 🟡 Medium |
| NEG-CHK-009 | Refresh หน้า Checkout Step 2 | กด F5/Refresh บนหน้า Overview | ข้อมูลยังคงแสดงถูกต้อง หรือ redirect ไป step 1 — ไม่ crash | 🟡 Medium |
| NEG-CHK-010 | กด Finish หลายครั้งติดกัน (double click) | Double-click "Finish" button | ไม่เกิด duplicate order — order สำเร็จแค่ครั้งเดียว | 🔴 High |

---

## 4. Cart — Negative Test Cases

| Test ID | Scenario | Input | Expected Error/Behavior | Risk Level |
|---|---|---|---|---|
| NEG-CART-001 | พยายามลบสินค้าที่ไม่ได้อยู่ใน cart | Manipulate DOM เพื่อกด Remove บน item ที่ไม่มี | ไม่มีผลต่อ cart state — no crash | 🟢 Low |
| NEG-CART-002 | เข้า Checkout โดย cart ว่าง | คลิก Checkout โดยไม่มีสินค้า | ควร redirect กลับ หรือแสดง warning | 🟡 Medium |
| NEG-CART-003 | ลบสินค้าขณะอยู่ระหว่าง checkout | เปิด tab ใหม่ ลบสินค้าจาก cart ขณะ tab เดิมอยู่ที่ checkout | Checkout flow handle gracefully — ไม่ crash | 🟡 Medium |
| NEG-CART-004 | เพิ่มสินค้าแล้ว clear cookies | เพิ่ม 3 items แล้ว clear browser cookies | Cart state หายไป — badge reset | 🟢 Low |
| NEG-CART-005 | กด Add to cart หลายครั้งเร็วๆ (spam click) | Click "Add to cart" 10 ครั้งภายใน 1 วินาที | สินค้าเพิ่มแค่ 1 ชิ้น — badge = 1, ไม่มี duplicate | 🟡 Medium |

---

## 5. Sorting — Negative Test Cases

| Test ID | Scenario | Input | Expected Error/Behavior | Risk Level |
|---|---|---|---|---|
| NEG-SORT-001 | เปลี่ยน sort เร็วๆ ติดต่อกัน (rapid switching) | สลับ sort A-Z → Z-A → Low-High → High-Low ภายใน 2 วินาที | สินค้าเรียงถูกต้องตาม sort สุดท้ายที่เลือก — ไม่มี race condition | 🟡 Medium |
| NEG-SORT-002 | เปลี่ยน sort ขณะกำลังเพิ่มสินค้า | คลิก "Add to cart" แล้วเปลี่ยน sort ทันที | Cart state ไม่เปลี่ยน — สินค้าที่เพิ่มยังอยู่ใน cart, ปุ่มยังแสดง "Remove" | 🟡 Medium |
| NEG-SORT-003 | Sort แล้วตรวจสอบ cart badge | เพิ่ม 2 items → เปลี่ยน sort → ตรวจ badge | Badge ยังแสดง "2" ถูกต้องหลังเปลี่ยน sort | 🟢 Low |

---

## 6. OWASP Top 10 Relevant Test Cases

> หมายเหตุ: Test cases เหล่านี้ทดสอบเฉพาะ **functional observation** ว่า application handle input ที่เป็นอันตรายได้อย่าง graceful หรือไม่

| Test ID | OWASP Category | Scenario | Input | Expected Behavior | Risk Level |
|---|---|---|---|---|---|
| NEG-OWASP-001 | A03:2021 Injection | SQL Injection ใน Login username | `' OR 1=1 --` | Login fail — ไม่ bypass authentication | 🔴 High |
| NEG-OWASP-002 | A03:2021 Injection | SQL Injection ใน Login password | `' UNION SELECT * FROM users --` | Login fail — ไม่ leak data | 🔴 High |
| NEG-OWASP-003 | A03:2021 Injection | SQL Injection ใน Checkout fields | First Name: `'; DROP TABLE orders; --` | Checkout proceed/error normally — no DB impact | 🔴 High |
| NEG-OWASP-004 | A07:2021 XSS | Stored XSS ใน First Name | `<script>document.location='http://evil.com'</script>` | Input escaped — no redirect, no script execution | 🔴 High |
| NEG-OWASP-005 | A07:2021 XSS | Reflected XSS ใน URL parameter | `?sort=<script>alert(1)</script>` | ไม่มี script execution — URL param ถูก sanitize | 🔴 High |
| NEG-OWASP-006 | A01:2021 Broken Access Control | เข้าถึง internal pages โดยไม่มี session | Direct URL access to `/inventory.html` | Redirect ไป login page | 🔴 High |
| NEG-OWASP-007 | A01:2021 Broken Access Control | Session reuse หลัง logout | ใช้ session cookie เก่าเข้าถึง internal page | ไม่สามารถเข้าถึงได้ — session invalidated | 🔴 High |

---

## 7. สรุป Negative Test Cases

| หมวดหมู่ | จำนวน Test Cases | High Risk | Medium Risk | Low Risk |
|---|---|---|---|---|
| Authentication | 10 | 5 | 5 | 0 |
| Navigation | 7 | 4 | 3 | 0 |
| Checkout | 10 | 5 | 5 | 0 |
| Cart | 5 | 0 | 3 | 2 |
| Sorting | 3 | 0 | 2 | 1 |
| OWASP Top 10 | 7 | 7 | 0 | 0 |
| **รวม** | **42** | **21** | **18** | **3** |

---

## 8. Risk Distribution

```
High Risk:   ████████████████████░ 21 cases (50%)
Medium Risk: ██████████████████░░░ 18 cases (43%)
Low Risk:    ███░░░░░░░░░░░░░░░░░  3 cases  (7%)
```

**พื้นที่เสี่ยงสูงสุด:**
1. **Authentication Security** — SQL Injection & XSS attempts (OWASP Top 10)
2. **Session Management** — Broken Access Control, unauthorized access
3. **Checkout Integrity** — Double submission, browser back manipulation
4. **Data Validation** — Input sanitization across all forms

---

> ⚠️ **ย้ำอีกครั้ง**: Negative test cases ข้างต้นเป็นการทดสอบ functional observation เท่านั้น ไม่ถือเป็น full penetration test การทดสอบ security เชิงลึกต้องดำเนินการโดยทีม Security โดยใช้เครื่องมือเฉพาะ เช่น OWASP ZAP, Burp Suite เป็นต้น

---

*เอกสารนี้สร้างโดย Kiro AI — Enterprise QA Engineer*
