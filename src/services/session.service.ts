import { Context } from 'koa'
import { ApiError } from '@shared/api'
import { prisma } from '@/db'
import { config } from '@/shared/config'
import jwt, { type Secret, type JwtPayload } from 'jsonwebtoken'
import { addTimeToDate } from '@shared/utils'
import {
  type ICreateSessionPayload,
  type ITokenPayload,
  TokenType,
} from '@/shared/types'

export class SessionService {
  static async create(ctx: Context, payload: ICreateSessionPayload) {
    const { accessToken, refreshToken } = SessionService.generateTokens(payload)

    const refreshTokenLifetimeMs = addTimeToDate(
      config.secrets.refreshTokenLifetime
    )

    await prisma.session.create({
      data: {
        userId: payload.userId,
        accessToken,
        refreshToken,
        fingerprint: crypto.randomUUID(),
        ua: ctx.request.headers['user-agent'] ?? 'unknown',
        ip: ctx.request.ip || ctx.get('x-forwarded-for') || '::1',
        expiresAt: refreshTokenLifetimeMs,
      },
    })

    return {
      accessToken,
      refreshToken,
    }
  }

  static async update(
    refreshToken: string,
    payload: {
      newAccessToken: string
      newRefreshToken: string
      fingerprint?: string
    }
  ) {
    const now = new Date()

    await prisma.session.update({
      data: {
        accessToken: payload.newAccessToken,
        refreshToken: payload.newRefreshToken,
        ...(payload?.fingerprint && { fingerprint: payload.fingerprint }),
        createdAt: now,
        expiresAt: addTimeToDate(config.secrets.refreshTokenLifetime, now),
      },
      where: {
        refreshToken,
      },
    })
  }

  static async delete(refreshToken: string) {
    await prisma.session.delete({
      where: { refreshToken },
    })
  }

  /*#region HELPERS*/
  static generateTokens(payload: ICreateSessionPayload) {
    const { email, userId, username } = payload

    const accessToken = jwt.sign(
      { email, userId, username },
      config.secrets.accessToken as Secret,
      {
        expiresIn: config.secrets.accessTokenLifetime as any,
      }
    )
    const refreshToken = jwt.sign(
      { email, userId, username },
      config.secrets.refreshToken as Secret,
      {
        expiresIn: config.secrets.refreshTokenLifetime as any,
      }
    )

    return {
      accessToken,
      refreshToken,
    }
  }

  static async findSessionByToken(tokenDto: TokenType, excludeRevoked = false) {
    if (excludeRevoked) {
      Object.assign(tokenDto, {
        revokedAt: null,
      })
    }

    return await prisma.session.findFirst({
      where: tokenDto,
    })
  }

  static async validateToken(tokenDto: TokenType) {
    try {
      const { accessToken, refreshToken } = tokenDto

      const decodedToken = jwt.verify(
        accessToken ?? refreshToken,
        accessToken ? config.secrets.accessToken : config.secrets.refreshToken
      )

      const session = await SessionService.findSessionByToken(tokenDto)

      if (!session) {
        throw ApiError.Forbidden(`Session not found`)
      }

      if (session && session.revokedAt) {
        throw ApiError.Forbidden(`Session revoked`)
      }

      return decodedToken as ITokenPayload
    } catch (err: any) {
      throw ApiError.Forbidden(err.message)
    }
  }

  static getTokenPayload(token: string) {
    const payload = jwt.decode(token)

    if (typeof payload === 'string' || payload === null) {
      throw ApiError.Forbidden('Token type is invalid')
    }

    if (
      !('email' in payload) ||
      !('userId' in payload) ||
      !('username' in payload)
    ) {
      throw ApiError.Forbidden('Token structure is invalid')
    }

    return payload as {
      email: string
      userId: string
      username: string
    } & JwtPayload
  }

  static setRefreshTokenCookie(
    ctx: Context,
    refreshToken: string | null,
    options?: Record<string, any>
  ) {
    const defaultOptions = {
      path: '/',
      domain: config.isDev ? 'localhost' : '.metasong.cc',
      expires: addTimeToDate(config.secrets.refreshTokenLifetime),
      httpOnly: !config.isDev,
      secure: !config.isDev,
      sameSite: 'strict',
      signed: true,
    }

    options = Object.assign(defaultOptions, options ?? {})

    ctx.cookies.set('refreshToken', refreshToken, options)

    ctx.set('Access-Control-Allow-Credentials', 'true')
  }
  /*#endregion HELPERS*/
}

export default SessionService
