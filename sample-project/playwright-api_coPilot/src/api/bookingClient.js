const jsonHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

function buildHeaders(token) {
  return token ? { ...jsonHeaders, Cookie: `token=${token}` } : jsonHeaders;
}

export async function authenticate(request, username, password) {
  return request.post('/auth', {
    headers: jsonHeaders,
    data: {
      username,
      password,
    },
  });
}

export async function createBooking(request, booking) {
  return request.post('/booking', {
    headers: jsonHeaders,
    data: booking,
  });
}

export async function listBookings(request, query = {}) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(query)) {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, String(value));
    }
  }

  const queryString = searchParams.toString();
  const url = queryString ? `/booking?${queryString}` : '/booking';

  return request.get(url, {
    headers: jsonHeaders,
  });
}

export async function getBooking(request, bookingId) {
  return request.get(`/booking/${bookingId}`, {
    headers: jsonHeaders,
  });
}

export async function updateBooking(request, bookingId, booking, token) {
  return request.put(`/booking/${bookingId}`, {
    headers: buildHeaders(token),
    data: booking,
  });
}

export async function patchBooking(request, bookingId, bookingPatch, token) {
  return request.patch(`/booking/${bookingId}`, {
    headers: buildHeaders(token),
    data: bookingPatch,
  });
}

export async function deleteBooking(request, bookingId, token) {
  return request.delete(`/booking/${bookingId}`, {
    headers: buildHeaders(token),
  });
}
