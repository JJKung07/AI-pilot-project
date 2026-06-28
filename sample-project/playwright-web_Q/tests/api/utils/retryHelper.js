export async function retryRequest(requestFn, maxRetries = 3) {
  let lastError;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await requestFn();
      if (response.status() < 500) {
        return response;
      }
      lastError = new Error(`Server error: ${response.status()}`);
    } catch (error) {
      lastError = error;
    }
    const delay = Math.pow(2, attempt) * 1000;
    await new Promise((resolve) => setTimeout(resolve, delay));
  }
  throw lastError;
}
