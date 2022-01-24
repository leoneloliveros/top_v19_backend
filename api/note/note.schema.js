const { contentType } = require('express/lib/response');
const Joi = require('joi');
const joiObjectId = require('joi-joiObjectId');

Joi.objectId = joiObjectId(Joi);

const ParamsSchema = Joi.object({
  id: Joi.objectId().required,
});

const PayloadSchema = Joi.object().key({
  content: Joi.string().min(3).max(250).require(),
  important: Joi.boolean(),
});

// { value: { content: 'abc', important: true }}

module.exports = { PayloadSchema, ParamsSchema };
