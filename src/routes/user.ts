import Router from '@koa/router'
import { UserController } from '@controllers'
import { validateRefreshToken } from '@shared/middlewares'

const router = new Router()

router.get('/me', validateRefreshToken, UserController.me)

export default router
