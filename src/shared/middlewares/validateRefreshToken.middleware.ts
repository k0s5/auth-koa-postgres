import { Context, Next } from 'koa'
import { SessionService } from '@services'
import { TokenType } from '@shared/types'
import { ApiError } from '../api'

export async function validateRefreshToken(ctx: Context, next: Next) {
  const refreshToken = ctx.cookies.get('refreshToken')

  if (!refreshToken) {
    throw ApiError.Forbidden('Refresh token is required')
  }

  ctx.tokenPayload = SessionService.validateToken(
    refreshToken,
    TokenType.REFRESH
  )
  ctx.refreshToken = refreshToken

  await next()
}
