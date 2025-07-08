import { prisma, Prisma } from '@db'
import bcrypt from 'bcryptjs'
import ADLER32 from 'adler-32'
import { ApiError } from '@shared/api'
import { config } from '@shared/config'
import { userResponseFilter } from '@db/filters/user.filter'

export class AuthService {
  static async getUser(email: string, filter?: Prisma.UserSelect) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      ...(filter && { select: filter }),
    })

    if (!user) {
      throw ApiError.BadRequest(`User with "${email}" not found`)
    }

    return user
  }

  static async createUser(createUserDto: { email: string; password: string }) {
    const { email, password } = createUserDto

    const salt = bcrypt.genSaltSync(config.saltRounds)
    const passwordHash = bcrypt.hashSync(password, salt)

    const username = `user${ADLER32.str(email).toString(16)}`

    //todo add user fingerprint
    return await prisma.user.create({
      data: {
        email,
        passwordHash,
        username,
      },
      select: userResponseFilter,
    })
  }
}

export default AuthService
