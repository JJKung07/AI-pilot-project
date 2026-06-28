# ระยะที่ 05 — Negative Testing

**ข้อมูลนำเข้า**: [Business Rules](../../requirements/Business-Rules.md) | [Acceptance Criteria](../../requirements/Acceptance-Criteria.md) | [Phase 03](03-Manual-Test_Q.md) | [Phase 04](04-Boundary-Test_Q.md)

---

> **ข้อจำกัด**: Test cases เหล่านี้เป็นการทดสอบเชิงฟังก์ชันเพื่อสังเกตพฤติกรรมของแอปพลิเคชัน **ไม่ใช่** penetration test เต็มรูปแบบ ผลการทดสอบเหล่านี้ไม่สามารถทดแทนการประเมินความปลอดภัยโดยผู้เชี่ยวชาญได้

---

## Negative Test Cases

### Authentication

| Test ID | สถานการณ์ | Input | พฤติกรรม/Error ที่คาดหวัง | ระดับความเสี่ยง |
|---------|-----------|-------|---------------------------|----------------|
| NEG-AUTH-001 | ล็อกอินด้วย username ที่ไม่มีในระบบ | username: "nonexistent_user", password: "secret_sauce" | Error: "Username and password do not match any user in this service." | High |
| NEG-AUTH-002 | ล็อกอินด้วยรหัสผ่านที่ผิดสำหรับ user ที่มีอยู่ | username: "standard_user", password: "incorrect123" | Error: "Username and password do not match any user in this service." | High |
| NEG-AUTH-003 | ล็อกอินด้วย locked_out_user | username: "locked_out_user", password: "secret_sauce" | Error: "Sorry, this user has been locked out." — ต้องไม่อนุญาตให้เข้าระบบ | High |
| NEG-AUTH-004 | SQL Injection ใน username field | username: `' OR '1'='1' --`, password: "test" | Error: "Username and password do not match any user in this service." — ต้องไม่ bypass authentication | High |
| NEG-AUTH-005 | SQL Injection ใน password field | username: "standard_user", password: `' OR '1'='1' --` | Error: "Username and password do not match any user in this service." — ต้องไม่ bypass authentication | High |
| NEG-AUTH-006 | XSS attempt ใน username field | username: `<script>alert('XSS')</script>`, password: "test" | Error message แสดงปกติ — ต้องไม่ execute script | High |
| NEG-AUTH-007 | XSS attempt ใน password field | username: "standard_user", password: `<img src=x onerror=alert(1)>` | Error message แสดงปกติ — ต้องไม่ render HTML | High |
| NEG-AUTH-008 | ล็อกอินโดยไม่กรอกข้อมูลทั้ง 2 ช่อง | username: "", password: "" | Error: "Username is required" | Medium |
| NEG-AUTH-009 | username ที่มีช่องว่างนำหน้า/ตามหลัง | username: " standard_user ", password: "secret_sauce" | Error หรือ trim แล้วล็อกอินสำเร็จ — ต้องไม่ crash | Low |

### Navigation / Session

| Test ID | สถานการณ์ | Input | พฤติกรรม/Error ที่คาดหวัง | ระดับความเสี่ยง |
|---------|-----------|-------|---------------------------|----------------|
| NEG-NAV-001 | เข้า /inventory.html โดยไม่มี session | URL: /inventory.html โดยตรง (ไม่ได้ล็อกอิน) | Redirect ไปหน้า login | High |
| NEG-NAV-002 | เข้า /cart.html โดยไม่มี session | URL: /cart.html โดยตรง | Redirect ไปหน้า login | High |
| NEG-NAV-003 | เข้า /checkout-step-one.html โดยไม่มี session | URL: /checkout-step-one.html โดยตรง | Redirect ไปหน้า login | High |
| NEG-NAV-004 | เข้า /checkout-step-two.html โดยไม่มี session | URL: /checkout-step-two.html โดยตรง | Redirect ไปหน้า login | High |
| NEG-NAV-005 | เข้า /checkout-complete.html โดยไม่มี session | URL: /checkout-complete.html โดยตรง | Redirect ไปหน้า login | High |
| NEG-NAV-006 | Manipulate cart URL parameter | เปลี่ยน URL path ขณะอยู่ในระบบ เช่น เพิ่ม query string ที่ไม่ถูกต้อง | ระบบแสดงหน้าปกติหรือ error ที่เหมาะสม — ต้องไม่ crash | Medium |

### Checkout

| Test ID | สถานการณ์ | Input | พฤติกรรม/Error ที่คาดหวัง | ระดับความเสี่ยง |
|---------|-----------|-------|---------------------------|----------------|
| NEG-CHK-001 | ไม่กรอกข้อมูลทั้ง 3 ฟิลด์ใน step 1 | First Name: "", Last Name: "", Postal Code: "" | Error: "First Name is required" | High |
| NEG-CHK-002 | กรอก Postal Code ด้วยอักขระพิเศษ | First Name: "John", Last Name: "Doe", Postal Code: "!@#$%^" | ระบบยอมรับหรือแสดง error ที่เหมาะสม — ต้องไม่ crash | Medium |
| NEG-CHK-003 | XSS ใน First Name | First Name: `<script>alert(1)</script>`, Last Name: "Doe", Postal Code: "12345" | ระบบต้องไม่ execute script — แสดงข้อความปกติหรือ sanitize input | High |
| NEG-CHK-004 | กด Back button ของเบราว์เซอร์ระหว่าง checkout | ผู้ใช้อยู่ที่ step 2 แล้วกด browser back | ระบบกลับไป step 1 — ข้อมูลที่กรอกอาจหายหรือยังคงอยู่ แต่ต้องไม่ error | Medium |
| NEG-CHK-005 | กด Back button หลัง checkout สำเร็จ | ผู้ใช้อยู่ที่หน้า complete แล้วกด browser back | ต้องไม่สามารถ submit order ซ้ำได้ | Medium |
| NEG-CHK-006 | Checkout โดยตะกร้าว่าง | ผู้ใช้เข้า /checkout-step-one.html โดยตรงขณะตะกร้าว่าง | ระบบควรป้องกันหรือแสดงข้อความว่าไม่มีสินค้า | Medium |
| NEG-CHK-007 | SQL Injection ใน Postal Code | First Name: "John", Last Name: "Doe", Postal Code: `1; DROP TABLE orders;--` | ระบบยอมรับเป็นข้อความปกติหรือแสดง error — ต้องไม่ execute SQL | High |

### Cart

| Test ID | สถานการณ์ | Input | พฤติกรรม/Error ที่คาดหวัง | ระดับความเสี่ยง |
|---------|-----------|-------|---------------------------|----------------|
| NEG-CART-001 | ลบสินค้าที่ไม่อยู่ในตะกร้า | Manipulate DOM เพื่อเรียก remove บนสินค้าที่ยังไม่ได้เพิ่ม | ระบบไม่ crash — badge ไม่ลดต่ำกว่า 0 | Medium |
| NEG-CART-002 | Checkout กับตะกร้าว่าง | คลิกไอคอนตะกร้า → คลิก Checkout ขณะไม่มีสินค้า | ระบบควรป้องกันหรือแสดง step 1 โดยไม่ crash | Medium |
| NEG-CART-003 | เพิ่มสินค้าเดียวกันซ้ำ (double-click) | คลิก "Add to cart" 2 ครั้งติดกันอย่างรวดเร็ว | ปุ่มเปลี่ยนเป็น Remove แล้วกลับ Add (click ที่ 2 คือ Remove) — badge ต้องสอดคล้อง | Low |

### Sorting

| Test ID | สถานการณ์ | Input | พฤติกรรม/Error ที่คาดหวัง | ระดับความเสี่ยง |
|---------|-----------|-------|---------------------------|----------------|
| NEG-SORT-001 | เปลี่ยน sort อย่างรวดเร็วหลายครั้งติดกัน | เลือก sort option 4 แบบสลับไปมาอย่างรวดเร็ว | ลำดับสินค้าที่แสดงสุดท้ายต้องตรงกับ sort option สุดท้ายที่เลือก — ต้องไม่แสดงลำดับผิด | Medium |
| NEG-SORT-002 | เปลี่ยน sort ขณะเพิ่มสินค้าลงตะกร้า | เพิ่มสินค้าลงตะกร้า → เปลี่ยน sort ทันที | สินค้าที่เพิ่มแล้วต้องยังอยู่ในตะกร้า (badge ไม่เปลี่ยน) และปุ่มยังเป็น "Remove" | Medium |
| NEG-SORT-003 | เปลี่ยน sort หลังจากเพิ่มสินค้าบางรายการ | เพิ่ม 2 สินค้า → เปลี่ยน sort เป็น Price High→Low | ปุ่ม "Remove" ยังแสดงถูกต้องกับสินค้าที่เพิ่มแล้ว แม้ตำแหน่งการแสดงผลเปลี่ยนไป | Medium |

---

## สรุป

| หมวด | จำนวน Test Cases | High Risk | Medium Risk | Low Risk |
|------|-----------------|-----------|-------------|----------|
| Authentication | 9 | 7 | 1 | 1 |
| Navigation / Session | 6 | 5 | 1 | 0 |
| Checkout | 7 | 3 | 4 | 0 |
| Cart | 3 | 0 | 2 | 1 |
| Sorting | 3 | 0 | 3 | 0 |
| **รวม** | **28** | **15** | **11** | **2** |

Test cases ที่เกี่ยวข้องกับ OWASP Top 10:
- **A03:2021 Injection**: NEG-AUTH-004, NEG-AUTH-005, NEG-CHK-007
- **A07:2021 Cross-Site Scripting (XSS)**: NEG-AUTH-006, NEG-AUTH-007, NEG-CHK-003
