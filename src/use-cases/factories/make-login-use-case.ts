import { PrismaUsersRepository } from '../../repositores/prisma/prisma-users-repository'
import { LoginUseCase } from '../login'

export function makeLoginUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const loginUseCase = new LoginUseCase(prismaUsersRepository)
  return loginUseCase
}
