import { Context, Next } from 'koa'
import logger from '../logger'

export async function koaLogger(ctx: Context, next: Next) {
  const start = Date.now()

  await next()

  const ms = Date.now() - start
  const logMessage = `${ctx.method} ${ctx.url} - ${ms}ms - status: ${ctx.status}`

  if (ctx.status >= 500) {
    logger.error(logMessage)
  } else if (ctx.status >= 400) {
    logger.warn(logMessage)
  } else {
    logger.info(logMessage)
  }
}

export default koaLogger
