export const bookingSchema = {
  type: 'object',
  properties: {
    bookingid: { type: 'integer' },
    booking: {
      type: 'object',
      properties: {
        firstname: { type: 'string' },
        lastname: { type: 'string' },
        totalprice: { type: 'number' },
        depositpaid: { type: 'boolean' },
        bookingdates: {
          type: 'object',
          properties: {
            checkin: { type: 'string' },
            checkout: { type: 'string' },
          },
          required: ['checkin', 'checkout'],
          additionalProperties: true,
        },
        additionalneeds: { type: 'string' },
      },
      required: ['firstname', 'lastname', 'totalprice', 'depositpaid', 'bookingdates', 'additionalneeds'],
      additionalProperties: true,
    },
  },
  required: ['bookingid', 'booking'],
  additionalProperties: true,
};
