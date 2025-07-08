import Joi from 'joi'

export const authSchema = Joi.object({
  body: Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru'] } })
      .required()
      .messages({
        'string.base': '{#label} must be a string',
        'string.email': '{#label} is not valid',
        'any.required': '{#label} is required',
      }),
    password: Joi.string().min(8).required().messages({
      'string.base': '{#label} must be a string',
      'string.min': '{#label} is too short',
      'any.required': '{#label} is required',
    }),
  }),
  params: Joi.object({}),
  query: Joi.object({}),
})
