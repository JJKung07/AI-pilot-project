# Phase 04 — Boundary Value Analysis (BVA)

**โปรเจกต์**: SwagLabs Commerce Platform  
**บทบาท**: Senior QA Engineer  
**วันที่**: 2026-06-28  
**เอกสารอ้างอิง**: `requirements/Business-Rules.md`, `requirements/Test-Data.md`, Phase 03 Manual Test Cases

---

## 1. สมมติฐาน (Assumptions)

| รายการ | ค่าที่สมมติ | เหตุผล |
|---|---|---|
| Maximum field length (text fields) | **255 characters** | ค่า default ทั่วไปสำหรับ text input fields |
| Minimum field length (required) | **1 character** | field ที่ required ต้องมีอย่างน้อย 1 character |
| Below-minimum (min-1) | **0 characters (empty string)** | empty string เป็น boundary ต่ำกว่า minimum |
| Product quantity per item | **1 ชิ้น** (ไม่สามารถเพิ่มเกิน 1 ต่อ item) | SwagLabs รองรับแค่ unique items |
| Maximum cart items | **6 items** | มี 6 สินค้าในระบบ, เพิ่มได้ item ละ 1 |
| Minimum price | **$7.99** | Sauce Labs Onesie |
| Maximum price | **$49.99** | Sauce Labs Fleece Jacket |

---

## 2. BVA Matrix — Checkout Input Fields

### 2.1 First Name Field

| Boundary | จำนวนตัวอักษร | Test Input | Expected Result | ความเสี่ยง |
|---|---|---|---|---|
| min-1 (below minimum) | 0 | `""` (empty string) | ❌ Error: "First Name is required" | สูง |
| min (minimum valid) | 1 | `"J"` | ✅ ผ่าน — ไปหน้า step 2 | สูง |
| min+1 | 2 | `"Jo"` | ✅ ผ่าน | ต่ำ |
| nominal | 4 | `"John"` | ✅ ผ่าน | ต่ำ |
| max-1 | 254 | `"J" × 254 ตัว` | ✅ ผ่าน | กลาง |
| max (maximum valid) | 255 | `"J" × 255 ตัว` | ✅ ผ่าน | สูง |
| max+1 (above maximum) | 256 | `"J" × 256 ตัว` | ⚠️ ถูกตัดเหลือ 255 หรือแสดง error | สูง |

### 2.2 Last Name Field

| Boundary | จำนวนตัวอักษร | Test Input | Expected Result | ความเสี่ยง |
|---|---|---|---|---|
| min-1 (below minimum) | 0 | `""` (empty string) | ❌ Error: "Last Name is required" | สูง |
| min (minimum valid) | 1 | `"D"` | ✅ ผ่าน | สูง |
| min+1 | 2 | `"Do"` | ✅ ผ่าน | ต่ำ |
| nominal | 3 | `"Doe"` | ✅ ผ่าน | ต่ำ |
| max-1 | 254 | `"D" × 254 ตัว` | ✅ ผ่าน | กลาง |
| max (maximum valid) | 255 | `"D" × 255 ตัว` | ✅ ผ่าน | สูง |
| max+1 (above maximum) | 256 | `"D" × 256 ตัว` | ⚠️ ถูกตัดเหลือ 255 หรือแสดง error | สูง |

### 2.3 Postal Code Field

| Boundary | จำนวนตัวอักษร | Test Input | Expected Result | ความเสี่ยง |
|---|---|---|---|---|
| min-1 (below minimum) | 0 | `""` (empty string) | ❌ Error: "Postal Code is required" | สูง |
| min (minimum valid) | 1 | `"1"` | ✅ ผ่าน | สูง |
| min+1 | 2 | `"12"` | ✅ ผ่าน | ต่ำ |
| nominal | 5 | `"12345"` | ✅ ผ่าน | ต่ำ |
| alphanumeric | 8 | `"AB12 CD34"` | ✅ ผ่าน (ตาม Test Data) | กลาง |
| max-1 | 254 | `"1" × 254 ตัว` | ✅ ผ่าน | กลาง |
| max (maximum valid) | 255 | `"1" × 255 ตัว` | ✅ ผ่าน | สูง |
| max+1 (above maximum) | 256 | `"1" × 256 ตัว` | ⚠️ ถูกตัดเหลือ 255 หรือแสดง error | สูง |

---

## 3. BVA Matrix — System Boundaries

### 3.1 Product Quantity Boundaries (ต่อ item)

| Boundary | ค่า | สถานการณ์ | Expected Result | ความเสี่ยง |
|---|---|---|---|---|
| min-1 | 0 | สินค้ายังไม่ถูกเพิ่ม — ปุ่มแสดง "Add to cart" | ✅ ปุ่ม "Add to cart" แสดง | ต่ำ |
| min = max | 1 | เพิ่มสินค้า 1 ชิ้น — ปุ่มเปลี่ยนเป็น "Remove" | ✅ ปุ่มเปลี่ยน, badge +1 | ต่ำ |
| max+1 | 2 | พยายามเพิ่มสินค้าเดียวกันซ้ำ (double click) | ⚠️ ไม่ควรเพิ่มซ้ำ — ปุ่มแสดง "Remove" อยู่แล้ว | กลาง |

### 3.2 Cart Count Boundaries

| Boundary | จำนวน Items | สถานการณ์ | Expected Result | ความเสี่ยง |
|---|---|---|---|---|
| min-1 | 0 | Cart ว่าง | Badge ไม่แสดง (hidden) | กลาง |
| min | 1 | เพิ่มสินค้า 1 ชิ้น | Badge แสดง "1" | ต่ำ |
| min+1 | 2 | เพิ่มสินค้า 2 ชิ้น | Badge แสดง "2" | ต่ำ |
| max-1 | 5 | เพิ่มสินค้า 5 ชิ้น | Badge แสดง "5" | กลาง |
| max | 6 | เพิ่มสินค้าครบ 6 ชิ้น (ทั้งหมดในระบบ) | Badge แสดง "6" | สูง |
| max+1 | 7+ | ไม่สามารถเพิ่มได้อีก (มีแค่ 6 สินค้า) | ไม่มีปุ่ม "Add to cart" เหลือ | กลาง |

### 3.3 Price Boundaries

| Boundary | ราคา | สินค้า | สถานการณ์ทดสอบ | ความเสี่ยง |
|---|---|---|---|---|
| Minimum price | $7.99 | Sauce Labs Onesie | Checkout ด้วย item ราคาต่ำสุด — Tax = $0.64 | สูง |
| Maximum price | $49.99 | Sauce Labs Fleece Jacket | Checkout ด้วย item ราคาสูงสุด — Tax = $4.00 | กลาง |
| Min total (1 item cheapest) | $7.99 | Onesie only | Total = $7.99 + $0.64 = $8.63 | สูง |
| Max total (all 6 items) | $129.94 | All products | Total = $129.94 + $10.40 = $140.34 | สูง |

### 3.4 Tax Calculation Boundaries

| Item Total | Tax (8%) | Raw Calculation | Rounded (2 dp) | ความเสี่ยง |
|---|---|---|---|---|
| $7.99 (min) | $0.64 | $0.6392 | $0.64 (round up) | สูง |
| $9.99 | $0.80 | $0.7992 | $0.80 (round up) | กลาง |
| $15.99 | $1.28 | $1.2792 | $1.28 (round up) | กลาง |
| $29.99 | $2.40 | $2.3992 | $2.40 (round up) | ต่ำ (มี AC confirm) |
| $49.99 (max single) | $4.00 | $3.9992 | $4.00 (round up) | กลาง |
| $31.98 (2 items @ $15.99) | $2.56 | $2.5584 | $2.56 (round up) | สูง |
| $129.94 (all 6) | $10.40 | $10.3952 | $10.40 (round up) | สูง |

---

## 4. สรุป Boundary Cases ที่มีโอกาสพบ Defect สูง

| # | Boundary Case | เหตุผลที่เสี่ยง | ลำดับความสำคัญ |
|---|---|---|---|
| 1 | **Empty string (0 chars) สำหรับ required fields** | เป็น boundary พื้นฐานที่มักถูกข้ามใน validation — ถ้า trim ไม่ดีอาจผ่านด้วย spaces | 🔴 สูง |
| 2 | **Max+1 (256 chars) สำหรับ text fields** | หากไม่มี maxlength attribute หรือ server-side validation อาจทำให้เกิด data truncation หรือ DB error | 🔴 สูง |
| 3 | **Tax calculation กับ minimum price ($7.99)** | $7.99 × 0.08 = $0.6392 — rounding ที่จุดนี้มีผลต่อ accuracy, ต่างจาก AC example ที่ $29.99 ลงตัวกว่า | 🔴 สูง |
| 4 | **Tax calculation กับ all 6 items ($129.94)** | Maximum cart scenario — accumulated rounding errors อาจทำให้ total ผิดพลาด | 🔴 สูง |
| 5 | **Cart count = 0 (empty) → badge behavior** | Badge ต้อง hidden ไม่ใช่แสดง "0" — UI state management boundary | 🟡 กลาง |
| 6 | **Cart count = 6 (max) → no more Add buttons** | ทุกปุ่มต้องเป็น "Remove" — ถ้า state sync ผิดอาจแสดง "Add to cart" ผิดพลาด | 🟡 กลาง |
| 7 | **Single character input (min boundary)** | first name/last name 1 ตัวอักษรอาจไม่ถูก handle โดย front-end validation | 🟡 กลาง |
| 8 | **Spaces only ใน required fields** | `"   "` (spaces only) — ถ้าไม่ trim อาจผ่าน required validation | 🔴 สูง |

---

## 5. BVA Test Case Summary

| หมวดหมู่ | จำนวน Boundary Tests | High Risk | Medium Risk | Low Risk |
|---|---|---|---|---|
| First Name Field | 7 | 4 | 1 | 2 |
| Last Name Field | 7 | 4 | 1 | 2 |
| Postal Code Field | 8 | 4 | 2 | 2 |
| Product Quantity | 3 | 0 | 1 | 2 |
| Cart Count | 6 | 1 | 3 | 2 |
| Price/Tax Calculation | 7 | 4 | 2 | 1 |
| **รวม** | **38** | **17** | **10** | **11** |

---

*เอกสารนี้สร้างโดย Kiro AI — Senior QA Engineer*
