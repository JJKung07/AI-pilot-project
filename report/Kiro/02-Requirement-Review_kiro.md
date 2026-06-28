# Phase 02 — Requirement Review Report

**โปรเจกต์**: SwagLabs Commerce Platform  
**บทบาท**: QA Lead  
**วันที่**: 2026-06-28  
**ประเภทเอกสาร**: Formal Requirements Review & Sign-off  
**เอกสารอ้างอิง**: Phase 01 RTM, `requirements/BRD.md`, `requirements/Acceptance-Criteria.md`, `requirements/Business-Rules.md`

---

## 1. Executive Summary

เอกสารนี้เป็นผลการ review อย่างเป็นทางการของ Requirements Traceability Matrix (RTM) ที่สร้างใน Phase 01 โดย cross-reference กับ Acceptance Criteria และ Business Rules เพื่อหา gaps, missing criteria, และ edge cases ก่อน sign-off เพื่อเข้าสู่ขั้นตอน Test Design

**ผลสรุป**: Requirements ได้รับการ **อนุมัติแบบมีเงื่อนไข (Conditionally Approved)** — ต้องแก้ไข findings 3 รายการก่อนเริ่ม test execution

---

## 2. RTM Completeness Review

### 2.1 ผลการตรวจสอบ RTM เทียบกับ BRD

| สถานะ | จำนวน | รายละเอียด |
|---|---|---|
| ✅ Fully Covered | 9/11 | REQ-01 ถึง REQ-05, REQ-07 ถึง REQ-10 มี User Stories ครบ |
| ⚠️ Partially Covered | 1/11 | REQ-06 (Remove from cart) — ไม่มี US สำหรับ "remove from detail page" |
| ⚠️ Partially Covered | 1/11 | REQ-11 (Session Management) — มี US-018 สำหรับ logout แต่ไม่มี US สำหรับ unauthenticated redirect |

### 2.2 User Stories ที่ไม่มี Requirement ใน BRD

| User Story | รายละเอียด | ข้อเสนอ |
|---|---|---|
| US-013 | View shopping cart | ควรเพิ่ม requirement ใน BRD สำหรับ Cart Viewing |
| US-019 | Navigate back from cart | ควรเพิ่ม requirement สำหรับ Navigation flows |

---

## 3. Acceptance Criteria Cross-Reference

### 3.1 Acceptance Criteria ที่ขาดหายหรือไม่สมบูรณ์

| User Story | สิ่งที่ขาด | ความรุนแรง |
|---|---|---|
| US-003 | ไม่มี AC สำหรับกรณี username ว่างแต่ password มีค่า (มีแค่ empty ทั้งคู่ และ invalid password) | กลาง |
| US-005/US-006 | AC ไม่ได้ระบุ specific product order ทั้งหมด ระบุแค่ "alphabetical" — ควรมี full expected list | ต่ำ |
| US-009 | AC ไม่ได้ระบุ behavior ของปุ่ม "Back to products" บนหน้า detail | ต่ำ |
| US-010/US-011 | ไม่มี AC สำหรับกรณีเพิ่มสินค้าเดียวกันซ้ำ (double click) | กลาง |
| US-014 | ไม่มี AC สำหรับ cart badge update หลังจากลบสินค้าจาก cart page | กลาง |
| US-016 | ไม่มี AC สำหรับ multiple items — มีแค่ตัวอย่าง single item ($29.99 → tax $2.40) | สูง |
| US-017 | ไม่มี AC ที่ verify ว่า cart ถูก clear หลัง checkout (มีใน Business Rule CART-04 แต่ไม่อยู่ใน AC) | สูง |
| US-018 | ไม่มี AC สำหรับ session invalidation — ไม่ได้ระบุว่า browser back button หลัง logout ต้อง redirect | กลาง |

### 3.2 Acceptance Criteria ที่ครอบคลุมดี

- US-001, US-002: ชัดเจน มี expected messages ครบ
- US-015: ครอบคลุม valid case และ missing field case
- US-016: มี exact calculation example (แม้ว่าจะมีแค่ single item)

---

## 4. Business Rules Cross-Reference

### 4.1 Business Rules ที่ไม่มี Test Condition ใน RTM

| Rule ID | รายละเอียด | ช่องว่าง |
|---|---|---|
| PROD-03 | ราคาต้อง format เป็น USD ($x.xx) | RTM ไม่มี test condition สำหรับ price format verification |
| PROD-04 | Default sort order คือ Name (A-Z) | RTM ไม่ได้ระบุ test condition สำหรับ default state หลัง login |
| CART-03 | Cart state persist ข้าม page navigation | RTM ไม่มี test condition สำหรับ state persistence |
| CHK-04 | Tax คำนวณ 8% rounded to 2 decimal places | RTM มี test condition แต่ไม่ได้ระบุ rounding rule ที่ชัดเจน — **เป็น edge case ที่สำคัญ** |
| SESS-02 | Direct URL access โดยไม่มี session → redirect | RTM มีแต่ไม่ได้ระบุ URL paths ทั้งหมดที่ต้อง protect |

### 4.2 ข้อสังเกตเกี่ยวกับ CHK-04 (Tax Calculation)

> ⚠️ **Critical Edge Case**: Business Rule CHK-04 ระบุว่า tax คือ "8% of item subtotal, rounded to two decimal places" แต่ไม่ได้ระบุ rounding method

**ตัวอย่างปัญหา:**
- สินค้า 2 ชิ้น: $15.99 + $15.99 = $31.98
- Tax 8%: $31.98 × 0.08 = $2.5584
- Round half-up: $2.56
- Round down (truncate): $2.55

ต้องยืนยัน rounding rule กับ Finance Department ก่อน test execution

---

## 5. Edge Cases ที่ควรเพิ่มใน Acceptance Criteria

| # | Feature | Edge Case | เหตุผล |
|---|---|---|---|
| 1 | Checkout (CHK-04) | Tax calculation กับ multiple items ที่ราคาเท่ากัน ($15.99 × 2) | ทดสอบ rounding accuracy |
| 2 | Checkout (CHK-04) | Tax calculation กับ item ราคาต่ำสุด ($7.99) — tax = $0.6392 → $0.64? | ทดสอบ rounding กับจำนวนน้อย |
| 3 | Checkout (CHK-04) | Tax calculation กับ all 6 items in cart — total = $129.94, tax = $10.3952 | ทดสอบ maximum cart scenario |
| 4 | Authentication | Login ด้วย `locked_out_user` แล้วกด browser back → ไม่ควรเข้าถึง system ได้ | Security boundary |
| 5 | Cart | เพิ่มสินค้าทั้ง 6 รายการ แล้วลบทั้งหมดทีละชิ้น — badge ต้อง update ถูกต้อง | State management |
| 6 | Session | Logout แล้วกด browser back button → ต้อง redirect ไป login | Session invalidation |
| 7 | Cart | Navigate ไปหลายหน้า (catalog → detail → cart → catalog) แล้ว verify cart state คงอยู่ | State persistence (CART-03) |
| 8 | Checkout | กรอก checkout info แล้วกด browser back → ข้อมูลควร behave อย่างไร? | User flow integrity |

---

## 6. Findings Summary

| Finding ID | ประเภท | ความรุนแรง | รายละเอียด | สถานะ |
|---|---|---|---|---|
| FND-01 | Missing AC | สูง | US-016 ไม่มี AC สำหรับ multiple items tax calculation | Open |
| FND-02 | Missing AC | สูง | US-017 ไม่มี AC สำหรับ cart clearing post-checkout | Open |
| FND-03 | Ambiguity | สูง | CHK-04 rounding rule ไม่ชัดเจน — ต้อง clarify กับ Finance | Open |
| FND-04 | Missing Coverage | กลาง | REQ-06 ไม่มี US สำหรับ remove from detail page | Open |
| FND-05 | Missing Coverage | กลาง | SESS-02 ไม่ระบุ full list ของ protected URLs | Open |
| FND-06 | Gap | กลาง | US-013/US-019 ไม่มี requirement ใน BRD | Open |
| FND-07 | Missing AC | ต่ำ | Default sort order (PROD-04) ไม่มี AC | Open |

---

## 7. Formal Sign-Off

| รายการ | สถานะ | ผู้รับผิดชอบ | หมายเหตุ |
|---|---|---|---|
| RTM Completeness | ⚠️ Conditionally Approved | QA Lead | ต้องเพิ่ม coverage สำหรับ FND-04, FND-06 |
| Acceptance Criteria Coverage | ⚠️ Conditionally Approved | Business Analyst | ต้องเพิ่ม AC ตาม FND-01, FND-02 |
| Business Rules Alignment | ⚠️ Conditionally Approved | Finance / BA | ต้อง clarify CHK-04 rounding rule (FND-03) |
| Risk Assessment | ✅ Approved | QA Lead | ครบถ้วน |
| Test Design Readiness | ⚠️ Conditionally Approved | QA Lead | สามารถเริ่ม test design ได้ แต่ต้อง update เมื่อ findings ถูก resolve |

### Sign-Off Decision

| ผลการ Review | สถานะ |
|---|---|
| **Requirements Sign-Off** | ⚠️ **Conditionally Approved** |

**เงื่อนไข:**
1. BA ต้อง clarify rounding rule สำหรับ CHK-04 ภายใน Sprint นี้
2. เพิ่ม Acceptance Criteria สำหรับ multi-item tax calculation (FND-01)
3. เพิ่ม Acceptance Criteria สำหรับ cart clearing post-checkout (FND-02)

**หมายเหตุ**: Test Design สามารถเริ่มได้ parallel กับการ resolve findings โดยใช้ assumption ว่า rounding เป็น standard "round half-up" จนกว่าจะได้รับ clarification

---

| ผู้ลงนาม | บทบาท | วันที่ |
|---|---|---|
| Kiro AI | QA Lead | 2026-06-28 |

---

*เอกสารนี้สร้างโดย Kiro AI — QA Lead Review*
