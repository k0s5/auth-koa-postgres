import Joi from 'joi'
import { authBody } from './common'

export const authSchema = Joi.object({
  body: Joi.object(authBody),
  params: Joi.object({}),
  query: Joi.object({}),
})

export const signUpSchema = Joi.object({
  body: Joi.object(
    Object.assign(authBody, {
      terms: Joi.boolean(),
    })
  ),
  params: Joi.object({}),
  query: Joi.object({}),
})

export const signInSchema = Joi.object({
  body: Joi.object(authBody),
  params: Joi.object({}),
  query: Joi.object({}),
})
