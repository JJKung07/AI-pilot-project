# Phase 03 — Manual Test Case Design

**โปรเจกต์**: SwagLabs Commerce Platform  
**บทบาท**: QA Engineer  
**วันที่**: 2026-06-28  
**จำนวน Test Cases ทั้งหมด**: 45 cases  
**เอกสารอ้างอิง**: `requirements/User-Stories.md`, `requirements/Acceptance-Criteria.md`, `requirements/Business-Rules.md`, Phase 02 Output

---

## Module 1: Authentication (TC-AUTH-001 ถึง TC-AUTH-008)

---

### TC-AUTH-001: Login ด้วย standard_user สำเร็จ

| รายการ | รายละเอียด |
|---|---|
| **Title** | Login with valid standard_user credentials |
| **Priority** | High |
| **Preconditions** | Given ผู้ใช้เปิด browser และอยู่ที่หน้า login (https://www.saucedemo.com) |
| **Steps** | 1. กรอก username: `standard_user`<br>2. กรอก password: `secret_sauce`<br>3. คลิกปุ่ม "Login" |
| **Expected Result** | ผู้ใช้ถูก redirect ไปยังหน้า `/inventory.html` แสดง product catalog |
| **Actual Result** | |
| **Status** | |
| **Teardown** | Clear browser cookies และปิด browser |

---

### TC-AUTH-002: Login ด้วย locked_out_user แสดง error

| รายการ | รายละเอียด |
|---|---|
| **Title** | Login with locked_out_user shows locked error |
| **Priority** | High |
| **Preconditions** | Given ผู้ใช้อยู่ที่หน้า login |
| **Steps** | 1. กรอก username: `locked_out_user`<br>2. กรอก password: `secret_sauce`<br>3. คลิกปุ่ม "Login" |
| **Expected Result** | แสดง error message: "Epic sadface: Sorry, this user has been locked out." และผู้ใช้ยังอยู่ที่หน้า login |
| **Actual Result** | |
| **Status** | |
| **Teardown** | Clear browser cookies |

---

### TC-AUTH-003: Login ด้วย password ผิด

| รายการ | รายละเอียด |
|---|---|
| **Title** | Login with invalid password |
| **Priority** | High |
| **Preconditions** | Given ผู้ใช้อยู่ที่หน้า login |
| **Steps** | 1. กรอก username: `standard_user`<br>2. กรอก password: `wrongpassword`<br>3. คลิกปุ่ม "Login" |
| **Expected Result** | แสดง error: "Epic sadface: Username and password do not match any user in this service." |
| **Actual Result** | |
| **Status** | |
| **Teardown** | Clear browser cookies |

---

### TC-AUTH-004: Login ด้วย username ที่ไม่มีในระบบ

| รายการ | รายละเอียด |
|---|---|
| **Title** | Login with non-existent username |
| **Priority** | Medium |
| **Preconditions** | Given ผู้ใช้อยู่ที่หน้า login |
| **Steps** | 1. กรอก username: `invalid_user`<br>2. กรอก password: `secret_sauce`<br>3. คลิกปุ่ม "Login" |
| **Expected Result** | แสดง error: "Epic sadface: Username and password do not match any user in this service." |
| **Actual Result** | |
| **Status** | |
| **Teardown** | Clear browser cookies |

---

### TC-AUTH-005: Login ด้วย fields ว่างทั้งหมด

| รายการ | รายละเอียด |
|---|---|
| **Title** | Login with empty username and password |
| **Priority** | High |
| **Preconditions** | Given ผู้ใช้อยู่ที่หน้า login |
| **Steps** | 1. ปล่อย username ว่าง<br>2. ปล่อย password ว่าง<br>3. คลิกปุ่ม "Login" |
| **Expected Result** | แสดง error: "Epic sadface: Username is required" |
| **Actual Result** | |
| **Status** | |
| **Teardown** | Clear browser cookies |

---

### TC-AUTH-006: Login ด้วย username ว่าง password มีค่า

| รายการ | รายละเอียด |
|---|---|
| **Title** | Login with empty username only |
| **Priority** | Medium |
| **Preconditions** | Given ผู้ใช้อยู่ที่หน้า login |
| **Steps** | 1. ปล่อย username ว่าง<br>2. กรอก password: `secret_sauce`<br>3. คลิกปุ่ม "Login" |
| **Expected Result** | แสดง error: "Epic sadface: Username is required" |
| **Actual Result** | |
| **Status** | |
| **Teardown** | Clear browser cookies |

---

### TC-AUTH-007: Login ด้วย username มีค่า password ว่าง

| รายการ | รายละเอียด |
|---|---|
| **Title** | Login with empty password only |
| **Priority** | Medium |
| **Preconditions** | Given ผู้ใช้อยู่ที่หน้า login |
| **Steps** | 1. กรอก username: `standard_user`<br>2. ปล่อย password ว่าง<br>3. คลิกปุ่ม "Login" |
| **Expected Result** | แสดง error: "Epic sadface: Password is required" |
| **Actual Result** | |
| **Status** | |
| **Teardown** | Clear browser cookies |

---

### TC-AUTH-008: Login ด้วย problem_user

| รายการ | รายละเอียด |
|---|---|
| **Title** | Login with problem_user credentials |
| **Priority** | Low |
| **Preconditions** | Given ผู้ใช้อยู่ที่หน้า login |
| **Steps** | 1. กรอก username: `problem_user`<br>2. กรอก password: `secret_sauce`<br>3. คลิกปุ่ม "Login" |
| **Expected Result** | ผู้ใช้ถูก redirect ไปยังหน้า `/inventory.html` (login สำเร็จ แม้ UI อาจมีปัญหา) |
| **Actual Result** | |
| **Status** | |
| **Teardown** | Clear browser cookies |

---

## Module 2: Product Catalog (TC-CAT-001 ถึง TC-CAT-007)

---

### TC-CAT-001: ตรวจสอบจำนวนสินค้าใน catalog

| รายการ | รายละเอียด |
|---|---|
| **Title** | Verify product catalog displays exactly 6 products |
| **Priority** | High |
| **Preconditions** | Given ผู้ใช้ login ด้วย `standard_user` สำเร็จและอยู่ที่หน้า products |
| **Steps** | 1. นับจำนวนสินค้าที่แสดงในหน้า catalog |
| **Expected Result** | แสดงสินค้าครบ 6 รายการ |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CAT-002: ตรวจสอบข้อมูลสินค้าแต่ละรายการ

| รายการ | รายละเอียด |
|---|---|
| **Title** | Verify each product has title, description, image, and price |
| **Priority** | High |
| **Preconditions** | Given ผู้ใช้อยู่ที่หน้า products catalog |
| **Steps** | 1. ตรวจสอบแต่ละสินค้า (6 รายการ) ว่ามี title, description, image, price ครบ<br>2. ตรวจสอบ format ราคาเป็น $x.xx |
| **Expected Result** | สินค้าทุกรายการมีข้อมูลครบ 4 ส่วน และราคาอยู่ในรูปแบบ USD |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CAT-003: Default sort order เป็น Name (A-Z)

| รายการ | รายละเอียด |
|---|---|
| **Title** | Verify default sort order is Name A-Z after login |
| **Priority** | Medium |
| **Preconditions** | Given ผู้ใช้เพิ่ง login สำเร็จ |
| **Steps** | 1. ตรวจสอบ sort dropdown ว่าเลือก "Name (A to Z)"<br>2. ตรวจสอบสินค้าชิ้นแรก = "Sauce Labs Backpack"<br>3. ตรวจสอบสินค้าชิ้นสุดท้าย = "Test.allTheThings() T-Shirt (Red)" |
| **Expected Result** | สินค้าเรียงตามตัวอักษร A-Z โดย default |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CAT-004: Sort สินค้าตาม Name (Z-A)

| รายการ | รายละเอียด |
|---|---|
| **Title** | Sort products by Name Z to A |
| **Priority** | Medium |
| **Preconditions** | Given ผู้ใช้อยู่ที่หน้า products |
| **Steps** | 1. เลือก "Name (Z to A)" จาก sort dropdown<br>2. ตรวจสอบสินค้าชิ้นแรก = "Test.allTheThings() T-Shirt (Red)"<br>3. ตรวจสอบสินค้าชิ้นสุดท้าย = "Sauce Labs Backpack" |
| **Expected Result** | สินค้าเรียงย้อนกลับ Z-A |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CAT-005: Sort สินค้าตาม Price (Low to High)

| รายการ | รายละเอียด |
|---|---|
| **Title** | Sort products by Price Low to High |
| **Priority** | High |
| **Preconditions** | Given ผู้ใช้อยู่ที่หน้า products |
| **Steps** | 1. เลือก "Price (low to high)" จาก sort dropdown<br>2. ตรวจสอบสินค้าชิ้นแรก = "Sauce Labs Onesie" ($7.99)<br>3. ตรวจสอบสินค้าชิ้นสุดท้าย = "Sauce Labs Fleece Jacket" ($49.99) |
| **Expected Result** | สินค้าเรียงจากราคาต่ำสุดไปสูงสุด |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CAT-006: Sort สินค้าตาม Price (High to Low)

| รายการ | รายละเอียด |
|---|---|
| **Title** | Sort products by Price High to Low |
| **Priority** | Medium |
| **Preconditions** | Given ผู้ใช้อยู่ที่หน้า products |
| **Steps** | 1. เลือก "Price (high to low)" จาก sort dropdown<br>2. ตรวจสอบสินค้าชิ้นแรก = "Sauce Labs Fleece Jacket" ($49.99)<br>3. ตรวจสอบสินค้าชิ้นสุดท้าย = "Sauce Labs Onesie" ($7.99) |
| **Expected Result** | สินค้าเรียงจากราคาสูงสุดไปต่ำสุด |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CAT-007: เข้าหน้า Product Detail จาก catalog

| รายการ | รายละเอียด |
|---|---|
| **Title** | Navigate to product detail page by clicking product title |
| **Priority** | Medium |
| **Preconditions** | Given ผู้ใช้อยู่ที่หน้า products catalog |
| **Steps** | 1. คลิกที่ชื่อ "Sauce Labs Backpack"<br>2. ตรวจสอบหน้า detail แสดงรูปใหญ่, คำอธิบายเต็ม, ราคา $29.99<br>3. ตรวจสอบปุ่ม "Add to cart" แสดงอยู่ |
| **Expected Result** | หน้า product detail แสดงข้อมูลครบถ้วน |
| **Actual Result** | |
| **Status** | |
| **Teardown** | คลิก "Back to products" เพื่อกลับ catalog |

---

## Module 3: Shopping Cart (TC-CART-001 ถึง TC-CART-012)

---

### TC-CART-001: เพิ่มสินค้าลงตะกร้าจาก catalog

| รายการ | รายละเอียด |
|---|---|
| **Title** | Add product to cart from catalog page |
| **Priority** | High |
| **Preconditions** | Given ผู้ใช้อยู่ที่หน้า catalog และ cart ว่าง |
| **Steps** | 1. คลิก "Add to cart" ที่ "Sauce Labs Backpack"<br>2. ตรวจสอบปุ่มเปลี่ยนเป็น "Remove"<br>3. ตรวจสอบ cart badge แสดง "1" |
| **Expected Result** | ปุ่มเปลี่ยนเป็น "Remove" และ badge = 1 |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CART-002: เพิ่มสินค้าหลายชิ้นลงตะกร้า

| รายการ | รายละเอียด |
|---|---|
| **Title** | Add multiple products to cart |
| **Priority** | High |
| **Preconditions** | Given ผู้ใช้อยู่ที่หน้า catalog และ cart ว่าง |
| **Steps** | 1. คลิก "Add to cart" ที่ "Sauce Labs Backpack"<br>2. คลิก "Add to cart" ที่ "Sauce Labs Bike Light"<br>3. คลิก "Add to cart" ที่ "Sauce Labs Onesie"<br>4. ตรวจสอบ cart badge แสดง "3" |
| **Expected Result** | Badge แสดงจำนวน 3 ถูกต้อง |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CART-003: เพิ่มสินค้าจาก Product Detail page

| รายการ | รายละเอียด |
|---|---|
| **Title** | Add product to cart from detail page |
| **Priority** | Medium |
| **Preconditions** | Given ผู้ใช้อยู่ที่หน้า detail ของ "Sauce Labs Backpack" และ cart ว่าง |
| **Steps** | 1. คลิก "Add to cart" บนหน้า detail<br>2. ตรวจสอบปุ่มเปลี่ยนเป็น "Remove"<br>3. ตรวจสอบ cart badge แสดง "1" |
| **Expected Result** | สินค้าถูกเพิ่มในตะกร้า badge = 1 |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CART-004: ลบสินค้าจาก catalog page

| รายการ | รายละเอียด |
|---|---|
| **Title** | Remove product from cart on catalog page |
| **Priority** | Medium |
| **Preconditions** | Given ผู้ใช้มีสินค้า 1 ชิ้นในตะกร้า (Sauce Labs Backpack) และอยู่ที่หน้า catalog |
| **Steps** | 1. คลิก "Remove" ที่ "Sauce Labs Backpack"<br>2. ตรวจสอบปุ่มเปลี่ยนกลับเป็น "Add to cart"<br>3. ตรวจสอบ cart badge หายไป |
| **Expected Result** | ปุ่มกลับเป็น "Add to cart" และ badge หายไป |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CART-005: ลบสินค้าจาก cart page

| รายการ | รายละเอียด |
|---|---|
| **Title** | Remove product from cart page |
| **Priority** | High |
| **Preconditions** | Given ผู้ใช้มีสินค้า 2 ชิ้นในตะกร้าและอยู่ที่หน้า cart |
| **Steps** | 1. คลิก "Remove" ที่สินค้าชิ้นแรก<br>2. ตรวจสอบว่าสินค้าหายจาก list<br>3. ตรวจสอบ cart badge ลดลงเหลือ "1" |
| **Expected Result** | สินค้าถูกลบออก badge อัปเดต |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CART-006: ดูรายการสินค้าใน cart

| รายการ | รายละเอียด |
|---|---|
| **Title** | View shopping cart contents |
| **Priority** | High |
| **Preconditions** | Given ผู้ใช้เพิ่ม "Sauce Labs Backpack" ($29.99) และ "Sauce Labs Bike Light" ($9.99) ในตะกร้า |
| **Steps** | 1. คลิกไอคอน cart (ด้านบนขวา)<br>2. ตรวจสอบสินค้า 2 รายการแสดงใน cart พร้อม title, description, price |
| **Expected Result** | Cart แสดง 2 รายการพร้อมข้อมูลถูกต้อง |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CART-007: Cart ว่าง — ไม่มีสินค้า

| รายการ | รายละเอียด |
|---|---|
| **Title** | View empty shopping cart |
| **Priority** | Medium |
| **Preconditions** | Given ผู้ใช้ login แล้วและไม่มีสินค้าในตะกร้า |
| **Steps** | 1. คลิกไอคอน cart<br>2. ตรวจสอบว่าไม่มีสินค้าแสดงใน cart |
| **Expected Result** | ไม่มี product items แสดงใน cart page |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CART-008: Continue Shopping button กลับไป catalog

| รายการ | รายละเอียด |
|---|---|
| **Title** | Navigate back to catalog from cart |
| **Priority** | Low |
| **Preconditions** | Given ผู้ใช้อยู่ที่หน้า cart |
| **Steps** | 1. คลิก "Continue Shopping"<br>2. ตรวจสอบว่า redirect ไป `/inventory.html` |
| **Expected Result** | กลับไปหน้า product catalog |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CART-009: เพิ่มสินค้าครบ 6 รายการ

| รายการ | รายละเอียด |
|---|---|
| **Title** | Add all 6 products to cart |
| **Priority** | Medium |
| **Preconditions** | Given ผู้ใช้อยู่ที่หน้า catalog และ cart ว่าง |
| **Steps** | 1. คลิก "Add to cart" ทุกสินค้า 6 รายการ<br>2. ตรวจสอบ cart badge แสดง "6"<br>3. เปิดหน้า cart ตรวจสอบ 6 รายการ |
| **Expected Result** | Badge = 6, cart page แสดง 6 items |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CART-010: Cart state persist ข้าม page navigation

| รายการ | รายละเอียด |
|---|---|
| **Title** | Cart state persists across page navigation |
| **Priority** | High |
| **Preconditions** | Given ผู้ใช้เพิ่ม "Sauce Labs Backpack" ในตะกร้าจาก catalog |
| **Steps** | 1. คลิกเข้า detail ของ "Sauce Labs Bike Light"<br>2. ตรวจสอบ badge ยังแสดง "1"<br>3. คลิก "Back to products"<br>4. ตรวจสอบ badge ยังแสดง "1"<br>5. เปิดหน้า cart — ยังมี Backpack อยู่ |
| **Expected Result** | Cart state คงอยู่ตลอดการ navigate |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CART-011: ลบสินค้าทั้งหมดจาก cart page

| รายการ | รายละเอียด |
|---|---|
| **Title** | Remove all items from cart page |
| **Priority** | Medium |
| **Preconditions** | Given ผู้ใช้มีสินค้า 3 ชิ้นใน cart และอยู่ที่หน้า cart |
| **Steps** | 1. คลิก "Remove" สินค้าชิ้นที่ 1<br>2. คลิก "Remove" สินค้าชิ้นที่ 2<br>3. คลิก "Remove" สินค้าชิ้นที่ 3<br>4. ตรวจสอบ cart badge หายไป |
| **Expected Result** | Cart ว่าง, badge หายไป |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CART-012: Badge อัปเดตเมื่อลบสินค้าจาก detail page

| รายการ | รายละเอียด |
|---|---|
| **Title** | Remove product from detail page updates badge |
| **Priority** | Medium |
| **Preconditions** | Given ผู้ใช้เพิ่ม "Sauce Labs Backpack" ในตะกร้าแล้วอยู่ที่หน้า detail ของ Backpack |
| **Steps** | 1. ตรวจสอบปุ่มแสดง "Remove"<br>2. คลิก "Remove"<br>3. ตรวจสอบปุ่มเปลี่ยนเป็น "Add to cart"<br>4. ตรวจสอบ cart badge หายไป |
| **Expected Result** | สินค้าถูกลบ, badge หายไป |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

## Module 4: Checkout (TC-CHK-001 ถึง TC-CHK-012)

---

### TC-CHK-001: Checkout Step 1 — กรอกข้อมูลครบถ้วน

| รายการ | รายละเอียด |
|---|---|
| **Title** | Checkout step 1 with valid information |
| **Priority** | High |
| **Preconditions** | Given ผู้ใช้มีสินค้าใน cart และอยู่ที่หน้า "Checkout: Your Information" |
| **Steps** | 1. กรอก First Name: `John`<br>2. กรอก Last Name: `Doe`<br>3. กรอก Postal Code: `12345`<br>4. คลิก "Continue" |
| **Expected Result** | Redirect ไปหน้า "Checkout: Overview" |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CHK-002: Checkout Step 1 — First Name ว่าง

| รายการ | รายละเอียด |
|---|---|
| **Title** | Checkout step 1 missing first name |
| **Priority** | High |
| **Preconditions** | Given ผู้ใช้อยู่ที่หน้า "Checkout: Your Information" |
| **Steps** | 1. ปล่อย First Name ว่าง<br>2. กรอก Last Name: `Doe`<br>3. กรอก Postal Code: `12345`<br>4. คลิก "Continue" |
| **Expected Result** | แสดง error: "Error: First Name is required" |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CHK-003: Checkout Step 1 — Last Name ว่าง

| รายการ | รายละเอียด |
|---|---|
| **Title** | Checkout step 1 missing last name |
| **Priority** | High |
| **Preconditions** | Given ผู้ใช้อยู่ที่หน้า "Checkout: Your Information" |
| **Steps** | 1. กรอก First Name: `John`<br>2. ปล่อย Last Name ว่าง<br>3. กรอก Postal Code: `12345`<br>4. คลิก "Continue" |
| **Expected Result** | แสดง error: "Error: Last Name is required" |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CHK-004: Checkout Step 1 — Postal Code ว่าง

| รายการ | รายละเอียด |
|---|---|
| **Title** | Checkout step 1 missing postal code |
| **Priority** | High |
| **Preconditions** | Given ผู้ใช้อยู่ที่หน้า "Checkout: Your Information" |
| **Steps** | 1. กรอก First Name: `John`<br>2. กรอก Last Name: `Doe`<br>3. ปล่อย Postal Code ว่าง<br>4. คลิก "Continue" |
| **Expected Result** | แสดง error: "Error: Postal Code is required" |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CHK-005: Checkout Step 1 — ทุก field ว่าง

| รายการ | รายละเอียด |
|---|---|
| **Title** | Checkout step 1 all fields empty |
| **Priority** | Medium |
| **Preconditions** | Given ผู้ใช้อยู่ที่หน้า "Checkout: Your Information" |
| **Steps** | 1. ปล่อย First Name, Last Name, Postal Code ว่าง<br>2. คลิก "Continue" |
| **Expected Result** | แสดง error: "Error: First Name is required" (validation ทำงานที่ field แรก) |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CHK-006: Checkout Step 2 — ตรวจสอบยอดรวม (single item)

| รายการ | รายละเอียด |
|---|---|
| **Title** | Checkout overview with single item shows correct totals |
| **Priority** | High |
| **Preconditions** | Given ผู้ใช้มี "Sauce Labs Backpack" ($29.99) ใน cart และอยู่ที่หน้า "Checkout: Overview" |
| **Steps** | 1. ตรวจสอบ Item total = $29.99<br>2. ตรวจสอบ Tax = $2.40 (8% of $29.99)<br>3. ตรวจสอบ Total = $32.39 |
| **Expected Result** | ตัวเลขทั้งหมดถูกต้อง |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CHK-007: Checkout Step 2 — ตรวจสอบยอดรวม (multiple items)

| รายการ | รายละเอียด |
|---|---|
| **Title** | Checkout overview with multiple items shows correct totals |
| **Priority** | High |
| **Preconditions** | Given ผู้ใช้มี "Sauce Labs Backpack" ($29.99) และ "Sauce Labs Bike Light" ($9.99) ใน cart และอยู่ที่หน้า "Checkout: Overview" |
| **Steps** | 1. ตรวจสอบ Item total = $39.98<br>2. ตรวจสอบ Tax = $3.20 (8% of $39.98 = $3.1984 → rounded)<br>3. ตรวจสอบ Total = $43.18 |
| **Expected Result** | ตัวเลขทั้งหมดถูกต้อง |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CHK-008: Checkout Step 2 — แสดงรายการสินค้าครบ

| รายการ | รายละเอียด |
|---|---|
| **Title** | Checkout overview displays all cart items |
| **Priority** | High |
| **Preconditions** | Given ผู้ใช้มีสินค้า 3 ชิ้นใน cart และอยู่ที่หน้า Overview |
| **Steps** | 1. ตรวจสอบว่ามีสินค้า 3 รายการแสดง<br>2. แต่ละรายการมี title และ price ถูกต้อง |
| **Expected Result** | สินค้าแสดงครบถ้วนตรงกับ cart |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CHK-009: Checkout Step 3 — ยืนยัน order สำเร็จ

| รายการ | รายละเอียด |
|---|---|
| **Title** | Complete checkout shows confirmation |
| **Priority** | High |
| **Preconditions** | Given ผู้ใช้อยู่ที่หน้า "Checkout: Overview" |
| **Steps** | 1. คลิก "Finish"<br>2. ตรวจสอบ redirect ไปหน้า "Checkout: Complete!"<br>3. ตรวจสอบข้อความ "Thank you for your order!" แสดง |
| **Expected Result** | แสดงหน้า confirmation พร้อมข้อความสำเร็จ |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CHK-010: Cart ถูก clear หลัง checkout สำเร็จ

| รายการ | รายละเอียด |
|---|---|
| **Title** | Cart is cleared after successful checkout |
| **Priority** | High |
| **Preconditions** | Given ผู้ใช้เพิ่ง complete checkout สำเร็จ (อยู่ที่หน้า confirmation) |
| **Steps** | 1. ตรวจสอบ cart badge หายไป<br>2. คลิก "Back Home" กลับไป catalog<br>3. เปิดหน้า cart — ตรวจสอบว่า cart ว่าง |
| **Expected Result** | Cart ว่างเปล่าหลัง checkout |
| **Actual Result** | |
| **Status** | |
| **Teardown** | Clear browser cookies และปิด browser |

---

### TC-CHK-011: Cancel button บนหน้า Checkout Step 1

| รายการ | รายละเอียด |
|---|---|
| **Title** | Cancel checkout returns to cart |
| **Priority** | Low |
| **Preconditions** | Given ผู้ใช้อยู่ที่หน้า "Checkout: Your Information" |
| **Steps** | 1. คลิก "Cancel"<br>2. ตรวจสอบว่ากลับไปหน้า cart |
| **Expected Result** | Redirect กลับไปหน้า cart, สินค้ายังคงอยู่ |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-CHK-012: Cancel button บนหน้า Checkout Step 2

| รายการ | รายละเอียด |
|---|---|
| **Title** | Cancel on overview returns to catalog |
| **Priority** | Low |
| **Preconditions** | Given ผู้ใช้อยู่ที่หน้า "Checkout: Overview" |
| **Steps** | 1. คลิก "Cancel"<br>2. ตรวจสอบว่ากลับไปหน้า catalog |
| **Expected Result** | Redirect กลับไปหน้า catalog, สินค้ายังอยู่ใน cart |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

## Module 5: Logout & Session (TC-SESS-001 ถึง TC-SESS-006)

---

### TC-SESS-001: Logout สำเร็จ

| รายการ | รายละเอียด |
|---|---|
| **Title** | Successful logout from sidebar menu |
| **Priority** | High |
| **Preconditions** | Given ผู้ใช้ login แล้วและอยู่ที่หน้า catalog |
| **Steps** | 1. คลิกปุ่ม hamburger menu (ด้านบนซ้าย)<br>2. คลิก "Logout"<br>3. ตรวจสอบว่า redirect ไปหน้า login |
| **Expected Result** | ผู้ใช้ถูก redirect ไปหน้า login |
| **Actual Result** | |
| **Status** | |
| **Teardown** | Clear browser cookies และปิด browser |

---

### TC-SESS-002: เข้าถึง /inventory.html โดยไม่ login

| รายการ | รายละเอียด |
|---|---|
| **Title** | Direct URL access without session redirects to login |
| **Priority** | High |
| **Preconditions** | Given ผู้ใช้ไม่ได้ login (no session cookie) |
| **Steps** | 1. พิมพ์ URL `https://www.saucedemo.com/inventory.html` ใน browser โดยตรง |
| **Expected Result** | Redirect ไปหน้า login พร้อม error message |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-SESS-003: เข้าถึง /cart.html โดยไม่ login

| รายการ | รายละเอียด |
|---|---|
| **Title** | Direct access to cart page without session |
| **Priority** | Medium |
| **Preconditions** | Given ผู้ใช้ไม่ได้ login |
| **Steps** | 1. พิมพ์ URL `https://www.saucedemo.com/cart.html` ใน browser โดยตรง |
| **Expected Result** | Redirect ไปหน้า login |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-SESS-004: เข้าถึง /checkout-step-one.html โดยไม่ login

| รายการ | รายละเอียด |
|---|---|
| **Title** | Direct access to checkout without session |
| **Priority** | Medium |
| **Preconditions** | Given ผู้ใช้ไม่ได้ login |
| **Steps** | 1. พิมพ์ URL `https://www.saucedemo.com/checkout-step-one.html` ใน browser โดยตรง |
| **Expected Result** | Redirect ไปหน้า login |
| **Actual Result** | |
| **Status** | |
| **Teardown** | - |

---

### TC-SESS-005: Browser back button หลัง logout

| รายการ | รายละเอียด |
|---|---|
| **Title** | Browser back after logout does not restore session |
| **Priority** | High |
| **Preconditions** | Given ผู้ใช้เพิ่ง logout สำเร็จ |
| **Steps** | 1. คลิก browser back button<br>2. ตรวจสอบว่าไม่สามารถเข้าถึงหน้า products ได้ |
| **Expected Result** | ไม่สามารถเข้าถึงหน้า internal ได้ — redirect ไป login หรือแสดง error |
| **Actual Result** | |
| **Status** | |
| **Teardown** | Clear browser cookies |

---

### TC-SESS-006: Logout ล้าง cart state

| รายการ | รายละเอียด |
|---|---|
| **Title** | Logout clears cart state on re-login |
| **Priority** | Medium |
| **Preconditions** | Given ผู้ใช้เพิ่มสินค้า 2 ชิ้นใน cart แล้ว logout |
| **Steps** | 1. Login อีกครั้งด้วย `standard_user`<br>2. ตรวจสอบ cart badge<br>3. เปิดหน้า cart |
| **Expected Result** | ตรวจสอบว่า cart state ถูก clear หรือยังคงอยู่ (ขึ้นอยู่กับ implementation — ต้อง verify behavior) |
| **Actual Result** | |
| **Status** | |
| **Teardown** | Clear browser cookies และปิด browser |

---

## Module 6: End-to-End Flow (TC-E2E-001 ถึง TC-E2E-002)

---

### TC-E2E-001: Full purchase flow — single item

| รายการ | รายละเอียด |
|---|---|
| **Title** | Complete purchase flow from login to confirmation (1 item) |
| **Priority** | High |
| **Preconditions** | Given ผู้ใช้เปิด browser อยู่ที่หน้า login |
| **Steps** | 1. Login ด้วย `standard_user` / `secret_sauce`<br>2. เพิ่ม "Sauce Labs Backpack" ลงตะกร้า<br>3. คลิกไอคอน cart<br>4. คลิก "Checkout"<br>5. กรอก First Name: `John`, Last Name: `Doe`, Postal Code: `12345`<br>6. คลิก "Continue"<br>7. ตรวจสอบ Item total = $29.99, Tax = $2.40, Total = $32.39<br>8. คลิก "Finish"<br>9. ตรวจสอบ "Thank you for your order!" |
| **Expected Result** | Complete flow สำเร็จ ทุก step ทำงานถูกต้อง |
| **Actual Result** | |
| **Status** | |
| **Teardown** | Clear browser cookies และปิด browser |

---

### TC-E2E-002: Full purchase flow — multiple items

| รายการ | รายละเอียด |
|---|---|
| **Title** | Complete purchase flow with all 6 items |
| **Priority** | High |
| **Preconditions** | Given ผู้ใช้เปิด browser อยู่ที่หน้า login |
| **Steps** | 1. Login ด้วย `standard_user` / `secret_sauce`<br>2. เพิ่มสินค้าทั้ง 6 รายการลงตะกร้า<br>3. ตรวจสอบ badge = 6<br>4. คลิกไอคอน cart → ตรวจสอบ 6 items<br>5. คลิก "Checkout"<br>6. กรอก First Name: `Jane`, Last Name: `Smith`, Postal Code: `99999`<br>7. คลิก "Continue"<br>8. ตรวจสอบ Item total = $129.94<br>9. ตรวจสอบ Tax = $10.40 (8% of $129.94)<br>10. ตรวจสอบ Total = $140.34<br>11. คลิก "Finish"<br>12. ตรวจสอบ "Thank you for your order!"<br>13. ตรวจสอบ cart badge หายไป |
| **Expected Result** | Complete flow สำเร็จ สินค้า 6 ชิ้น ยอดถูกต้อง |
| **Actual Result** | |
| **Status** | |
| **Teardown** | Clear browser cookies และปิด browser |

---

## สรุป Test Cases

| Module | จำนวน Test Cases | Priority High | Priority Medium | Priority Low |
|---|---|---|---|---|
| Authentication | 8 | 4 | 3 | 1 |
| Product Catalog | 7 | 2 | 5 | 0 |
| Shopping Cart | 12 | 4 | 6 | 2 |
| Checkout | 12 | 8 | 2 | 2 |
| Logout & Session | 6 | 3 | 2 | 1 |
| End-to-End | 2 | 2 | 0 | 0 |
| **รวม** | **45** | **23** | **16** | **6** |

---

*เอกสารนี้สร้างโดย Kiro AI — QA Engineer*
