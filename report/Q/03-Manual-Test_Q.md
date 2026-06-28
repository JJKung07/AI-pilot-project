# ระยะที่ 03 — การออกแบบ Manual Test Cases

**ข้อมูลนำเข้า**: [User Stories](../../requirements/User-Stories.md) | [Acceptance Criteria](../../requirements/Acceptance-Criteria.md) | [Business Rules](../../requirements/Business-Rules.md) | [Phase 02 Review](02-Requirement-Review_Q.md)

---

## โมดูล: Authentication

### TC-AUTH-001: ล็อกอินด้วยข้อมูลที่ถูกต้อง (standard_user)
- **Preconditions**: Given ผู้ใช้เปิดเบราว์เซอร์และอยู่ที่หน้า https://www.saucedemo.com
- **Steps**:
  1. กรอก username "standard_user"
  2. กรอก password "secret_sauce"
  3. คลิกปุ่ม Login
- **Expected Result**: ระบบ redirect ไปหน้า /inventory.html และแสดงสินค้า 6 รายการ
- **Actual Result**: _
- **Status**: _
- **Priority**: High

### TC-AUTH-002: ล็อกอินด้วย locked_out_user
- **Preconditions**: Given ผู้ใช้อยู่ที่หน้า login
- **Steps**:
  1. กรอก username "locked_out_user"
  2. กรอก password "secret_sauce"
  3. คลิกปุ่ม Login
- **Expected Result**: แสดง error "Epic sadface: Sorry, this user has been locked out." และยังอยู่ที่หน้า login
- **Actual Result**: _
- **Status**: _
- **Priority**: High

### TC-AUTH-003: ล็อกอินด้วยรหัสผ่านผิด
- **Preconditions**: Given ผู้ใช้อยู่ที่หน้า login
- **Steps**:
  1. กรอก username "standard_user"
  2. กรอก password "wrong_pass"
  3. คลิกปุ่ม Login
- **Expected Result**: แสดง error "Epic sadface: Username and password do not match any user in this service."
- **Actual Result**: _
- **Status**: _
- **Priority**: High

### TC-AUTH-004: ล็อกอินโดยไม่กรอก username และ password
- **Preconditions**: Given ผู้ใช้อยู่ที่หน้า login
- **Steps**:
  1. ปล่อยช่อง username และ password ว่าง
  2. คลิกปุ่ม Login
- **Expected Result**: แสดง error "Epic sadface: Username is required"
- **Actual Result**: _
- **Status**: _
- **Priority**: High

### TC-AUTH-005: ล็อกอินโดยไม่กรอก password
- **Preconditions**: Given ผู้ใช้อยู่ที่หน้า login
- **Steps**:
  1. กรอก username "standard_user"
  2. ปล่อยช่อง password ว่าง
  3. คลิกปุ่ม Login
- **Expected Result**: แสดง error "Epic sadface: Password is required"
- **Actual Result**: _
- **Status**: _
- **Priority**: Medium

### TC-AUTH-006: ล็อกอินด้วย problem_user
- **Preconditions**: Given ผู้ใช้อยู่ที่หน้า login
- **Steps**:
  1. กรอก username "problem_user"
  2. กรอก password "secret_sauce"
  3. คลิกปุ่ม Login
- **Expected Result**: ระบบ redirect ไปหน้า /inventory.html (UI อาจมีปัญหา)
- **Actual Result**: _
- **Status**: _
- **Priority**: Medium

### TC-AUTH-007: ล็อกอินด้วย performance_glitch_user
- **Preconditions**: Given ผู้ใช้อยู่ที่หน้า login
- **Steps**:
  1. กรอก username "performance_glitch_user"
  2. กรอก password "secret_sauce"
  3. คลิกปุ่ม Login
- **Expected Result**: ระบบ redirect ไปหน้า /inventory.html (อาจใช้เวลานานกว่าปกติ)
- **Actual Result**: _
- **Status**: _
- **Priority**: Medium

### TC-AUTH-008: Logout จากระบบ
- **Preconditions**: Given ผู้ใช้ล็อกอินสำเร็จแล้วและอยู่ที่หน้า inventory
- **Steps**:
  1. คลิกปุ่ม hamburger menu (☰) ที่มุมบนซ้าย
  2. คลิก "Logout"
- **Expected Result**: ระบบ redirect ไปหน้า login
- **Actual Result**: _
- **Status**: _
- **Priority**: High
- **Teardown**: ปิดเบราว์เซอร์หรือลบ cookies

---

## โมดูล: Product Catalog

### TC-CAT-001: ตรวจสอบจำนวนสินค้าในแคตตาล็อก
- **Preconditions**: Given ผู้ใช้ล็อกอินด้วย standard_user และอยู่ที่หน้า inventory
- **Steps**:
  1. นับจำนวนสินค้าที่แสดงในหน้า
- **Expected Result**: แสดงสินค้าทั้งหมด 6 รายการ
- **Actual Result**: _
- **Status**: _
- **Priority**: High

### TC-CAT-002: ตรวจสอบข้อมูลสินค้าแต่ละรายการ
- **Preconditions**: Given ผู้ใช้อยู่ที่หน้า inventory
- **Steps**:
  1. ตรวจสอบว่าสินค้าแต่ละรายการแสดง: ชื่อ, รายละเอียด, รูปภาพ, ราคา
- **Expected Result**: สินค้าทุกรายการมีครบ 4 องค์ประกอบ และราคาอยู่ในรูปแบบ $x.xx
- **Actual Result**: _
- **Status**: _
- **Priority**: High

### TC-CAT-003: ตรวจสอบ default sort เป็น Name A-Z
- **Preconditions**: Given ผู้ใช้เพิ่งล็อกอินและอยู่ที่หน้า inventory โดยไม่ได้เปลี่ยน sort
- **Steps**:
  1. ตรวจสอบลำดับสินค้าที่แสดง
- **Expected Result**: สินค้าเรียงตามชื่อ A-Z: Sauce Labs Backpack, Bike Light, Bolt T-Shirt, Fleece Jacket, Onesie, Test.allTheThings()
- **Actual Result**: _
- **Status**: _
- **Priority**: Medium

### TC-CAT-004: เรียงลำดับ Name A-Z
- **Preconditions**: Given ผู้ใช้อยู่ที่หน้า inventory
- **Steps**:
  1. เลือก "Name (A to Z)" จาก dropdown sort
- **Expected Result**: สินค้าตัวแรกคือ "Sauce Labs Backpack" ตัวสุดท้ายคือ "Test.allTheThings() T-Shirt (Red)"
- **Actual Result**: _
- **Status**: _
- **Priority**: Medium

### TC-CAT-005: เรียงลำดับ Name Z-A
- **Preconditions**: Given ผู้ใช้อยู่ที่หน้า inventory
- **Steps**:
  1. เลือก "Name (Z to A)" จาก dropdown sort
- **Expected Result**: สินค้าตัวแรกคือ "Test.allTheThings() T-Shirt (Red)" ตัวสุดท้ายคือ "Sauce Labs Backpack"
- **Actual Result**: _
- **Status**: _
- **Priority**: Medium

### TC-CAT-006: เรียงลำดับ Price Low to High
- **Preconditions**: Given ผู้ใช้อยู่ที่หน้า inventory
- **Steps**:
  1. เลือก "Price (low to high)" จาก dropdown sort
- **Expected Result**: สินค้าตัวแรก "Sauce Labs Onesie" ($7.99) ตัวสุดท้าย "Sauce Labs Fleece Jacket" ($49.99)
- **Actual Result**: _
- **Status**: _
- **Priority**: High

### TC-CAT-007: เรียงลำดับ Price High to Low
- **Preconditions**: Given ผู้ใช้อยู่ที่หน้า inventory
- **Steps**:
  1. เลือก "Price (high to low)" จาก dropdown sort
- **Expected Result**: สินค้าตัวแรก "Sauce Labs Fleece Jacket" ($49.99) ตัวสุดท้าย "Sauce Labs Onesie" ($7.99)
- **Actual Result**: _
- **Status**: _
- **Priority**: Medium

### TC-CAT-008: เปิดหน้ารายละเอียดสินค้าจากชื่อสินค้า
- **Preconditions**: Given ผู้ใช้อยู่ที่หน้า inventory
- **Steps**:
  1. คลิกที่ชื่อ "Sauce Labs Backpack"
- **Expected Result**: เปิดหน้ารายละเอียดสินค้าที่แสดงรูปใหญ่ รายละเอียดเต็ม และราคา $29.99
- **Actual Result**: _
- **Status**: _
- **Priority**: Medium

### TC-CAT-009: เปิดหน้ารายละเอียดสินค้าจากรูปภาพ
- **Preconditions**: Given ผู้ใช้อยู่ที่หน้า inventory
- **Steps**:
  1. คลิกที่รูปภาพของ "Sauce Labs Backpack"
- **Expected Result**: เปิดหน้ารายละเอียดสินค้าเดียวกับการคลิกชื่อ
- **Actual Result**: _
- **Status**: _
- **Priority**: Medium

---

## โมดูล: Shopping Cart

### TC-CART-001: เพิ่มสินค้าลงตะกร้าจากหน้า catalog
- **Preconditions**: Given ผู้ใช้ล็อกอินแล้วและตะกร้าว่าง
- **Steps**:
  1. คลิก "Add to cart" ที่สินค้า "Sauce Labs Backpack"
- **Expected Result**: ปุ่มเปลี่ยนเป็น "Remove" และ cart badge แสดง "1"
- **Actual Result**: _
- **Status**: _
- **Priority**: High

### TC-CART-002: เพิ่มสินค้าลงตะกร้าจากหน้ารายละเอียด
- **Preconditions**: Given ผู้ใช้อยู่ที่หน้ารายละเอียดของ "Sauce Labs Bike Light" และตะกร้าว่าง
- **Steps**:
  1. คลิก "Add to cart"
- **Expected Result**: ปุ่มเปลี่ยนเป็น "Remove" และ cart badge แสดง "1"
- **Actual Result**: _
- **Status**: _
- **Priority**: Medium

### TC-CART-003: เพิ่มสินค้าหลายรายการ
- **Preconditions**: Given ผู้ใช้อยู่ที่หน้า inventory และตะกร้าว่าง
- **Steps**:
  1. คลิก "Add to cart" ที่ "Sauce Labs Backpack"
  2. คลิก "Add to cart" ที่ "Sauce Labs Bike Light"
  3. คลิก "Add to cart" ที่ "Sauce Labs Onesie"
- **Expected Result**: cart badge แสดง "3"
- **Actual Result**: _
- **Status**: _
- **Priority**: High

### TC-CART-004: ลบสินค้าจากหน้า catalog
- **Preconditions**: Given ผู้ใช้เพิ่ม "Sauce Labs Backpack" ในตะกร้าแล้ว (badge = 1)
- **Steps**:
  1. คลิกปุ่ม "Remove" ที่ "Sauce Labs Backpack" ในหน้า catalog
- **Expected Result**: ปุ่มกลับเป็น "Add to cart" และ cart badge หายไป
- **Actual Result**: _
- **Status**: _
- **Priority**: Medium

### TC-CART-005: ลบสินค้าจากหน้าตะกร้า
- **Preconditions**: Given ผู้ใช้มี "Sauce Labs Backpack" ในตะกร้า
- **Steps**:
  1. คลิกไอคอนตะกร้าเพื่อเปิดหน้า cart
  2. คลิกปุ่ม "Remove" ที่รายการ "Sauce Labs Backpack"
- **Expected Result**: รายการหายไปจากหน้าตะกร้าและ badge หายไป
- **Actual Result**: _
- **Status**: _
- **Priority**: High

### TC-CART-006: ดูตะกร้าสินค้า
- **Preconditions**: Given ผู้ใช้เพิ่ม "Sauce Labs Backpack" ($29.99) และ "Sauce Labs Bike Light" ($9.99)
- **Steps**:
  1. คลิกไอคอนตะกร้า
- **Expected Result**: แสดง 2 รายการพร้อมชื่อ รายละเอียด และราคาถูกต้อง
- **Actual Result**: _
- **Status**: _
- **Priority**: High

### TC-CART-007: ดูตะกร้าว่าง
- **Preconditions**: Given ผู้ใช้ล็อกอินแล้วและไม่ได้เพิ่มสินค้าใดๆ
- **Steps**:
  1. คลิกไอคอนตะกร้า
- **Expected Result**: ไม่มีรายการสินค้าแสดง
- **Actual Result**: _
- **Status**: _
- **Priority**: Medium

### TC-CART-008: Continue Shopping จากหน้าตะกร้า
- **Preconditions**: Given ผู้ใช้อยู่ที่หน้าตะกร้า
- **Steps**:
  1. คลิกปุ่ม "Continue Shopping"
- **Expected Result**: ระบบ redirect ไปหน้า /inventory.html
- **Actual Result**: _
- **Status**: _
- **Priority**: Low

### TC-CART-009: ตะกร้าคงอยู่ระหว่าง navigation
- **Preconditions**: Given ผู้ใช้เพิ่มสินค้า 1 ชิ้นในตะกร้า (badge = 1)
- **Steps**:
  1. คลิกชื่อสินค้าอื่นเพื่อไปหน้ารายละเอียด
  2. คลิก "Back to products"
  3. ตรวจสอบ badge
- **Expected Result**: cart badge ยังแสดง "1"
- **Actual Result**: _
- **Status**: _
- **Priority**: Medium

### TC-CART-010: เพิ่มสินค้าทั้ง 6 รายการ
- **Preconditions**: Given ผู้ใช้อยู่ที่หน้า inventory และตะกร้าว่าง
- **Steps**:
  1. คลิก "Add to cart" สำหรับสินค้าทั้ง 6 รายการ
- **Expected Result**: cart badge แสดง "6" และปุ่มทุกตัวเปลี่ยนเป็น "Remove"
- **Actual Result**: _
- **Status**: _
- **Priority**: Medium

---

## โมดูล: Checkout

### TC-CHK-001: กรอกข้อมูล checkout step 1 ถูกต้อง
- **Preconditions**: Given ผู้ใช้มีสินค้าในตะกร้าและอยู่ที่หน้า "Checkout: Your Information"
- **Steps**:
  1. กรอก First Name "John"
  2. กรอก Last Name "Doe"
  3. กรอก Postal Code "12345"
  4. คลิก "Continue"
- **Expected Result**: ระบบ redirect ไปหน้า "Checkout: Overview"
- **Actual Result**: _
- **Status**: _
- **Priority**: High

### TC-CHK-002: ไม่กรอก First Name
- **Preconditions**: Given ผู้ใช้อยู่ที่หน้า checkout step 1
- **Steps**:
  1. ปล่อย First Name ว่าง
  2. กรอก Last Name "Doe"
  3. กรอก Postal Code "12345"
  4. คลิก "Continue"
- **Expected Result**: แสดง error "Error: First Name is required"
- **Actual Result**: _
- **Status**: _
- **Priority**: High

### TC-CHK-003: ไม่กรอก Last Name
- **Preconditions**: Given ผู้ใช้อยู่ที่หน้า checkout step 1
- **Steps**:
  1. กรอก First Name "John"
  2. ปล่อย Last Name ว่าง
  3. กรอก Postal Code "12345"
  4. คลิก "Continue"
- **Expected Result**: แสดง error "Error: Last Name is required"
- **Actual Result**: _
- **Status**: _
- **Priority**: High

### TC-CHK-004: ไม่กรอก Postal Code
- **Preconditions**: Given ผู้ใช้อยู่ที่หน้า checkout step 1
- **Steps**:
  1. กรอก First Name "John"
  2. กรอก Last Name "Doe"
  3. ปล่อย Postal Code ว่าง
  4. คลิก "Continue"
- **Expected Result**: แสดง error "Error: Postal Code is required"
- **Actual Result**: _
- **Status**: _
- **Priority**: High

### TC-CHK-005: ตรวจสอบ checkout step 2 (ยอดรวมและภาษี)
- **Preconditions**: Given ตะกร้ามี "Sauce Labs Backpack" ($29.99) เท่านั้น และผู้ใช้กรอกข้อมูล step 1 แล้ว
- **Steps**:
  1. ตรวจสอบ Item total
  2. ตรวจสอบ Tax
  3. ตรวจสอบ Total
- **Expected Result**: Item total = $29.99, Tax = $2.40 (8%), Total = $32.39
- **Actual Result**: _
- **Status**: _
- **Priority**: High

### TC-CHK-006: ตรวจสอบ checkout step 2 หลายสินค้า
- **Preconditions**: Given ตะกร้ามี "Sauce Labs Backpack" ($29.99) และ "Sauce Labs Onesie" ($7.99)
- **Steps**:
  1. ผ่าน step 1 ด้วยข้อมูลถูกต้อง
  2. ตรวจสอบ Item total, Tax, Total
- **Expected Result**: Item total = $37.98, Tax = $3.04 (8% ปัดเศษ), Total = $41.02
- **Actual Result**: _
- **Status**: _
- **Priority**: High

### TC-CHK-007: ยืนยันคำสั่งซื้อ (step 3)
- **Preconditions**: Given ผู้ใช้อยู่ที่หน้า "Checkout: Overview"
- **Steps**:
  1. คลิกปุ่ม "Finish"
- **Expected Result**: ระบบแสดงหน้า "Checkout: Complete!" พร้อมข้อความ "Thank you for your order!"
- **Actual Result**: _
- **Status**: _
- **Priority**: High

### TC-CHK-008: ตะกร้าว่างหลัง checkout สำเร็จ
- **Preconditions**: Given ผู้ใช้เพิ่งจบ checkout สำเร็จ
- **Steps**:
  1. คลิก "Back Home" หรือกลับไปหน้า inventory
  2. ตรวจสอบ cart badge
- **Expected Result**: cart badge หายไป (ตะกร้าว่าง)
- **Actual Result**: _
- **Status**: _
- **Priority**: High

### TC-CHK-009: Cancel จากหน้า checkout step 2
- **Preconditions**: Given ผู้ใช้อยู่ที่หน้า "Checkout: Overview"
- **Steps**:
  1. คลิกปุ่ม "Cancel"
- **Expected Result**: ระบบ redirect กลับไปหน้า inventory และสินค้าในตะกร้ายังคงอยู่
- **Actual Result**: _
- **Status**: _
- **Priority**: Medium

### TC-CHK-010: Cancel จากหน้า checkout step 1
- **Preconditions**: Given ผู้ใช้อยู่ที่หน้า "Checkout: Your Information"
- **Steps**:
  1. คลิกปุ่ม "Cancel"
- **Expected Result**: ระบบ redirect กลับไปหน้าตะกร้าและสินค้ายังคงอยู่
- **Actual Result**: _
- **Status**: _
- **Priority**: Medium

---

## โมดูล: End-to-End Flow

### TC-E2E-001: Full checkout flow สมบูรณ์
- **Preconditions**: Given ผู้ใช้เปิดเบราว์เซอร์ที่หน้า login
- **Steps**:
  1. ล็อกอินด้วย standard_user / secret_sauce
  2. เพิ่ม "Sauce Labs Backpack" ลงตะกร้า
  3. คลิกไอคอนตะกร้า
  4. คลิก "Checkout"
  5. กรอก First Name "John", Last Name "Doe", Postal Code "12345"
  6. คลิก "Continue"
  7. ตรวจสอบ Item total = $29.99, Tax = $2.40, Total = $32.39
  8. คลิก "Finish"
- **Expected Result**: หน้า "Checkout: Complete!" แสดง "Thank you for your order!" และ cart badge หายไป
- **Actual Result**: _
- **Status**: _
- **Priority**: High
- **Teardown**: ลบ cookies ของเบราว์เซอร์และปิดเบราว์เซอร์

### TC-E2E-002: Full checkout flow หลายสินค้า
- **Preconditions**: Given ผู้ใช้เปิดเบราว์เซอร์ที่หน้า login
- **Steps**:
  1. ล็อกอินด้วย standard_user / secret_sauce
  2. เพิ่ม "Sauce Labs Backpack" ($29.99) และ "Sauce Labs Fleece Jacket" ($49.99) ลงตะกร้า
  3. คลิกไอคอนตะกร้า → คลิก "Checkout"
  4. กรอกข้อมูลผู้ใช้แล้วคลิก "Continue"
  5. ตรวจสอบ Item total = $79.98, Tax = $6.40, Total = $86.38
  6. คลิก "Finish"
- **Expected Result**: หน้ายืนยันแสดง "Thank you for your order!"
- **Actual Result**: _
- **Status**: _
- **Priority**: High
- **Teardown**: ลบ cookies และปิดเบราว์เซอร์

### TC-E2E-003: Full checkout flow สินค้าทั้ง 6 รายการ
- **Preconditions**: Given ผู้ใช้เปิดเบราว์เซอร์ที่หน้า login
- **Steps**:
  1. ล็อกอินด้วย standard_user / secret_sauce
  2. เพิ่มสินค้าทั้ง 6 รายการลงตะกร้า
  3. ไปหน้าตะกร้า → Checkout → กรอกข้อมูล → Continue
  4. ตรวจสอบ Item total = $129.94, Tax = $10.40, Total = $140.34
  5. คลิก "Finish"
- **Expected Result**: หน้ายืนยันแสดง "Thank you for your order!" และ badge หายไป
- **Actual Result**: _
- **Status**: _
- **Priority**: Medium
- **Teardown**: ลบ cookies และปิดเบราว์เซอร์

---

## โมดูล: Session Management

### TC-SESS-001: เข้า /inventory.html โดยไม่ล็อกอิน
- **Preconditions**: Given ผู้ใช้ไม่มี session (เปิด incognito หรือลบ cookies แล้ว)
- **Steps**:
  1. เข้า URL https://www.saucedemo.com/inventory.html โดยตรง
- **Expected Result**: ระบบ redirect ไปหน้า login
- **Actual Result**: _
- **Status**: _
- **Priority**: High

### TC-SESS-002: เข้า /cart.html โดยไม่ล็อกอิน
- **Preconditions**: Given ผู้ใช้ไม่มี session
- **Steps**:
  1. เข้า URL https://www.saucedemo.com/cart.html โดยตรง
- **Expected Result**: ระบบ redirect ไปหน้า login
- **Actual Result**: _
- **Status**: _
- **Priority**: High

### TC-SESS-003: เข้า /checkout-step-one.html โดยไม่ล็อกอิน
- **Preconditions**: Given ผู้ใช้ไม่มี session
- **Steps**:
  1. เข้า URL https://www.saucedemo.com/checkout-step-one.html โดยตรง
- **Expected Result**: ระบบ redirect ไปหน้า login
- **Actual Result**: _
- **Status**: _
- **Priority**: High

---

**จำนวน Test Cases ทั้งหมด: 40**

| โมดูล | จำนวน |
|--------|-------|
| Authentication | 8 |
| Product Catalog | 9 |
| Shopping Cart | 10 |
| Checkout | 10 |
| End-to-End | 3 |
| Session Management | 3 |
| **รวม** | **43** |
