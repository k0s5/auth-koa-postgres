import Router from '@koa/router'
import AuthController from '@controllers'

const router = new Router()

router.post('/signup', AuthController.signup)

router.post('/signin', AuthController.signin)

router.get('/refresh', AuthController.refresh)

router.get('/signout', AuthController.signout)

export default router
