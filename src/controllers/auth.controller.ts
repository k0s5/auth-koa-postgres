import { Context } from 'koa'
import { SessionService, UserService } from '@services'
import {
  ISignInPayload,
  ISignUpPayload,
  ITokenPayload,
  IRefreshTokenVerificationContext,
} from '@shared/types'
import { ApiError } from '@/shared/api'
import bcrypt from 'bcryptjs'
import { userResponseFilter } from '@/db/filters/user.filter'
import { omit } from '@/shared/utils'

export class AuthController {
  static async signup(ctx: Context) {
    const { email, password, terms } = ctx.request.body as ISignUpPayload

    //todo add user fingerprint
    const newUser = await UserService.createUser({ email, password })

    const { accessToken, refreshToken } = await SessionService.create(ctx, {
      email,
      userId: newUser.id,
      username: newUser.username,
    })

    SessionService.setRefreshTokenCookie(ctx, refreshToken)

    ctx.body = {
      user: newUser,
      accessToken,
    }
  }

  static async signin(ctx: Context) {
    const { email, password } = ctx.request.body as ISignInPayload

    const user = await UserService.getUserByEmail(email)

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash)

    if (!isPasswordValid) {
      throw ApiError.BadRequest(`Incorrect password`)
    }

    const { accessToken, refreshToken } = await SessionService.create(ctx, {
      email,
      userId: user.id,
      username: user.username,
    })

    SessionService.setRefreshTokenCookie(ctx, refreshToken)

    ctx.body = {
      user: omit(user, ['passwordHash']),
      accessToken,
    }
  }

  static async refresh(ctx: Context & IRefreshTokenVerificationContext) {
    const user = await UserService.getUserByEmail(
      ctx.tokenPayload.email,
      userResponseFilter
    )

    const { accessToken, refreshToken: newRefreshToken } =
      SessionService.generateTokens(ctx.tokenPayload)

    await SessionService.update(ctx.refreshToken, {
      newAccessToken: accessToken,
      newRefreshToken,
    })

    SessionService.setRefreshTokenCookie(ctx, newRefreshToken)

    ctx.body = {
      user,
      accessToken,
    }
  }

  static async signout(ctx: Context & IRefreshTokenVerificationContext) {
    await SessionService.delete(ctx.refreshToken)

    SessionService.setRefreshTokenCookie(ctx, null, {
      expires: new Date(0),
    })

    ctx.body = 'User signout successfully'
  }
}

export default AuthController
