import Joi from 'joi'
import { PASSWORD_MIN_LENGTH } from '@/shared/constants'

export const emailSchema = Joi.string()
  .email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net', 'org', 'ru', 'ua', 'kz', 'by'] },
  })
  .required()
  .messages({
    'string.base': '{#label} must be a string',
    'string.email': '{#label} is not valid',
    'any.required': '{#label} is required',
  })

export const passwordSchema = Joi.string()
  .min(PASSWORD_MIN_LENGTH)
  .required()
  .messages({
    'string.base': '{#label} must be a string',
    'string.min': `{#label} must be at least ${PASSWORD_MIN_LENGTH} characters long`,
    'any.required': '{#label} is required',
  })

export const authBody = {
  email: emailSchema,
  password: passwordSchema,
}
