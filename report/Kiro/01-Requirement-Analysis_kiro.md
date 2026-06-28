# Phase 01 — Requirement Analysis

**โปรเจกต์**: SwagLabs Commerce Platform  
**บทบาท**: Senior QA Analyst  
**วันที่**: 2026-06-28  
**เอกสารอ้างอิง**: `requirements/BRD.md`, `requirements/User-Stories.md`

---

## 1. Requirements Traceability Matrix (RTM)

| Requirement ID | รายละเอียด Requirement | User Story ที่เกี่ยวข้อง | เงื่อนไขการทดสอบระดับสูง (High-Level Test Conditions) |
|---|---|---|---|
| REQ-01 | User Authentication | US-001, US-002, US-003, US-018 | - เข้าสู่ระบบด้วย credentials ที่ถูกต้อง → เข้าถึง catalog ได้<br>- เข้าสู่ระบบด้วย locked-out user → แสดง error message<br>- เข้าสู่ระบบด้วย credentials ที่ไม่ถูกต้อง → แสดง error message<br>- Logout → redirect ไปหน้า login และ clear session |
| REQ-02 | Product Catalog Browsing | US-004 | - หน้า catalog แสดงสินค้าครบ 6 รายการ<br>- สินค้าแต่ละรายการมี title, description, image, price |
| REQ-03 | Product Sorting and Filtering | US-005, US-006, US-007, US-008 | - Sort A-Z → สินค้าเรียงตามตัวอักษร<br>- Sort Z-A → สินค้าเรียงย้อนกลับ<br>- Sort Price Low-High → ราคาจาก $7.99 ถึง $49.99<br>- Sort Price High-Low → ราคาจาก $49.99 ถึง $7.99 |
| REQ-04 | Product Detail Page | US-009 | - คลิกที่ชื่อ/รูปสินค้า → แสดงหน้า detail พร้อมรูปใหญ่, คำอธิบาย, ปุ่ม Add to cart |
| REQ-05 | Shopping Cart - Add | US-010, US-011 | - เพิ่มสินค้าจาก catalog → ปุ่มเปลี่ยนเป็น "Remove" และ badge เพิ่มขึ้น<br>- เพิ่มสินค้าจาก detail page → ปุ่ม Add to cart ทำงานได้ |
| REQ-06 | Shopping Cart - Remove | US-012, US-014 | - ลบสินค้าจาก catalog → ปุ่มกลับเป็น "Add to cart" และ badge ลดลง<br>- ลบสินค้าจาก cart page → แถวสินค้าหายไป |
| REQ-07 | Shopping Cart Badge | US-020 | - Badge แสดงจำนวนสินค้าที่ถูกต้อง<br>- เมื่อเพิ่ม/ลบสินค้า badge อัปเดตทันที |
| REQ-08 | Checkout Step 1 (Information) | US-015 | - กรอกข้อมูลครบ → ไปหน้า step 2 ได้<br>- เว้นช่องว่าง → แสดง validation error |
| REQ-09 | Checkout Step 2 (Overview) | US-016 | - แสดงรายการสินค้า, subtotal, ภาษี 8%, ยอดรวมสุดท้าย<br>- ตัวเลขคำนวณถูกต้อง |
| REQ-10 | Checkout Step 3 (Confirmation) | US-017 | - คลิก "Finish" → แสดงข้อความ "Thank you for your order!"<br>- Cart ถูกล้างหลัง confirm |
| REQ-11 | Logout and Session Management | US-018 | - Logout จาก sidebar → redirect ไป login<br>- เข้าถึงหน้าภายในโดยไม่ login → redirect ไป login |

### User Stories ที่ไม่ได้ถูก map โดยตรงกับ Requirement ใด:

| User Story | รายละเอียด | ข้อสังเกต |
|---|---|---|
| US-013 | View shopping cart (ดูรายการในตะกร้า) | เกี่ยวข้องกับ REQ-05/REQ-06 แต่ BRD ไม่มี requirement เฉพาะสำหรับ "การดูตะกร้าสินค้า" |
| US-019 | Navigate back from cart to shopping | ไม่มี requirement ใน BRD ที่ครอบคลุม navigation flow ย้อนกลับ |

---

## 2. Gap Analysis — ช่องว่างและความคลุมเครือ

| # | ประเภท | รายละเอียด | ผลกระทบ |
|---|---|---|---|
| GAP-01 | ช่องว่าง (Missing Requirement) | BRD ไม่มี requirement สำหรับ "การดูรายการในตะกร้าสินค้า" (View Cart) แม้ว่า US-013 จะระบุไว้ | ไม่มีเกณฑ์อ้างอิงในการ verify ว่าหน้า cart ต้องแสดงข้อมูลอะไรบ้าง |
| GAP-02 | ช่องว่าง (Missing Requirement) | ไม่มี requirement สำหรับ navigation flow เช่น "Continue Shopping" button (US-019) | ขาดการตรวจสอบ user flow ที่สมบูรณ์ |
| GAP-03 | ความคลุมเครือ (Ambiguity) | REQ-01 ระบุว่า "handle locked-out states gracefully" แต่ไม่ได้ระบุ error message ที่ชัดเจน (ต้องดู US-002 เพื่อให้ได้ข้อความที่แน่นอน) | BRD ควร self-contained มากกว่านี้ |
| GAP-04 | ความคลุมเครือ (Ambiguity) | REQ-07 ระบุว่า badge แสดง "total number of items" — หมายถึงจำนวน unique items หรือ total quantity? (US-020 ระบุ "unique items") | อาจทำให้ทดสอบผิดหาก interpret ต่างกัน |
| GAP-05 | ช่องว่าง (Missing Requirement) | BRD ไม่ระบุ behavior เมื่อ cart ว่างแล้วพยายาม checkout | ไม่มีเกณฑ์ทดสอบสำหรับ edge case นี้ |
| GAP-06 | ช่องว่าง (Missing Requirement) | ไม่มี requirement เกี่ยวกับ session timeout หรือ session expiry โดยอัตโนมัติ (นอกจาก logout) | ไม่สามารถทดสอบ security scenario ที่ session หมดอายุได้ |
| GAP-07 | ความคลุมเครือ (Ambiguity) | REQ-09 ระบุ "8% tax" แต่ไม่ได้บอกว่า rounding rule เป็นอย่างไร (round up, round down, หรือ round half-up) | อาจทำให้ผลลัพธ์ actual vs expected ต่างกัน |
| GAP-08 | ช่องว่าง (Missing Requirement) | ไม่มี requirement สำหรับ `problem_user` หรือ `performance_glitch_user` ที่อาจมีใน SwagLabs | ไม่ชัดเจนว่าต้องทดสอบ user types เหล่านี้หรือไม่ |

---

## 3. การจำแนก Requirements: Testable vs Non-Testable

### Testable Requirements (สามารถทดสอบได้)

| Requirement | เหตุผล |
|---|---|
| REQ-01: User Authentication | มี input/output ที่ชัดเจน — credentials → redirect หรือ error message |
| REQ-02: Product Catalog | สามารถตรวจสอบได้ว่ามี 6 สินค้า และแต่ละรายการมีข้อมูลครบ |
| REQ-03: Sorting | สามารถ verify ลำดับของสินค้าหลังเลือก sort ได้ |
| REQ-04: Product Detail | สามารถตรวจสอบ navigation และเนื้อหาหน้า detail ได้ |
| REQ-05: Cart - Add | สามารถตรวจสอบ state ของปุ่มและ badge ได้ |
| REQ-06: Cart - Remove | สามารถตรวจสอบการลบสินค้าและ state change ได้ |
| REQ-07: Cart Badge | สามารถนับจำนวน badge และเปรียบเทียบกับจำนวนสินค้าจริงได้ |
| REQ-08: Checkout Step 1 | สามารถทดสอบ form validation (กรอก/ไม่กรอก) ได้ |
| REQ-09: Checkout Step 2 | สามารถคำนวณและเปรียบเทียบตัวเลข subtotal, tax, total ได้ |
| REQ-10: Checkout Step 3 | สามารถตรวจสอบ success message และ cart state ได้ |
| REQ-11: Logout/Session | สามารถตรวจสอบ redirect behavior ได้ |

### Non-Testable / ทดสอบได้ยากในระดับ Functional Test

| Requirement | เหตุผล |
|---|---|
| NFR - Performance (< 3 วินาที) | ต้องใช้ performance testing tool เฉพาะ และขึ้นอยู่กับ environment |
| NFR - Cross-Browser Compatibility | Testable ได้แต่ต้องมี multi-browser setup — ไม่ใช่ single test case |
| NFR - WCAG 2.1 AA Accessibility | ต้องใช้ accessibility testing tool เฉพาะ และการตรวจสอบด้วยมนุษย์ |
| NFR - HTTPS/Security | เป็น infrastructure-level verification ไม่ใช่ functional test |
| Business Objective: ลด Cart Abandonment 15% | เป็น metric ที่ต้องวัดจาก production data ไม่สามารถทดสอบใน QA environment ได้ |

---

## 4. Risk Assessment — การประเมินความเสี่ยง

| ระดับ | Requirement | ความเสี่ยง | เหตุผล |
|---|---|---|---|
| 🔴 สูง | REQ-01 (Authentication) | **locked_out_user เป็น boundary case** | - เป็น edge case ที่สำคัญด้าน security<br>- หากไม่จัดการอย่างถูกต้อง อาจทำให้ user ที่ถูก lock เข้าถึงระบบได้<br>- ต้องทดสอบว่า lock state คงอยู่ตลอด session และไม่สามารถ bypass ได้<br>- ข้อความ error ต้องแม่นยำไม่เปิดเผยข้อมูลเกินจำเป็น |
| 🔴 สูง | REQ-09 (Checkout - Overview) | การคำนวณภาษี 8% | - เกี่ยวข้องกับเงิน ผิดพลาดไม่ได้<br>- Rounding rule ไม่ชัดเจน<br>- ต้องทดสอบกับหลาย combinations ของสินค้า<br>- Story points สูงสุด (5) บ่งบอกความซับซ้อน |
| 🔴 สูง | REQ-11 (Session Management) | การเข้าถึงหน้าภายในโดยไม่ login | - เป็น security requirement<br>- ต้องทดสอบทุก internal URL path<br>- Session manipulation อาจเป็นช่องโหว่<br>- ไม่ชัดเจนว่ามีกี่ path ที่ต้อง protect |
| 🟡 กลาง | REQ-05/REQ-06 (Cart Add/Remove) | State synchronization ระหว่างหลายหน้า | - เพิ่ม/ลบสินค้าได้จาก 3 หน้าต่างกัน (catalog, detail, cart)<br>- ต้อง sync state ให้ถูกต้องทุกหน้า<br>- Race condition อาจเกิดขึ้น |
| 🟡 กลาง | REQ-08 (Checkout Step 1) | Form validation | - ต้องทดสอบ combination ของ empty fields หลายแบบ<br>- ไม่ระบุ format validation (เช่น postal code format)<br>- Special characters ใน name fields |
| 🟢 ต่ำ | REQ-02 (Product Catalog) | Static content display | - ข้อมูลเป็น static ไม่มี dynamic logic ซับซ้อน<br>- จำนวนสินค้าคงที่ (6 รายการ) |
| 🟢 ต่ำ | REQ-03 (Sorting) | Sort functionality | - เป็น standard sorting มี 4 options ที่ชัดเจน<br>- สามารถ verify ได้ง่าย |

---

## 5. คำถามสำหรับ Business Analyst

### คำถามที่ 1: Cart Badge — นับจำนวนอย่างไร?
> REQ-07 ระบุว่า badge แสดง "total number of items" — หมายถึง **จำนวน unique product** หรือ **total quantity** (เช่น ถ้าเพิ่มสินค้าเดียวกัน 3 ชิ้น badge แสดง 1 หรือ 3)?  
> US-020 ระบุว่า "unique items" — ขอยืนยันว่า system ไม่รองรับการเพิ่มสินค้าเดียวกันมากกว่า 1 ชิ้น ใช่หรือไม่?

### คำถามที่ 2: Tax Rounding Rule
> REQ-09 กำหนดภาษี 8% — เมื่อคำนวณแล้วได้ทศนิยมเกิน 2 ตำแหน่ง (เช่น item total = $53.97 → tax = $4.3176) ใช้ **rounding rule** อะไร? Round half-up เป็น $4.32 หรือ truncate เป็น $4.31?

### คำถามที่ 3: Empty Cart Checkout
> หาก user พยายามไปยังหน้า checkout โดยไม่มีสินค้าในตะกร้า ระบบควรทำอย่างไร? Block ไม่ให้เข้า checkout? แสดง error? หรือปล่อยให้เข้าไปได้?

### คำถามที่ 4: User Types อื่นๆ
> SwagLabs มี user types อื่นเช่น `problem_user`, `performance_glitch_user`, `error_user` — เราจำเป็นต้องทดสอบ user เหล่านี้ด้วยหรือไม่? หรืออยู่นอก scope ของ pilot นี้?

### คำถามที่ 5: Postal Code Validation
> REQ-08 ระบุว่า Postal Code เป็น mandatory field — แต่มี **format validation** หรือไม่? (เช่น ต้องเป็นตัวเลข 5 หลัก หรือรับ input อะไรก็ได้ที่ไม่ว่าง?)

---

## สรุป

| หมวดหมู่ | จำนวน |
|---|---|
| Requirements ทั้งหมด (BRD) | 11 functional + 4 non-functional |
| User Stories ทั้งหมด | 20 |
| Requirements ที่ Testable | 11/11 functional requirements |
| Gaps ที่พบ | 8 รายการ |
| Risk Areas (สูง) | 3 รายการ (Authentication/locked_out_user, Tax Calculation, Session Management) |
| คำถามสำหรับ BA | 5 ข้อ |

---

*เอกสารนี้สร้างโดย Kiro AI — Senior QA Analyst Review*
