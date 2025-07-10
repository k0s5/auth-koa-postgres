import Router from '@koa/router'
import { UserController } from '@controllers'
import { accessTokenVerification } from '@shared/middlewares'

const router = new Router()

router.get('/me', accessTokenVerification, UserController.me)

export default router
