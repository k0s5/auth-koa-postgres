import type { Context } from 'koa'
import type { IAccessTokenVerificationContext } from '@shared/types'
import { UserService } from '@services'

export class UserController {
  static async me(ctx: Context & IAccessTokenVerificationContext) {
    const user = await UserService.getUserById(ctx.tokenPayload.userId)
    ctx.body = user
  }
}
