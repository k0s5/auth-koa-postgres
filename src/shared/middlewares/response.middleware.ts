import { Context, Next } from 'koa'

export async function responseHandlerMiddleware(ctx: Context, next: Next) {
  await next()

  if (ctx.status < 200 || ctx.status > 299) {
    return
  }

  ctx.body = {
    success: true,
    data: ctx.body,
    timestamp: new Date(),
  }
}
