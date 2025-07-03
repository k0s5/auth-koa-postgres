import type { Context } from 'koa'
import Router from '@koa/router'
import authRoutes from './auth'

const router = new Router({ prefix: '/auth' })

router.get('/health', (ctx: Context) => {
  ctx.body = 'Service is online'
})

router.use(router.routes())

export default router
