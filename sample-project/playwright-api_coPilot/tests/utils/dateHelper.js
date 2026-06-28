function pad(value) {
  return String(value).padStart(2, '0');
}

function toUtcDate(daysOffset) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + daysOffset);
  return date;
}

function formatDate(date) {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

export function generateDateResponse(daysOffset = 0) {
  return formatDate(toUtcDate(daysOffset));
}

export function generateReceiveDate(daysOffset = 0) {
  return `${generateDateResponse(daysOffset)}T00:00:00.000Z`;
}

export function generateReceiveDateResponse(daysOffset = 0) {
  return `${generateDateResponse(daysOffset)}T17:00:00`;
}

export function generateHistoryTimeStampResponse(daysOffset = 0) {
  return generateDateResponse(daysOffset);
}

export function generateBookingDates(daysOffset = 1) {
  return {
    checkin: generateDateResponse(daysOffset),
    checkout: generateDateResponse(daysOffset + 1),
  };
}
