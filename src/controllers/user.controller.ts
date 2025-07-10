import type { Context } from 'koa'
import type { IValidateRefreshTokenContext } from '@shared/types'
import { UserService } from '@services'

export class UserController {
  static async me(ctx: Context & IValidateRefreshTokenContext) {
    const user = await UserService.getUserById(ctx.tokenPayload.userId)
    ctx.body = user
  }
}
