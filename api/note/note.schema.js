const Joi = require('joi');
const joiObjectId = require('joi-objectid');

Joi.objectId = joiObjectId(Joi);

const ParamsSchema = Joi.object({
  id: Joi.objectId().required(),
});

/**
 * @openapi
 * components:
 *   schema:
 *     NoteResponse:
 *       type: object
 *       required:
 *        - content
 *       properties:
 *         content:
 *           type: string
 *           description: Content of note
 *           example: Data from swagger documentation
 *         important:
 *           type: string
 *           description: Is important?
 *           example: false
 *         userId:
 *          type: string
 *          description: Id of the user
 *          example: 61e1d9a45021fb0b79a56140
 *         createdAt:
 *          type: string
 *          format: date-time
 *          description: Date of creation
 *          example: 2022-01-27T15:36:04.089Z
 *         updatedAt:
 *          type: string
 *          format: date-time
 *          description: Date of creation
 *          example: 2022-01-27T15:36:04.089Z
 *         _id:
 *          type: string
 *          description: Id of the note
 *          example: 614a96635701df551c9d2623
 */
const ResponseSchema = Joi.object({
  _id: Joi.objectId().required(),
  content: Joi.string().required(),
  important: Joi.boolean().required(),
  userId: Joi.objectId().required(),
  createdAt: Joi.date().required(),
  updatedAt: Joi.date().required(),
});

/**
 * @openapi
 * components:
 *  schema:
 *    Note:
 *      type: object
 *      required:
 *      - content
 *      properties:
 *        content:
 *        type: string
 *        description: Content of note
 *        example: Data from swagger documentation
 *        important:
 *          type: string
 *          description: Is important?
 *          example: false
 */
const PayloadSchema = Joi.object().keys({
  content: Joi.string().min(3).max(250).required(),
  important: Joi.boolean(),
});

const NoteSchema = Joi.object().keys({
  body: PayloadSchema,
  params: ParamsSchema,
});

module.exports = { PayloadSchema, ParamsSchema, NoteSchema, ResponseSchema };
