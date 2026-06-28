# ระยะที่ 03 - Manual Test Case Design

เอกสารนี้สรุปชุดทดสอบแบบ manual สำหรับ SwagLabs Platform โดยจัดกลุ่มตามโมดูลและครอบคลุม user story ทั้ง 20 ข้อ

## 1. Authentication

### TC-AUTH-001 - Login ด้วย `standard_user`
**Test Case ID:** TC-AUTH-001  
**Title:** Login ด้วย `standard_user`  
**Preconditions:**  
- Given browser เปิดอยู่และอยู่ที่หน้า login  
- Given ล้าง cookies และ local storage แล้ว  
**Steps:**  
1. กรอก username เป็น `standard_user`  
2. กรอก password เป็น `secret_sauce`  
3. คลิกปุ่ม `Login`  
**Expected Result:**  
- ระบบพาไปที่หน้า `/inventory.html`  
- หน้า catalog แสดงผลสำเร็จ  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. Logout หากมี session ค้างอยู่  
2. ล้าง cookies/local storage  
3. ปิด browser tab  

### TC-AUTH-002 - Login ด้วย `problem_user`
**Test Case ID:** TC-AUTH-002  
**Title:** Login ด้วย `problem_user`  
**Preconditions:**  
- Given browser เปิดอยู่และอยู่ที่หน้า login  
- Given ล้าง cookies และ local storage แล้ว  
**Steps:**  
1. กรอก username เป็น `problem_user`  
2. กรอก password เป็น `secret_sauce`  
3. คลิกปุ่ม `Login`  
**Expected Result:**  
- ระบบพาไปที่หน้า catalog ได้สำเร็จ  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. Logout หากมี session ค้างอยู่  
2. ล้าง cookies/local storage  
3. ปิด browser tab  

### TC-AUTH-003 - Login ด้วย `performance_glitch_user`
**Test Case ID:** TC-AUTH-003  
**Title:** Login ด้วย `performance_glitch_user`  
**Preconditions:**  
- Given browser เปิดอยู่และอยู่ที่หน้า login  
- Given ล้าง cookies และ local storage แล้ว  
**Steps:**  
1. กรอก username เป็น `performance_glitch_user`  
2. กรอก password เป็น `secret_sauce`  
3. คลิกปุ่ม `Login`  
**Expected Result:**  
- ระบบพาไปที่หน้า catalog ได้สำเร็จ  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. Logout หากมี session ค้างอยู่  
2. ล้าง cookies/local storage  
3. ปิด browser tab  

### TC-AUTH-004 - Login ด้วย `error_user`
**Test Case ID:** TC-AUTH-004  
**Title:** Login ด้วย `error_user`  
**Preconditions:**  
- Given browser เปิดอยู่และอยู่ที่หน้า login  
- Given ล้าง cookies และ local storage แล้ว  
**Steps:**  
1. กรอก username เป็น `error_user`  
2. กรอก password เป็น `secret_sauce`  
3. คลิกปุ่ม `Login`  
**Expected Result:**  
- ระบบพาไปที่หน้า catalog ได้สำเร็จ  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. Logout หากมี session ค้างอยู่  
2. ล้าง cookies/local storage  
3. ปิด browser tab  

### TC-AUTH-005 - Login ด้วย `visual_user`
**Test Case ID:** TC-AUTH-005  
**Title:** Login ด้วย `visual_user`  
**Preconditions:**  
- Given browser เปิดอยู่และอยู่ที่หน้า login  
- Given ล้าง cookies และ local storage แล้ว  
**Steps:**  
1. กรอก username เป็น `visual_user`  
2. กรอก password เป็น `secret_sauce`  
3. คลิกปุ่ม `Login`  
**Expected Result:**  
- ระบบพาไปที่หน้า catalog ได้สำเร็จ  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. Logout หากมี session ค้างอยู่  
2. ล้าง cookies/local storage  
3. ปิด browser tab  

### TC-AUTH-006 - Login ด้วย `locked_out_user`
**Test Case ID:** TC-AUTH-006  
**Title:** ตรวจสอบ locked-out user  
**Preconditions:**  
- Given browser เปิดอยู่และอยู่ที่หน้า login  
- Given ล้าง cookies และ local storage แล้ว  
**Steps:**  
1. กรอก username เป็น `locked_out_user`  
2. กรอก password เป็น `secret_sauce`  
3. คลิกปุ่ม `Login`  
**Expected Result:**  
- แสดง error `Epic sadface: Sorry, this user has been locked out.`  
- ผู้ใช้ยังอยู่ที่หน้า login  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. ล้าง cookies/local storage  
2. ปิด browser tab  

### TC-AUTH-007 - Login ด้วย password ไม่ถูกต้อง
**Test Case ID:** TC-AUTH-007  
**Title:** Invalid password  
**Preconditions:**  
- Given browser เปิดอยู่และอยู่ที่หน้า login  
- Given ล้าง cookies และ local storage แล้ว  
**Steps:**  
1. กรอก username เป็น `standard_user`  
2. กรอก password เป็น `wrong_pass`  
3. คลิกปุ่ม `Login`  
**Expected Result:**  
- แสดง error `Epic sadface: Username and password do not match any user in this service.`  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. ล้าง cookies/local storage  
2. ปิด browser tab  

### TC-AUTH-008 - Login ด้วย username ไม่ถูกต้อง
**Test Case ID:** TC-AUTH-008  
**Title:** Invalid username  
**Preconditions:**  
- Given browser เปิดอยู่และอยู่ที่หน้า login  
- Given ล้าง cookies และ local storage แล้ว  
**Steps:**  
1. กรอก username เป็น `unknown_user`  
2. กรอก password เป็น `secret_sauce`  
3. คลิกปุ่ม `Login`  
**Expected Result:**  
- แสดง error `Epic sadface: Username and password do not match any user in this service.`  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. ล้าง cookies/local storage  
2. ปิด browser tab  

### TC-AUTH-009 - Login ด้วยช่องว่างทั้งหมด
**Test Case ID:** TC-AUTH-009  
**Title:** Blank username and password  
**Preconditions:**  
- Given browser เปิดอยู่และอยู่ที่หน้า login  
- Given ล้าง cookies และ local storage แล้ว  
**Steps:**  
1. เว้น username ว่าง  
2. เว้น password ว่าง  
3. คลิกปุ่ม `Login`  
**Expected Result:**  
- แสดง validation error สำหรับข้อมูลที่จำเป็น  
**Actual Result:**  
**Status:**  
**Priority:** Medium  
**Teardown:**  
1. ล้าง cookies/local storage  
2. ปิด browser tab  

### TC-AUTH-010 - Logout จาก application
**Test Case ID:** TC-AUTH-010  
**Title:** Logout จาก sidebar menu  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given อยู่ที่หน้า inventory  
**Steps:**  
1. เปิด sidebar menu  
2. คลิก `Logout`  
3. สังเกตการเปลี่ยนหน้า  
**Expected Result:**  
- ระบบพากลับไปหน้า login  
- session ถูกยกเลิก  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. ล้าง cookies/local storage  
2. ปิด browser tab  

## 2. Catalog and Sorting

### TC-CAT-001 - แสดงสินค้าใน catalog ครบ 6 รายการ
**Test Case ID:** TC-CAT-001  
**Title:** Catalog displays exactly 6 products  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given อยู่ที่หน้า inventory  
**Steps:**  
1. นับจำนวนสินค้าใน catalog  
2. ตรวจสอบว่ามีสินค้าแสดงครบทุกการ์ด  
**Expected Result:**  
- แสดงสินค้า exactly 6 รายการ  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. กลับไปหน้า inventory หากมีการเปิดหน้าอื่น  
2. ปิด browser tab เมื่อเสร็จ  

### TC-CAT-002 - ตรวจสอบข้อมูลสินค้าแต่ละรายการ
**Test Case ID:** TC-CAT-002  
**Title:** Product cards show title, description, image, and price  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given อยู่ที่หน้า inventory  
**Steps:**  
1. เปิดดูสินค้าทีละรายการบน catalog  
2. ตรวจสอบ title, description, image และ price ของแต่ละสินค้า  
**Expected Result:**  
- สินค้าทุกชิ้นแสดงข้อมูลครบตาม BRD  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. ปิด browser tab  

### TC-CAT-003 - ตรวจสอบรูปแบบราคาเป็น USD
**Test Case ID:** TC-CAT-003  
**Title:** Price format uses USD currency  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given อยู่ที่หน้า inventory  
**Steps:**  
1. ตรวจสอบรูปแบบราคาใน catalog  
2. ตรวจสอบว่าทุก price แสดงเป็น `$x.xx`  
**Expected Result:**  
- ราคาทุกสินค้าถูกแสดงในรูปแบบ USD ที่มี 2 ตำแหน่งทศนิยม  
**Actual Result:**  
**Status:**  
**Priority:** Medium  
**Teardown:**  
1. ปิด browser tab  

### TC-CAT-004 - เปิดหน้ารายละเอียดด้วยการคลิก title
**Test Case ID:** TC-CAT-004  
**Title:** Open detail page from product title  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given อยู่ที่หน้า inventory  
**Steps:**  
1. คลิก title ของสินค้าหนึ่งรายการ  
2. สังเกตหน้าที่เปิดขึ้น  
**Expected Result:**  
- เปิดหน้ารายละเอียดของสินค้าที่เลือก  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. กลับไปหน้า inventory  
2. ปิด browser tab  

### TC-CAT-005 - เปิดหน้ารายละเอียดด้วยการคลิก image
**Test Case ID:** TC-CAT-005  
**Title:** Open detail page from product image  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given อยู่ที่หน้า inventory  
**Steps:**  
1. คลิก image ของสินค้าหนึ่งรายการ  
2. สังเกตหน้าที่เปิดขึ้น  
**Expected Result:**  
- เปิดหน้ารายละเอียดของสินค้าที่เลือก  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. กลับไปหน้า inventory  
2. ปิด browser tab  

### TC-CAT-006 - ค่าเริ่มต้นของ sorting หลัง login
**Test Case ID:** TC-CAT-006  
**Title:** Default sort order is Name A-Z  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given เพิ่งเข้าหน้า inventory ครั้งแรกใน session นี้  
**Steps:**  
1. ดูลำดับสินค้าใน catalog  
2. เปรียบเทียบกับชื่อสินค้าแบบอักษร A-Z  
**Expected Result:**  
- ลำดับเริ่มต้นเป็น Name A-Z  
**Actual Result:**  
**Status:**  
**Priority:** Medium  
**Teardown:**  
1. ปิด browser tab  

### TC-CAT-007 - Sort แบบ Name Z-A
**Test Case ID:** TC-CAT-007  
**Title:** Sort products by Name Z-A  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given อยู่ที่หน้า inventory  
**Steps:**  
1. เปิด dropdown sorting  
2. เลือก `Name (Z to A)`  
3. ตรวจสอบลำดับสินค้าที่แสดง  
**Expected Result:**  
- สินค้าเรียงจาก Z ไป A อย่างถูกต้อง  
**Actual Result:**  
**Status:**  
**Priority:** Medium  
**Teardown:**  
1. รีเซ็ต sorting เป็นค่าเริ่มต้น  
2. ปิด browser tab  

### TC-CAT-008 - Sort แบบ Price Low-High
**Test Case ID:** TC-CAT-008  
**Title:** Sort products by Price Low-High  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given อยู่ที่หน้า inventory  
**Steps:**  
1. เปิด dropdown sorting  
2. เลือก `Price (low to high)`  
3. ตรวจสอบราคาจากต่ำไปสูง  
**Expected Result:**  
- ราคาสินค้าเรียงจากต่ำไปสูงถูกต้อง  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. รีเซ็ต sorting เป็นค่าเริ่มต้น  
2. ปิด browser tab  

### TC-CAT-009 - Sort แบบ Price High-Low
**Test Case ID:** TC-CAT-009  
**Title:** Sort products by Price High-Low  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given อยู่ที่หน้า inventory  
**Steps:**  
1. เปิด dropdown sorting  
2. เลือก `Price (high to low)`  
3. ตรวจสอบราคาจากสูงไปต่ำ  
**Expected Result:**  
- ราคาสินค้าเรียงจากสูงไปต่ำถูกต้อง  
**Actual Result:**  
**Status:**  
**Priority:** Medium  
**Teardown:**  
1. รีเซ็ต sorting เป็นค่าเริ่มต้น  
2. ปิด browser tab  

## 3. Cart Add and Remove

### TC-CART-001 - เพิ่มสินค้าจาก catalog
**Test Case ID:** TC-CART-001  
**Title:** Add product to cart from catalog  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given cart ว่าง  
**Steps:**  
1. คลิก `Add to cart` ของสินค้า 1 รายการ  
2. สังเกตข้อความบนปุ่มและ badge ตะกร้า  
**Expected Result:**  
- ปุ่มเปลี่ยนเป็น `Remove`  
- badge แสดงจำนวนเป็น 1  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. ลบสินค้านั้นออกจาก cart  
2. ปิด browser tab  

### TC-CART-002 - เพิ่มสินค้าจาก detail page
**Test Case ID:** TC-CART-002  
**Title:** Add product to cart from detail page  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given อยู่ที่หน้ารายละเอียดสินค้า  
**Steps:**  
1. คลิก `Add to cart`  
2. ตรวจสอบ badge ตะกร้า  
**Expected Result:**  
- สินค้าถูกเพิ่มลง cart สำเร็จ  
- badge อัปเดตถูกต้อง  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. ลบสินค้านั้นออกจาก cart  
2. กลับไปหน้า inventory  
3. ปิด browser tab  

### TC-CART-003 - เพิ่มสินค้าสองรายการและ badge เพิ่มตามจริง
**Test Case ID:** TC-CART-003  
**Title:** Badge reflects 2 unique items  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given cart ว่าง  
**Steps:**  
1. เพิ่มสินค้า 1 รายการจาก catalog  
2. เพิ่มสินค้าอีกรายการที่แตกต่างกัน  
3. ตรวจสอบ badge ตะกร้า  
**Expected Result:**  
- badge แสดงค่า 2  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. ลบสินค้าทั้งสองรายการออกจาก cart  
2. ปิด browser tab  

### TC-CART-004 - เพิ่มสินค้าซ้ำจากหลายจุด
**Test Case ID:** TC-CART-004  
**Title:** Same item does not create duplicate cart count  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given cart ว่าง  
**Steps:**  
1. เพิ่มสินค้าเดิมจาก catalog  
2. ไปที่หน้ารายละเอียดของสินค้าเดียวกัน  
3. ตรวจสอบสถานะปุ่มและ badge  
**Expected Result:**  
- สินค้าเดิมไม่เพิ่มเป็นรายการซ้ำใน badge  
- ปุ่มแสดงสถานะ remove ตามการเพิ่มแล้ว  
**Actual Result:**  
**Status:**  
**Priority:** Medium  
**Teardown:**  
1. ลบสินค้านั้นออกจาก cart  
2. ปิด browser tab  

### TC-CART-005 - ตรวจสอบ state หลังเพิ่มและย้ายหน้า
**Test Case ID:** TC-CART-005  
**Title:** Cart state persists across navigation  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given เพิ่มสินค้าอย่างน้อย 1 รายการแล้ว  
**Steps:**  
1. ไปที่หน้า cart  
2. กลับไปหน้า inventory  
3. ตรวจสอบสถานะสินค้าและ badge อีกครั้ง  
**Expected Result:**  
- state ของ cart ยังอยู่ครบหลังสลับหน้า  
**Actual Result:**  
**Status:**  
**Priority:** Medium  
**Teardown:**  
1. ลบสินค้าทั้งหมดออกจาก cart  
2. ปิด browser tab  

### TC-CART-006 - Continue Shopping จากหน้า cart
**Test Case ID:** TC-CART-006  
**Title:** Continue Shopping redirects to inventory  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given อยู่ที่หน้า cart  
**Steps:**  
1. คลิก `Continue Shopping`  
2. ตรวจสอบหน้าที่เปิดขึ้น  
**Expected Result:**  
- ระบบพากลับไปที่ `/inventory.html`  
**Actual Result:**  
**Status:**  
**Priority:** Low  
**Teardown:**  
1. ปิด browser tab  

### TC-CART-007 - ลบสินค้าจาก catalog page
**Test Case ID:** TC-CART-007  
**Title:** Remove item from catalog page  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given เพิ่มสินค้าหนึ่งรายการแล้ว  
**Steps:**  
1. คลิกปุ่ม `Remove` บน catalog page  
2. ตรวจสอบ badge ตะกร้า  
**Expected Result:**  
- ปุ่มเปลี่ยนกลับเป็น `Add to cart`  
- badge ลดลงตามจริง  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. ล้าง cart ให้ว่าง  
2. ปิด browser tab  

### TC-CART-008 - ลบสินค้าจาก detail page
**Test Case ID:** TC-CART-008  
**Title:** Remove item from detail page  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given สินค้านั้นถูกเพิ่มลง cart แล้ว  
**Steps:**  
1. เปิดหน้ารายละเอียดของสินค้านั้น  
2. คลิกปุ่ม `Remove`  
3. ตรวจสอบ badge และสถานะปุ่ม  
**Expected Result:**  
- สินค้าถูกลบออกจาก cart  
- badge ลดลงถูกต้อง  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. ล้าง cart ให้ว่าง  
2. ปิด browser tab  

### TC-CART-009 - ลบสินค้าจาก cart page
**Test Case ID:** TC-CART-009  
**Title:** Remove item from cart page  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given เพิ่มสินค้าอย่างน้อย 1 รายการแล้ว  
**Steps:**  
1. ไปที่หน้า cart  
2. คลิก `Remove` ของรายการสินค้า  
3. ตรวจสอบว่ารายการหายไปจากหน้า cart  
**Expected Result:**  
- แถวสินค้าถูกลบจากหน้า cart  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. ล้าง cart ให้ว่าง  
2. ปิด browser tab  

### TC-CART-010 - ลบสินค้ารายการสุดท้ายและ badge หายไป
**Test Case ID:** TC-CART-010  
**Title:** Removing the last item clears the badge  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given cart มีสินค้าเพียง 1 รายการ  
**Steps:**  
1. ลบสินค้ารายการสุดท้ายออกจาก cart  
2. ตรวจสอบ badge ตะกร้า  
**Expected Result:**  
- badge หายไปหรือแสดงเป็น 0 ตามพฤติกรรมของระบบ  
**Actual Result:**  
**Status:**  
**Priority:** Medium  
**Teardown:**  
1. ปิด browser tab  

### TC-CART-011 - หน้า cart ว่างเมื่อไม่มีสินค้า
**Test Case ID:** TC-CART-011  
**Title:** Empty cart view shows no products  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given cart ว่าง  
**Steps:**  
1. ไปที่หน้า cart  
2. ตรวจสอบรายการสินค้าใน cart  
**Expected Result:**  
- ไม่แสดงรายการสินค้าในหน้า cart  
**Actual Result:**  
**Status:**  
**Priority:** Low  
**Teardown:**  
1. ปิด browser tab  

## 4. Checkout Flow

### TC-CHK-001 - Checkout step 1 ด้วยข้อมูลที่ถูกต้อง
**Test Case ID:** TC-CHK-001  
**Title:** Valid checkout information proceeds to step 2  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given มีสินค้าอย่างน้อย 1 รายการใน cart  
- Given อยู่ที่หน้า `Checkout: Your Information`  
**Steps:**  
1. กรอก First Name เป็น `John`  
2. กรอก Last Name เป็น `Doe`  
3. กรอก Postal Code เป็น `12345`  
4. คลิก `Continue`  
**Expected Result:**  
- ระบบพาไปหน้า `Checkout: Overview`  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. หากยังไม่ checkout ต่อ ให้กลับไปหน้า cart  
2. ปิด browser tab  

### TC-CHK-002 - ไม่กรอก First Name
**Test Case ID:** TC-CHK-002  
**Title:** Missing first name validation  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given มีสินค้าอย่างน้อย 1 รายการใน cart  
- Given อยู่ที่หน้า `Checkout: Your Information`  
**Steps:**  
1. เว้น First Name ว่าง  
2. กรอก Last Name เป็น `Doe`  
3. กรอก Postal Code เป็น `12345`  
4. คลิก `Continue`  
**Expected Result:**  
- แสดง validation error ของ First Name  
- ระบบไม่ไปขั้นตอนถัดไป  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. ปิด browser tab  

### TC-CHK-003 - ไม่กรอก Last Name
**Test Case ID:** TC-CHK-003  
**Title:** Missing last name validation  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given มีสินค้าอย่างน้อย 1 รายการใน cart  
- Given อยู่ที่หน้า `Checkout: Your Information`  
**Steps:**  
1. กรอก First Name เป็น `John`  
2. เว้น Last Name ว่าง  
3. กรอก Postal Code เป็น `12345`  
4. คลิก `Continue`  
**Expected Result:**  
- แสดง validation error ของ Last Name  
- ระบบไม่ไปขั้นตอนถัดไป  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. ปิด browser tab  

### TC-CHK-004 - ไม่กรอก Postal Code
**Test Case ID:** TC-CHK-004  
**Title:** Missing postal code validation  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given มีสินค้าอย่างน้อย 1 รายการใน cart  
- Given อยู่ที่หน้า `Checkout: Your Information`  
**Steps:**  
1. กรอก First Name เป็น `John`  
2. กรอก Last Name เป็น `Doe`  
3. เว้น Postal Code ว่าง  
4. คลิก `Continue`  
**Expected Result:**  
- แสดง validation error ของ Postal Code  
- ระบบไม่ไปขั้นตอนถัดไป  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. ปิด browser tab  

### TC-CHK-005 - ไม่กรอกข้อมูลทั้งหมด
**Test Case ID:** TC-CHK-005  
**Title:** All checkout fields empty  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given มีสินค้าอย่างน้อย 1 รายการใน cart  
- Given อยู่ที่หน้า `Checkout: Your Information`  
**Steps:**  
1. เว้นทุก field ว่าง  
2. คลิก `Continue`  
**Expected Result:**  
- แสดง validation error ตาม rule ของแต่ละ field  
**Actual Result:**  
**Status:**  
**Priority:** Medium  
**Teardown:**  
1. ปิด browser tab  

### TC-CHK-006 - Overview แสดง item list และยอดรวมครบถ้วน
**Test Case ID:** TC-CHK-006  
**Title:** Checkout overview shows item list, subtotal, tax, and total  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given มีสินค้าอย่างน้อย 1 รายการใน cart  
- Given ผ่าน checkout step 1 แล้ว  
- Given อยู่ที่หน้า `Checkout: Overview`  
**Steps:**  
1. ตรวจสอบรายการสินค้าใน overview  
2. ตรวจสอบ item subtotal  
3. ตรวจสอบ tax  
4. ตรวจสอบ total  
**Expected Result:**  
- แสดง item list, subtotal, tax และ total ถูกต้อง  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. ย้อนกลับไป cart หากยังไม่ finish  
2. ปิด browser tab  

### TC-CHK-007 - ตรวจสอบ tax rounding
**Test Case ID:** TC-CHK-007  
**Title:** Tax calculation rounds to two decimals  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given มีสินค้าใน cart ที่ทำให้ subtotal เกิดทศนิยมซับซ้อน  
- Given อยู่ที่หน้า `Checkout: Overview`  
**Steps:**  
1. ตรวจสอบ subtotal  
2. คำนวณ tax 8% ด้วยตนเอง  
3. เปรียบเทียบกับ tax ที่แสดงบนหน้า  
**Expected Result:**  
- tax ถูกปัดเป็น 2 ตำแหน่งทศนิยมอย่างถูกต้อง  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. ย้อนกลับไป cart หากยังไม่ finish  
2. ปิด browser tab  

### TC-CHK-008 - ตรวจสอบ total สำหรับหลายสินค้า
**Test Case ID:** TC-CHK-008  
**Title:** Final total is accurate with multiple cart items  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given มีสินค้าอย่างน้อย 2 รายการใน cart  
- Given อยู่ที่หน้า `Checkout: Overview`  
**Steps:**  
1. ตรวจสอบ subtotal ของทุกสินค้า  
2. ตรวจสอบ tax  
3. ตรวจสอบ total สุดท้าย  
**Expected Result:**  
- total = subtotal + tax อย่างถูกต้อง  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. ย้อนกลับไป cart หากยังไม่ finish  
2. ปิด browser tab  

### TC-CHK-009 - Finish checkout และแสดงข้อความสำเร็จ
**Test Case ID:** TC-CHK-009  
**Title:** Finish shows confirmation message  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given ผ่าน checkout step 1 และ step 2 แล้ว  
- Given อยู่ที่หน้า `Checkout: Overview`  
**Steps:**  
1. คลิก `Finish`  
2. ตรวจสอบข้อความบนหน้าจอ  
**Expected Result:**  
- แสดงข้อความ `Thank you for your order!`  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. ปิด browser tab  

### TC-CHK-010 - หลัง checkout cart ต้องว่าง
**Test Case ID:** TC-CHK-010  
**Title:** Cart empties after successful checkout  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given checkout สำเร็จแล้ว  
**Steps:**  
1. กลับไปหน้า cart  
2. ตรวจสอบรายการสินค้าใน cart  
**Expected Result:**  
- cart ว่างเปล่า  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. ปิด browser tab  

### TC-CHK-011 - กด Back หลัง finish ไม่ควรย้อนคำสั่งซื้อเดิม
**Test Case ID:** TC-CHK-011  
**Title:** Browser back after checkout completion does not restore active cart flow  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given checkout สำเร็จแล้ว  
**Steps:**  
1. ใช้ browser back  
2. สังเกตสถานะของหน้า checkout  
**Expected Result:**  
- ระบบไม่ย้อนกลับไปสภาพก่อนซื้อสำเร็จใน session เดิม  
**Actual Result:**  
**Status:**  
**Priority:** Medium  
**Teardown:**  
1. ปิด browser tab  

## 5. Session and Navigation

### TC-SES-001 - Logout ผ่าน sidebar แล้ว session ต้องจบ
**Test Case ID:** TC-SES-001  
**Title:** Logout ends the session immediately  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given อยู่ที่หน้า inventory  
**Steps:**  
1. เปิด sidebar menu  
2. คลิก `Logout`  
3. สังเกตการเปลี่ยนหน้าและสถานะ session  
**Expected Result:**  
- session ถูกยกเลิกทันที  
- ระบบพากลับหน้า login  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. ล้าง cookies/local storage  
2. ปิด browser tab  

### TC-SES-002 - เปิด `/inventory.html` ตรงหลัง logout ต้อง redirect
**Test Case ID:** TC-SES-002  
**Title:** Direct inventory URL redirects to login after logout  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given logout แล้ว  
**Steps:**  
1. พิมพ์ `/inventory.html` ใน address bar  
2. กด Enter  
3. สังเกตหน้าที่เปิดขึ้น  
**Expected Result:**  
- ระบบ redirect ไปหน้า login  
**Actual Result:**  
**Status:**  
**Priority:** High  
**Teardown:**  
1. ล้าง cookies/local storage  
2. ปิด browser tab  

### TC-SES-003 - เปิด `/cart.html` ตรงหลัง logout ต้อง redirect
**Test Case ID:** TC-SES-003  
**Title:** Direct cart URL redirects to login after logout  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given logout แล้ว  
**Steps:**  
1. พิมพ์ `/cart.html` ใน address bar  
2. กด Enter  
3. สังเกตหน้าที่เปิดขึ้น  
**Expected Result:**  
- ระบบ redirect ไปหน้า login  
**Actual Result:**  
**Status:**  
**Priority:** Medium  
**Teardown:**  
1. ล้าง cookies/local storage  
2. ปิด browser tab  

### TC-SES-004 - Refresh หรือ Back หลัง logout ไม่ควรคืน session
**Test Case ID:** TC-SES-004  
**Title:** Back/refresh after logout does not restore the session  
**Preconditions:**  
- Given user login สำเร็จแล้ว  
- Given logout แล้ว  
**Steps:**  
1. ใช้ browser back หรือ refresh หน้า login  
2. สังเกตว่ามีการเข้าถึงหน้า internal ได้หรือไม่  
**Expected Result:**  
- session ไม่กลับมา และหน้า internal ไม่ถูกแสดง  
**Actual Result:**  
**Status:**  
**Priority:** Medium  
**Teardown:**  
1. ล้าง cookies/local storage  
2. ปิด browser tab  
