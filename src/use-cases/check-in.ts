import { CheckIn } from '@prisma/client'
import type { CheckInsRepository } from '../repositores/check-ins-repository'

interface CheckInCaseProps {
  userId: string
  gymId: string
}

interface CheckInCaseResponse {
  checkIn: CheckIn
}

export class CheckInrProfileUseCase {
  constructor(private checkInsRepositorys: CheckInsRepository) {}
  async execute({
    userId,
    gymId,
  }: CheckInCaseProps): Promise<CheckInCaseResponse> {
    const checkIn = await this.checkInsRepositorys.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
