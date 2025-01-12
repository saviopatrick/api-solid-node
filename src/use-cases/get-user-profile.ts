import { UsersRepository } from '../repositores/users-repository'
import { NotFound } from '../errors/not-found'
import { User } from '@prisma/client'

interface GetUseCaseProps {
  userId: string
}

interface GetUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepositorys: UsersRepository) {}
  async execute({ userId }: GetUseCaseProps): Promise<GetUseCaseResponse> {
    const account = await this.usersRepositorys.findById(userId)
    if (!account) {
      throw new NotFound('NotFound')
    }

    return {
      user: account,
    }
  }
}
