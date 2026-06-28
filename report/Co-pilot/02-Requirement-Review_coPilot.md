# ระยะที่ 02 - Requirement Review Report

**เอกสารอ้างอิง**: [ผลลัพธ์ Phase 01](01-Requirement-Analysis_coPilot.md), [BRD](../requirements/BRD.md), [Acceptance Criteria](../requirements/Acceptance-Criteria.md), [Business Rules](../requirements/Business-Rules.md)

## 1. Summary

จากการทบทวน RTM ที่ได้จาก Phase 01 เทียบกับ BRD, Acceptance Criteria และ Business Rules พบว่า requirements หลักส่วนใหญ่มีการ trace ได้ครบถ้วน แต่ยังมีช่องว่างสำคัญบางจุดที่ควรปิดก่อนเริ่ม test design อย่างเป็นทางการ โดยเฉพาะการลบสินค้าจากหน้ารายละเอียดสินค้า, การ redirect เมื่อเข้าถึงหน้า internal โดยไม่ได้ล็อกอิน, การกำหนดพฤติกรรมของ badge ให้ชัดเจน และรายละเอียดของการคำนวณภาษี/การปัดเศษใน checkout

**ข้อสรุประดับสูง**: เอกสารอยู่ในสถานะ **Conditionally Approved** เนื่องจากยังมี criteria และ edge case ที่ต้องเติมให้ครบเพื่อหลีกเลี่ยงความคลาดเคลื่อนระหว่าง QA, BA และ Dev

## 2. Findings

### 2.1 Review of RTM Completeness Against BRD

| BRD Requirement | RTM Status | Review Result | Comment |
|---|---|---|---|
| REQ-01 User Authentication | Covered | Pass with note | ครอบคลุม login, locked-out user, invalid credentials และ logout แล้ว แต่ยังควรมีการยืนยัน redirect behavior สำหรับหน้า internal ที่เกี่ยวกับ session management |
| REQ-02 Product Catalog Browsing | Covered | Pass | ครอบคลุมการแสดงสินค้า 6 รายการและ attribute หลัก |
| REQ-03 Product Sorting and Filtering | Covered | Pass | ครอบคลุม sort mode ที่ระบุใน BRD |
| REQ-04 Product Detail Page | Covered | Pass with note | RTM ครอบคลุมการเข้าหน้ารายละเอียด แต่ acceptance criteria ยังระบุการคลิก title มากกว่าการคลิก title หรือ image ตาม BRD |
| REQ-05 Shopping Cart Management - Add | Covered | Pass | ครอบคลุมการเพิ่มจาก catalog และ detail page |
| REQ-06 Shopping Cart Management - Remove | Partial | Needs clarification | BRD ระบุการลบจาก catalog, detail และ cart page แต่ user stories/AC ยังไม่ครอบคลุม detail page อย่างชัดเจน |
| REQ-07 Shopping Cart Badge | Covered | Pass with note | RTM ครอบคลุม badge แล้ว แต่คำว่า total number of items vs unique items ยังต้องยืนยันให้ตรงกัน |
| REQ-08 Checkout Flow - Step 1 | Covered | Pass | ครอบคลุมฟิลด์ที่จำเป็นทั้ง 3 รายการ |
| REQ-09 Checkout Flow - Step 2 | Covered | Pass with note | ครอบคลุม subtotal, tax และ total แต่ยังต้องเสริม edge case ของการปัดเศษ |
| REQ-10 Checkout Flow - Step 3 | Covered | Pass | ครอบคลุม success message และ empty cart |
| REQ-11 User Logout and Session Management | Partial | Needs clarification | Logout ครอบคลุม แต่ redirect ของ unauthenticated access ไป internal page ยังไม่มี user story/AC ที่ชัดเจน |

### 2.2 Missing Acceptance Criteria for Listed User Stories

| User Story | Missing / Incomplete Acceptance Criteria | Impact |
|---|---|---|
| US-004 View product catalog | ยังไม่ระบุให้ชัดว่า product list ต้องเป็น 6 รายการที่ predefined และราคาต้องเป็นรูปแบบ USD ทุกครั้ง | Medium |
| US-009 View product detail page | AC ระบุการคลิก title แต่ BRD ระบุ title หรือ image; ยังไม่ครอบคลุมการคลิก image | Medium |
| US-012 Remove product to cart from catalog page | ยังไม่ระบุการเปลี่ยนสถานะของ cart badge และผลกระทบต่อ state หลัง remove อย่างครบถ้วน | Medium |
| US-013 View shopping cart | ยังไม่ระบุพฤติกรรมของ cart เมื่อ state เปลี่ยนจากหลายหน้า/หลาย action ใน session เดียวกัน | Medium |
| US-015 Proceed to checkout step 1 | AC ครอบคลุม invalid/empty บางส่วน แต่ยังไม่แยกกรณี missing first name, missing last name, missing postal code แบบรายฟิลด์ให้ครบทุกกรณี | Medium |
| US-016 Complete checkout step 2 | ยังไม่ระบุ edge case ของ tax rounding และความถูกต้องของ total เมื่อ subtotal มีค่าที่ทำให้เกิดเศษทศนิยม | High |
| US-018 Logout from the application | ยังไม่ระบุชัดเจนว่า direct access ไป internal page หลัง logout ต้อง redirect ทันที | High |
| US-020 Cart badge count reflects items added | AC ระบุ unique items added แต่ BRD ใช้คำว่า total number of items; ยังต้องยืนยัน rule เดียวกันทั้งเอกสาร | Medium |

### 2.3 Business Rules With No Clear Test Condition in the RTM

| Business Rule | RTM Coverage Status | Finding |
|---|---|---|
| PROD-03 All prices must be formatted in USD ($x.xx) | Not explicit | RTM ก่อนหน้าครอบคลุม catalog โดยรวม แต่ยังไม่แยกตรวจ format ราคาเป็น test condition เฉพาะ |
| PROD-04 The default sorting order upon login is Name (A-Z) | Not explicit | มี coverage เรื่อง sorting options แต่ไม่มี test condition ระบุ default order หลัง login |
| CART-03 Cart state persists across page navigation within the same active session | Not explicit | ต้องมี test condition เพิ่มเพื่อยืนยัน state persistence ข้ามหน้า |
| CHK-02 Missing any of the three fields in Step 1 must trigger a specific validation error for that field | Partial | AC มี validation แต่ควรแยก error ของแต่ละ field ให้ชัดเจนและตรวจได้ครบ |
| CHK-04 Tax is fixed and calculated as exactly 8% of the item subtotal, rounded to two decimal places | Partial | มีการอ้าง tax 8% แล้ว แต่ยังไม่มี edge case สำหรับ rounding และค่ากลางที่ทำให้เกิดเศษทศนิยม |
| SESS-02 Direct URL access to internal pages without a valid session cookie must redirect to the login page | Not explicit | RTM รอบก่อนกล่าวถึง unauthenticated access ในเชิง narrative แต่ยังไม่มี test condition เฉพาะ |

### 2.4 Suggested Edge Cases to Add to Acceptance Criteria

| Area | Suggested Edge Case | Reason |
|---|---|---|
| Authentication | ล็อกอินด้วย `locked_out_user` ต้องไม่สร้าง session และต้องคงอยู่ที่หน้า login | ยืนยัน boundary case ตาม BRD และลดความเสี่ยงด้าน access control |
| Authentication | ใส่ username/password ว่างพร้อมกัน และตรวจ error ที่แสดง | ครอบคลุม invalid input path แบบชัดเจน |
| Catalog | ตรวจว่าราคาแสดงผลเป็นรูปแบบ `$x.xx` ทุกสินค้า | ตรงกับ PROD-03 |
| Sorting | เปิดหน้า catalog ครั้งแรกหลัง login ต้องเรียง Name A-Z เป็นค่าเริ่มต้น | ตรงกับ PROD-04 |
| Cart | เพิ่มสินค้าหลายรายการ, ย้ายหน้า, แล้วตรวจว่า badge และ cart state ไม่หาย | ตรงกับ CART-03 |
| Cart | ลบสินค้าแล้ว badge ต้องลดลงอย่างถูกต้อง และ state บนทุกหน้าอัปเดตตรงกัน | ลดความเสี่ยงของ inconsistent state |
| Checkout Step 1 | ไม่กรอกแต่ละ field แบบแยกกัน: missing first name, missing last name, missing postal code | ช่วยยืนยัน validation ต่อ field |
| Checkout Step 2 | ทดสอบ subtotal ที่ทำให้ tax เกิดเศษทศนิยมและต้องปัดเป็น 2 ตำแหน่ง | ต้องระบุ CHK-04 ให้ชัด โดยเฉพาะเรื่อง rounding |
| Checkout Step 2 | ตรวจว่าการคำนวณ total = subtotal + tax เสมอ | ป้องกัน mismatch ระหว่าง item total, tax, และ total |
| Checkout Completion | หลัง Finish แล้วกด back button ไม่ควรกลับไปสรุปรายการที่ยังซื้อไม่เสร็จใน session เดิม | เพิ่มความชัดเจนของ post-checkout state |
| Session Management | เข้าตรงไปที่ `/inventory.html` หลัง logout ต้อง redirect ไป login ทันที | ตรงกับ SESS-02 |

## 3. Formal Sign-off Status

| Status | Decision | Rationale |
|---|---|---|
| Requirements Review | Conditionally Approved | ความต้องการหลักมี traceability เพียงพอสำหรับเริ่มเตรียม test design ได้ แต่ยังต้องปิดช่องว่างด้าน acceptance criteria และ business rules ตามรายการข้างต้นก่อนทำการ sign-off ขั้นสุดท้าย |

### Conditions for Final Approval

1. เพิ่ม acceptance criteria สำหรับการคลิก image ใน US-009 และการลบจากหน้ารายละเอียดสินค้าใน US-012/REQ-06
2. ยืนยันและบันทึกกติกาเดียวกันสำหรับ badge count ระหว่าง BRD, User Stories และ Business Rules
3. เพิ่ม test condition สำหรับ default sort order, cart state persistence, direct URL access after logout และ price format USD
4. ขยาย acceptance criteria ของ CHK-04 ให้ครอบคลุม tax rounding cases
