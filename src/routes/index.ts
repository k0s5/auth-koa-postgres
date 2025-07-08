import type { Context } from 'koa'
import Router from '@koa/router'
import authRoutes from '@routes/auth'

const router = new Router({ prefix: '/auth' })

router.get('/health', (ctx: Context) => {
  ctx.body = 'Service is online'
})

router.use(authRoutes.routes())

export default router
