import 'dotenv/config'
import Koa from 'koa'
import cors from '@koa/cors'
import { bodyParser } from '@koa/bodyparser'
import router from '@routes'
import { config } from '@config'
import { prisma } from '@db'
import {
  errorHandlerMiddleware,
  responseHandlerMiddleware,
  koaLogger,
} from '@shared/middlewares'

const app = new Koa()

app.keys = [config.secrets.cookie]

app.use(
  cors({
    origin: config.cors?.origin,
    credentials: true,
  })
)

app.use(bodyParser())

// Connecting the middleware logger
app.use(koaLogger)

app.use(responseHandlerMiddleware)
app.use(errorHandlerMiddleware)

// Middleware for adding Prisma to context
// app.context.prisma = prisma
app.use(async (ctx, next) => {
  ctx.prisma = prisma
  await next()
})

app.use(router.routes())
app.use(router.allowedMethods())

const PORT = config.ports.service

let isGracefulShutdownStarted = false

async function gracefulShutdown(signal: string) {
  if (isGracefulShutdownStarted) {
    return
  }
  console.log(`Received ${signal}, shutting down gracefully...`)
  isGracefulShutdownStarted = true

  if (prisma) {
    await prisma.$disconnect()
  }

  process.exit(1)

  // setTimeout(() => {
  //   console.error('Forced shutdown due to timeout')
  //   process.exit(1)
  // }, 5000) // 5 seconds
}

// Signal handlers
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'))
process.on('SIGINT', () => gracefulShutdown('SIGINT'))

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error)
  gracefulShutdown('uncaughtException')
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  gracefulShutdown('unhandledRejection')
})

app.listen(config.ports.service)
console.log(`Auth service started on port ${config.ports.service}`)
