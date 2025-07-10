import { prisma } from '@/db'
import { omit } from '@/shared/utils'
import { userResponseFilter } from '@db/filters/user.filter'

export class UserService {
  static async getUserById(userId: string) {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: omit(userResponseFilter, ['isActive']),
    })
  }
}
