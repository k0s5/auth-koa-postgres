import type { Context } from 'koa'
import Router from '@koa/router'
import authRoutes from '@routes/auth'
import userRoutes from '@routes/user'

const router = new Router({ prefix: '/auth' })

router.get('/health', (ctx: Context) => {
  ctx.body = 'Service is online'
})

router.use(authRoutes.routes())
router.use(userRoutes.routes())

export default router
