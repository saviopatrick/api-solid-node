import { compare } from 'bcryptjs'
import { UsersRepository } from '../repositores/users-repository'
import { NotFound } from '../errors/not-found'
import { Unauthorized } from '../errors/unauthorized'
import jwt from 'jsonwebtoken'
import { env } from '../env'

interface LoginUseCaseProps {
  email: string
  password: string
}

interface SafeUser {
  id: string
  name: string
  email: string
}

interface LoginUseCaseResponse {
  user: SafeUser
  token: string
}

export class LoginUseCase {
  constructor(private usersRepositorys: UsersRepository) {}
  async execute({
    email,
    password,
  }: LoginUseCaseProps): Promise<LoginUseCaseResponse> {
    const account = await this.usersRepositorys.findByEmail(email)
    if (!account) {
      throw new NotFound('NotFound')
    }
    const isValid = await compare(password, account.password_hash)

    if (!isValid) {
      throw new Unauthorized('Unauthorized')
    }

    const token = jwt.sign({ id: account.id }, env.SECRET_KEY)
    const { id, name, email: userEmail } = account
    return {
      user: { id, name, email: userEmail },
      token,
    }
  }
}
