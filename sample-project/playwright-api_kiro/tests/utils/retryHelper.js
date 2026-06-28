/**
 * Retry logic สำหรับ API calls ที่อาจ flaky
 * ใช้ exponential backoff — max 3 retries
 *
 * @param {() => Promise<import('@playwright/test').APIResponse>} fn - async function ที่ต้องการ retry
 * @param {object} options
 * @param {number} options.maxRetries - จำนวน retry สูงสุด (default: 3)
 * @param {number} options.baseDelay - delay เริ่มต้น ms (default: 1000)
 * @param {number[]} options.retryOnStatus - status codes ที่ต้อง retry (default: [500, 502, 503, 504])
 * @returns {Promise<import('@playwright/test').APIResponse>}
 */
export async function retryRequest(fn, options = {}) {
  const {
    maxRetries = 3,
    baseDelay = 1000,
    retryOnStatus = [500, 502, 503, 504],
  } = options;

  let lastError;
  let lastResponse;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fn();
      lastResponse = response;

      if (!retryOnStatus.includes(response.status())) {
        return response;
      }

      console.warn(
        `Attempt ${attempt + 1}/${maxRetries + 1} got status ${response.status()}, retrying...`
      );
    } catch (error) {
      lastError = error;
      console.warn(
        `Attempt ${attempt + 1}/${maxRetries + 1} failed with error: ${error.message}`
      );
    }

    if (attempt < maxRetries) {
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  if (lastResponse) {
    return lastResponse;
  }

  throw lastError || new Error("All retry attempts exhausted");
}
