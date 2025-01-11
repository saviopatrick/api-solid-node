import { hash } from 'bcryptjs'
import { UsersRepository } from '../repositores/users-repository'
import { Conflit } from '../errors/conflit'
import type { User } from '@prisma/client'

interface RegisterUserParams {
  email: string
  password: string
  name: string
}
interface RegisterUseCaseProps {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepositorys: UsersRepository) {}

  async execute({
    email,
    password,
    name,
  }: RegisterUserParams): Promise<RegisterUseCaseProps> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepositorys.findByEmail(email)
    if (userWithSameEmail) {
      throw new Conflit('Email already in use')
    }

    const user = await this.usersRepositorys.create({
      email,
      password_hash,
      name,
    })
    return {
      user,
    }
  }
}
