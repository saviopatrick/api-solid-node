import { hash } from 'bcryptjs'
import { UsersRepository } from '../repositores/users-repository'
import { Conflit } from '../errors/conflit'

interface RegisterUserParams {
  email: string
  password: string
  name: string
}

export class RegisterUseCase {
  constructor(private usersRepositorys: UsersRepository) {}

  async execute({ email, password, name }: RegisterUserParams) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepositorys.findByEmail(email)
    if (userWithSameEmail) {
      throw new Conflit('Email already in use')
    }

    await this.usersRepositorys.create({
      email,
      password_hash,
      name,
    })
  }
}
