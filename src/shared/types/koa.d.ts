import { PrismaClient } from '@db/client'
import 'koa'

declare module 'koa' {
  interface DefaultContext {
    prisma: PrismaClient
    tokenPayload?: import('./session').ITokenPayload
    refreshToken?: string
  }
}
