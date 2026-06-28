export const errorResponseSchema = {
  type: 'object',
  properties: {
    reason: { type: 'string' },
  },
  required: ['reason'],
  additionalProperties: true,
};
