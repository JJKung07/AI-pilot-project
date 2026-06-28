function pad(value) {
  return String(value).padStart(2, '0');
}

function buildDate(daysOffset) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() + daysOffset);
  return date;
}

export function generateReceiveDate(daysOffset) {
  const date = buildDate(daysOffset);
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}T${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())}.000Z`;
}

export function generateReceiveDateResponse(daysOffset) {
  const date = buildDate(daysOffset);
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}T17:00:00`;
}

export function generateDateResponse(daysOffset) {
  const date = buildDate(daysOffset);
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

export function generateHistoryTimeStampResponse(daysOffset) {
  return generateDateResponse(daysOffset);
}
