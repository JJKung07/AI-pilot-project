/**
 * สร้างวันที่ format YYYY-MM-DD พร้อม offset
 * @param {number} daysOffset - จำนวนวันที่ต้องการ offset จากวันปัจจุบัน
 * @returns {string} วันที่ในรูปแบบ YYYY-MM-DD
 */
export function generateDate(daysOffset = 0) {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split("T")[0];
}

/**
 * สร้างวันที่ format YYYY-MM-DDTHH:mm:ss.SSSZ
 * @param {number} daysOffset
 * @returns {string}
 */
export function generateDateISO(daysOffset = 0) {
  const date = new Date();
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString();
}

/**
 * สร้าง checkin/checkout dates สำหรับ booking
 * @param {number} checkinOffset - วันเริ่มต้น offset
 * @param {number} checkoutOffset - วันสิ้นสุด offset
 * @returns {{ checkin: string, checkout: string }}
 */
export function generateBookingDates(checkinOffset = 1, checkoutOffset = 5) {
  return {
    checkin: generateDate(checkinOffset),
    checkout: generateDate(checkoutOffset),
  };
}
