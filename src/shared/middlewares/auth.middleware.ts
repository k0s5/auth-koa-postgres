import { Context, Next } from 'koa'
import { SessionService } from '@/services'
import { TokenType } from '@shared/types'
import { ApiError } from '../api'

export async function authMiddleware(ctx: Context, next: Next) {
  const { authorization } = ctx.request.headers

  if (!authorization) {
    throw ApiError.Forbidden('Authorization token is not provided')
  }

  SessionService.validateToken(authorization, TokenType.ACCESS)

  await next()
}
