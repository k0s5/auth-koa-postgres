import type { Context } from 'koa'
import Router from '@koa/router'

const router = new Router({ prefix: '/auth' })

router.get('/health', (ctx: Context) => {
  ctx.body = 'Service is online'
})

export default router
