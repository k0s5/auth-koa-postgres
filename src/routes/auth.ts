import Router from '@koa/router'
import { AuthController } from '@controllers'
import { authSchema } from '@shared/validation'
import {
  validateRequestPayload,
  refreshTokenVerification,
} from '@shared/middlewares'

const router = new Router()

router.post(
  '/signup',
  validateRequestPayload(authSchema),
  AuthController.signup
)

router.post(
  '/signin',
  validateRequestPayload(authSchema),
  AuthController.signin
)

router.get('/refresh', refreshTokenVerification, AuthController.refresh)

router.get('/signout', refreshTokenVerification, AuthController.signout)

export default router
