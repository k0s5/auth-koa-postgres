import { Context, Next } from 'koa'
import Joi from 'joi'

export function validateRequestPayload(schema: Joi.ObjectSchema) {
  return async (ctx: Context, next: Next) => {
    try {
      // Validate the request body, parameters and query parameters
      const values = {
        body: ctx.request.body,
        params: ctx.params,
        query: ctx.query,
      }

      // Data validation
      const validated = await schema.validateAsync(values, {
        abortEarly: false,
        allowUnknown: false,
      })

      // Replace the original data with validated ones
      ctx.request.body = validated.body
      ctx.params = validated.params || {}
      ctx.query = validated.query || {}

      await next()
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        // Handling validation errors
        ctx.status = 400
        ctx.body = {
          message: 'Validation error',
          details: error.details.map((detail) => ({
            message: detail.message,
            path: detail.path,
          })),
        }
      } else {
        throw error
      }
    }
  }
}
