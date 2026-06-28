export const bookingSchema = {
  type: "object",
  properties: {
    firstname: { type: "string" },
    lastname: { type: "string" },
    totalprice: { type: "integer" },
    depositpaid: { type: "boolean" },
    bookingdates: {
      type: "object",
      properties: {
        checkin: { type: "string" },
        checkout: { type: "string" },
      },
      required: ["checkin", "checkout"],
    },
    additionalneeds: { type: "string" },
  },
  required: ["firstname", "lastname", "totalprice", "depositpaid", "bookingdates"],
};

export const bookingResponseSchema = {
  type: "object",
  properties: {
    bookingid: { type: "integer" },
    booking: bookingSchema,
  },
  required: ["bookingid", "booking"],
};

export const bookingIdsSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      bookingid: { type: "integer" },
    },
    required: ["bookingid"],
  },
};

export const authTokenSchema = {
  type: "object",
  properties: {
    token: { type: "string" },
  },
  required: ["token"],
};
