export const bookingListItemSchema = {
  type: 'object',
  properties: {
    bookingid: { type: 'integer' },
  },
  required: ['bookingid'],
  additionalProperties: true,
};

export const bookingListSchema = {
  type: 'array',
  items: bookingListItemSchema,
};
