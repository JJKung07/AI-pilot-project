export const errorResponseSchema = {
  type: "object",
  properties: {
    reason: { type: "string" },
  },
  required: ["reason"],
};

export const badCredentialsSchema = {
  type: "object",
  properties: {
    reason: { type: "string" },
  },
  required: ["reason"],
};
