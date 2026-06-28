# ระยะที่ 05 - Negative Testing

เอกสารนี้เป็นชุดทดสอบเชิงลบสำหรับ SwagLabs Platform โดยเน้นการใช้งานผิดปกติ การป้อนข้อมูลไม่ถูกต้อง และการตรวจสอบการตอบสนองของระบบเมื่อถูกใช้งานในลักษณะที่ไม่คาดหวัง

> หมายเหตุ: การทดสอบชุดนี้เป็นการสังเกตพฤติกรรมเชิงฟังก์ชันเท่านั้น และไม่ถือเป็นการทำ penetration test แบบเต็มรูปแบบ

## Negative Test Case Table

| Test ID | Scenario | Input | Expected Error/Behavior | Risk Level |
|---|---|---|---|---|
| NEG-AUTH-001 | Login ด้วย invalid user | username = `unknown_user`, password = `secret_sauce` | แสดงข้อความ error ว่า username/password ไม่ตรงกับผู้ใช้ในระบบ | High |
| NEG-AUTH-002 | Login ด้วย wrong password | username = `standard_user`, password = `wrongpassword` | แสดงข้อความ error ว่าข้อมูลล็อกอินไม่ถูกต้อง | High |
| NEG-AUTH-003 | Login ด้วย locked user | username = `locked_out_user`, password = `secret_sauce` | แสดงข้อความ locked out และไม่สร้าง session | High |
| NEG-AUTH-004 | SQL injection attempt ในช่อง username | username = `' OR '1'='1`, password = `secret_sauce` | ระบบต้องปฏิเสธการเข้าสู่ระบบและไม่เปิด session | High |
| NEG-AUTH-005 | SQL injection attempt ในช่อง password | username = `standard_user`, password = `' OR '1'='1` | ระบบต้องปฏิเสธการเข้าสู่ระบบและไม่เปิด session | High |
| NEG-AUTH-006 | XSS attempt ในช่อง username | username = `<script>alert(1)</script>`, password = `secret_sauce` | ระบบต้องไม่ execute script และต้องแสดงข้อความ error อย่างปลอดภัย | High |
| NEG-NAV-001 | เข้าถึง `/inventory.html` โดยตรงโดยไม่มี session | URL = `/inventory.html` | ระบบ redirect ไปหน้า login ทันที | High |
| NEG-NAV-002 | เข้าถึง `/cart.html` โดยตรงโดยไม่มี session | URL = `/cart.html` | ระบบ redirect ไปหน้า login ทันที | High |
| NEG-NAV-003 | Manipulate cart URL หลัง logout | เปิด `/cart.html` หลัง logout แล้ว | ระบบต้องไม่แสดงข้อมูล cart และต้องกลับไป login | High |
| NEG-NAV-004 | รีเฟรชหน้าภายในหลัง logout | refresh หน้า inventory หรือ cart หลัง logout | session ต้องไม่กลับมา และต้องยังอยู่ที่หน้า login | Medium |
| NEG-CHK-001 | Checkout step 1 missing first name | First Name = empty, Last Name = `Doe`, Postal Code = `12345` | แสดง validation error ของ First Name และไม่ไป step 2 | High |
| NEG-CHK-002 | Checkout step 1 missing last name | First Name = `John`, Last Name = empty, Postal Code = `12345` | แสดง validation error ของ Last Name และไม่ไป step 2 | High |
| NEG-CHK-003 | Checkout step 1 missing postal code | First Name = `John`, Last Name = `Doe`, Postal Code = empty | แสดง validation error ของ Postal Code และไม่ไป step 2 | High |
| NEG-CHK-004 | Checkout step 1 invalid postal code format | Postal Code = `abc-12!` | ระบบต้องแสดง error หรือปฏิเสธค่าที่ไม่ถูกต้องตาม policy ของฟอร์ม | Medium |
| NEG-CHK-005 | Checkout step 1 ใช้อักขระพิเศษ/emoji ในชื่อ | First Name = `John🙂`, Last Name = `Doe<script>` | ระบบต้องไม่ render script และต้องจัดการ input อย่างปลอดภัย | Medium |
| NEG-CHK-006 | Browser back button ระหว่าง checkout | กด back จาก step 2 กลับไป step 1 หรือจาก completion กลับไป overview | ระบบต้องไม่ทำให้ข้อมูลสั่งซื้อเดิมย้อนกลับมาในสภาพที่ซื้อไม่เสร็จ | Medium |
| NEG-CART-001 | ลบ item ที่ไม่ได้อยู่ใน cart | กด Remove บนสินค้า which was never added | ระบบต้องไม่ลบ item อื่นและไม่ทำให้ badge ผิดพลาด | Medium |
| NEG-CART-002 | ลอง remove สินค้าซ้ำหลังลบไปแล้ว | Remove สินค้า 1 ครั้ง แล้วกด Remove ซ้ำ | ระบบต้องไม่ error และ state ต้องคงถูกต้อง | Medium |
| NEG-CART-003 | Proceed to checkout with empty cart | cart ว่าง, กด Checkout | ระบบต้องไม่ไป checkout step 1 หรือแจ้งว่าต้องมีสินค้าใน cart ก่อน | High |
| NEG-CART-004 | เปิดหน้า cart หลังลบรายการหมดแล้ว | cart ถูกล้างหมดแล้ว เปิด cart page | ระบบต้องแสดง cart ว่างอย่างถูกต้องและไม่ค้าง state เดิม | Low |
| NEG-SORT-001 | Rapid/spam clicking sorting changes | สลับ sort options อย่างรวดเร็วหลายครั้ง | ระบบต้องไม่ค้าง, ไม่ crash, และต้องแสดงผล sort ล่าสุดที่เลือก | Medium |
| NEG-SORT-002 | เปลี่ยน sort ระหว่างกำลังเพิ่ม item | เลือก sort ใหม่ทันทีหลังคลิก Add to cart | badge และ state ของปุ่มต้องยังถูกต้องหลัง sort เสร็จ | Medium |
| NEG-SORT-003 | เปลี่ยน sort หลังมี item อยู่ใน cart | มีสินค้าใน cart แล้วสลับ sort ไปมา | ปุ่ม Add/Remove และ badge ต้องไม่เพี้ยน | Medium |
| NEG-OWASP-001 | Injection payload ใน field checkout | First Name = `John' OR '1'='1` | ระบบต้องไม่ execute payload และต้อง handle input อย่างปลอดภัย | High |
| NEG-OWASP-002 | XSS payload ใน field checkout | Last Name = `<img src=x onerror=alert(1)>` | ระบบต้องไม่ execute script และต้องแสดงค่าเป็น text ปลอดภัย | High |
| NEG-OWASP-003 | XSS payload ในช่องค้นหาหรือ URL parameter ถ้ามี | ส่ง payload ผ่าน URL หรือ query string หากฟอร์มรองรับ | ระบบต้อง sanitize/encode และไม่ execute script | High |

## Additional Notes

1. กรณี SQL injection และ XSS ข้างต้นใช้เพื่อยืนยันว่า input ถูกจัดการอย่างปลอดภัยในระดับ functional behavior เท่านั้น
2. หากระบบไม่มี field หรือ route ที่รองรับ input บางชนิด ให้บันทึกผลเป็น "ไม่รองรับการทดลองเส้นทางนี้" แทนการสรุปว่า secure สมบูรณ์
3. ควรจับคู่ผลลัพธ์กับ error message ที่สอดคล้องกับ acceptance criteria และ business rules ที่มีอยู่
