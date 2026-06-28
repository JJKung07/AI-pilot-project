# ระยะที่ 04 - Boundary Value Analysis

**เอกสารอ้างอิง**: [Business Rules](../requirements/Business-Rules.md), [Test Data](../requirements/Test-Data.md), [ผลลัพธ์ Phase 03](03-Manual-Test_coPilot.md)

## 1. ข้อสมมติฐานสำหรับการทดสอบขอบเขต

1. ฟิลด์ข้อความทั้งหมดที่เกี่ยวกับ checkout ได้แก่ First Name, Last Name และ Postal Code ใช้ความยาวสูงสุดที่สมมติไว้เท่ากับ 255 ตัวอักษร
2. สำหรับฟิลด์ที่เป็น required field ค่า min-1 ให้ตีความเป็น empty string หรือ 0 ตัวอักษร
3. ค่า min สำหรับฟิลด์ข้อความที่ required ให้ตีความเป็น 1 ตัวอักษร
4. ค่า max+1 ให้ตีความเป็น 256 ตัวอักษร
5. สินค้าใน catalog มีทั้งหมด 6 รายการ และแต่ละรายการมีได้เพียง 1 หน่วยเท่านั้น
6. จำนวนสินค้าที่อยู่ใน cart สูงสุดจึงเท่ากับ 6 รายการแบบไม่ซ้ำกัน

## 2. BVA Matrix: Checkout Input Fields

### 2.1 First Name

| Boundary | Test Input | ความยาว | Expected Result |
|---|---|---|---|
| min-1 | empty string | 0 | แสดง validation error และไม่ไปขั้นตอนถัดไป |
| min | `A` | 1 | ผ่าน validation หาก Last Name และ Postal Code ถูกต้อง |
| min+1 | `AB` | 2 | ผ่าน validation หากฟิลด์อื่นถูกต้อง |
| max-1 | string 254 ตัวอักษร | 254 | ผ่าน validation หากฟิลด์อื่นถูกต้อง |
| max | string 255 ตัวอักษร | 255 | ผ่าน validation หากฟิลด์อื่นถูกต้อง |
| max+1 | string 256 ตัวอักษร | 256 | ระบบควร reject หรือแสดง validation ตามข้อจำกัดของฟอร์ม |

### 2.2 Last Name

| Boundary | Test Input | ความยาว | Expected Result |
|---|---|---|---|
| min-1 | empty string | 0 | แสดง validation error และไม่ไปขั้นตอนถัดไป |
| min | `A` | 1 | ผ่าน validation หาก First Name และ Postal Code ถูกต้อง |
| min+1 | `AB` | 2 | ผ่าน validation หากฟิลด์อื่นถูกต้อง |
| max-1 | string 254 ตัวอักษร | 254 | ผ่าน validation หากฟิลด์อื่นถูกต้อง |
| max | string 255 ตัวอักษร | 255 | ผ่าน validation หากฟิลด์อื่นถูกต้อง |
| max+1 | string 256 ตัวอักษร | 256 | ระบบควร reject หรือแสดง validation ตามข้อจำกัดของฟอร์ม |

### 2.3 Postal Code

| Boundary | Test Input | ความยาว | Expected Result |
|---|---|---|---|
| min-1 | empty string | 0 | แสดง validation error และไม่ไปขั้นตอนถัดไป |
| min | `1` | 1 | ผ่าน validation หาก First Name และ Last Name ถูกต้อง |
| min+1 | `12` | 2 | ผ่าน validation หากฟิลด์อื่นถูกต้อง |
| max-1 | string 254 ตัวอักษร | 254 | ผ่าน validation หากฟิลด์อื่นถูกต้อง |
| max | string 255 ตัวอักษร | 255 | ผ่าน validation หากฟิลด์อื่นถูกต้อง |
| max+1 | string 256 ตัวอักษร | 256 | ระบบควร reject หรือแสดง validation ตามข้อจำกัดของฟอร์ม |

## 3. BVA Matrix: System Limits

### 3.1 Product Quantity Boundary

| Boundary | Test Input | Expected Result |
|---|---|---|
| min-1 | 0 ของสินค้าชิ้นเดียว | ไม่สามารถเพิ่มสินค้าที่ไม่มีอยู่ใน catalog ได้ |
| min | 1 ของสินค้า 1 รายการ | เพิ่มลง cart ได้สำเร็จ |
| min+1 | Attempt to add same item อีกครั้ง | ระบบไม่ควรนับเกิน 1 สำหรับ item เดิม |
| max-1 | 5 รายการที่ไม่ซ้ำกันใน cart | เพิ่มได้ครบและ badge แสดง 5 |
| max | 6 รายการที่ไม่ซ้ำกันใน cart | badge แสดง 6 และ cart ครบทุกสินค้า |
| max+1 | Attempt to add item ที่ 7 | ทำไม่ได้ เพราะ catalog มีเพียง 6 รายการ |

### 3.2 Cart Count Boundary

| Boundary | Test Input | Expected Result |
|---|---|---|
| min-1 | badge empty / 0 หลังล้าง cart | ไม่แสดงจำนวนสินค้าหรือแสดง 0 ตามพฤติกรรมของระบบ |
| min | 1 item ใน cart | badge แสดง 1 |
| min+1 | 2 items ใน cart | badge แสดง 2 |
| max-1 | 5 items ใน cart | badge แสดง 5 |
| max | 6 items ใน cart | badge แสดง 6 |
| max+1 | 7 items ใน cart | ไม่สามารถเกิดขึ้นได้ตาม rule ของระบบ |

### 3.3 Price Boundary

| Boundary | Product | Price | Expected Result |
|---|---|---|---|
| min-1 | N/A | ต่ำกว่าราคาต่ำสุดที่ระบบไม่มีอยู่จริง | ไม่ควรมีสินค้า/price ต่ำกว่านี้ใน catalog |
| min | Sauce Labs Onesie | $7.99 | แสดงผลและเรียงลำดับได้ถูกต้อง |
| min+1 | Sauce Labs Bike Light | $9.99 | แสดงผลและคำนวณ subtotal/total ได้ถูกต้อง |
| max-1 | Sauce Labs Backpack / Sauce Labs Bike Light (ตามลำดับ sort) | $29.99 / $15.99 | แสดงผลและคำนวณได้ถูกต้อง |
| max | Sauce Labs Fleece Jacket | $49.99 | แสดงผลเป็นราคาสูงสุดของ catalog |
| max+1 | N/A | สูงกว่าราคาสูงสุดที่ระบบไม่มีอยู่จริง | ไม่ควรมีสินค้า/price สูงกว่านี้ใน catalog |

## 4. Boundary Test Cases ที่ควรใช้ในการทดสอบจริง

| TC ID | Scenario | Input / Boundary | Expected Result | Risk |
|---|---|---|---|---|
| BVA-CHK-001 | Checkout First Name empty | First Name = empty string | Validation error แสดงและไม่ไปขั้นตอนถัดไป | High |
| BVA-CHK-002 | Checkout First Name max length | First Name = 255 chars | ผ่าน validation | Medium |
| BVA-CHK-003 | Checkout First Name over length | First Name = 256 chars | Reject / validation error | High |
| BVA-CHK-004 | Checkout Last Name empty | Last Name = empty string | Validation error แสดงและไม่ไปขั้นตอนถัดไป | High |
| BVA-CHK-005 | Checkout Postal Code empty | Postal Code = empty string | Validation error แสดงและไม่ไปขั้นตอนถัดไป | High |
| BVA-CHK-006 | Checkout Postal Code max length | Postal Code = 255 chars | ผ่าน validation | Medium |
| BVA-CHK-007 | Checkout Postal Code over length | Postal Code = 256 chars | Reject / validation error | High |
| BVA-CHK-008 | Product quantity minimum | Add 1 item | badge = 1 | High |
| BVA-CHK-009 | Duplicate add boundary | Add same item twice | ระบบไม่ควรเพิ่มเป็น quantity 2 | High |
| BVA-CHK-010 | Cart maximum unique items | Add all 6 unique products | badge = 6 | High |
| BVA-CHK-011 | Cart max+1 impossible case | Attempt add item 7 | เพิ่มไม่ได้ | Medium |
| BVA-CHK-012 | Price minimum item | Sauce Labs Onesie $7.99 | แสดงราคาและคำนวณยอดรวมถูกต้อง | High |
| BVA-CHK-013 | Price maximum item | Sauce Labs Fleece Jacket $49.99 | แสดงราคาและคำนวณยอดรวมถูกต้อง | High |
| BVA-CHK-014 | Tax rounding boundary | Subtotal ที่สร้าง tax มีเศษทศนิยม | Tax ปัดเป็น 2 ตำแหน่งถูกต้อง | High |

## 5. การประเมินความเสี่ยง

| Boundary Case | เหตุผลที่เสี่ยง | โอกาสพบ defect |
|---|---|---|
| Empty string ในฟิลด์ required | เป็น input boundary ที่มักทำให้ validation หลุดถ้าการตรวจสอบไม่ครบ | สูง |
| ความยาว 256 ตัวอักษร | เป็น max+1 ที่ชอบพลาดจากการตรวจ length แบบ off-by-one | สูง |
| Duplicate add ของสินค้าเดิม | เสี่ยงต่อ bug เรื่อง badge count และ state ของปุ่ม Add/Remove | สูง |
| Add จนถึง cart count 6 | เป็นจุดสูงสุดตามจำนวนสินค้าจริงของระบบ จึงมักเจอปัญหา state overflow | สูง |
| Tax rounding ที่ subtotal ทำให้เกิดทศนิยม | ความผิดพลาดเรื่องการปัดเศษส่งผลต่อยอดรวมและความเชื่อมั่นด้านการเงิน | สูง |
| ราคาต่ำสุดและสูงสุดของ catalog | ใช้ตรวจ sort order และ subtotal/total calculation ที่ boundary ของข้อมูลจริง | ปานกลาง |

## 6. ข้อสรุป

จาก BVA นี้ จุดที่มีโอกาสพบ defect สูงที่สุดคือ validation ของฟิลด์ checkout ที่ขอบเขต empty/over-length, พฤติกรรมการเพิ่มสินค้าซ้ำ, การจำกัด cart count ที่ 6 รายการ, และ tax rounding ใน checkout step 2 เนื่องจากเป็นจุดที่มีความเสี่ยงสูงต่อ off-by-one, state mismatch และความคลาดเคลื่อนด้านการคำนวณ
