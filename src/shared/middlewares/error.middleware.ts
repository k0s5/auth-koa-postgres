import { Context, Next } from 'koa'
import { ApiError } from '@shared/api/error'
import { error } from 'node:console'
import { PrismaClientKnownRequestError } from '@/db/client/runtime/library'

export async function errorHandlerMiddleware(ctx: Context, next: Next) {
  try {
    await next()

    // If the response is empty and the status is 404 - the route was not found
    if (ctx.status === 404 && !ctx.body) {
      throw ApiError.NotFound('Route not found')
    }
  } catch (err: any) {
    // Forming the body of the response
    if (err.code == 11000) {
      ctx.status = 400
      ctx.body = ApiError.BadRequest(err.message)
    } else if (err instanceof ApiError) {
      ctx.status = err.statusCode
      ctx.body = err
    } else if (err instanceof PrismaClientKnownRequestError) {
      if (err.code === 'P2002') {
        ctx.status = 400
        ctx.body = ApiError.BadRequest(`${err.meta?.target} is already exists`)
      } else {
        ctx.status = 500
        ctx.body = ApiError.CustomError(err.message)
      }
    } else {
      error(err)
      ctx.status = 500
      ctx.body = 'Unknown api error'
    }
  }
}
