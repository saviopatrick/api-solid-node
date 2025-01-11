import { hash } from 'bcryptjs'
import { prisma } from '../lib/prisma'
import { PrismaUsersRepository } from '../repositores/prisma-users-repository'

interface RegisterUserParams {
  email: string
  password: string
  name: string
}

export class RegisterUseCase {
  constructor(private usersRepositorys: any) {}

  async execute({ email, password, name }: RegisterUserParams) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (userWithSameEmail) {
      throw new Error('Email already exists.')
    }


    await this.usersRepositorys.create({
      email,
      password_hash,
      name,
    })
  }
}
