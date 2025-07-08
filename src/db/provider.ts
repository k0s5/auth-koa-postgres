import { PrismaClient } from './client'
import { config } from '@config'

export const prisma = new PrismaClient({
  datasources: {
    db: {
      url: config.postgres.uri,
    },
  },
})
export default prisma
