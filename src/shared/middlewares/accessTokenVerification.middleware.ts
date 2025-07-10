import { Context, Next } from 'koa'
import { SessionService } from '@/services'
import { TokenType } from '@shared/types'
import { ApiError } from '../api'

export async function accessTokenVerification(ctx: Context, next: Next) {
  const { authorization } = ctx.request.headers

  if (!authorization) {
    throw ApiError.Forbidden('Authorization token is not provided')
  }

  // Split token from Bearer prefix
  const accessToken = authorization.split(' ')[1]

  ctx.tokenPayload = await SessionService.validateToken({ accessToken })

  await next()
}
