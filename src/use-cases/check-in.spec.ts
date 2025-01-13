import { describe, it, expect } from 'vitest'
import { InMemoryChekinRepository } from '../repositores/in-memory/in-memory-check-in-repository'
import { CheckInrProfileUseCase } from './check-in'

describe('CheckInrProfileUseCase', () => {
  it('deve criar um check-in para o usuário e academia corretos', async () => {
    const inMemoryCheckinRepository = new InMemoryChekinRepository()

    const sut = new CheckInrProfileUseCase(inMemoryCheckinRepository)
    const { checkIn } = await sut.execute({
      userId: 'user-id-01',
      gymId: 'gym-id-01',
    })

    expect(checkIn).toBeTruthy()
    expect(checkIn.id).toBeTypeOf('string')
    expect(checkIn.user_id).toEqual('user-id-01')
    expect(checkIn.gym_id).toEqual('gym-id-01')
    expect(checkIn.createdAt).toBeInstanceOf(Date)
    expect(checkIn.validated_at).toBeNull()

    expect(inMemoryCheckinRepository.items).toHaveLength(1)
    expect(inMemoryCheckinRepository.items[0]).toStrictEqual(checkIn)
  })
})
