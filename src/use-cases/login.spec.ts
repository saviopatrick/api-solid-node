import { describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from '../repositores/in-memory/in-memory-users-repository'
import { LoginUseCase } from './login'
import { hash } from 'bcryptjs'
import { NotFound } from '../errors/not-found'
import { Unauthorized } from '../errors/unauthorized'

describe('LoginUseCase com InMemoryUsersRepository', () => {
  it('deve retornar um token se o usuário existe e a senha estiver correta', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const loginUseCase = new LoginUseCase(inMemoryUsersRepository)

    const passwordHash = await hash('senha_correta', 6)
    await inMemoryUsersRepository.create({
      name: 'John Doe',
      email: 'john@example.com',
      password_hash: passwordHash,
    })

    const token = await loginUseCase.execute({
      email: 'john@example.com',
      password: 'senha_correta',
    })

    expect(token.token).toBeTypeOf('string')
    expect(token.token.length).toBeGreaterThan(0)
  })

  it('deve lançar NotFound se o usuário não for encontrado', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const loginUseCase = new LoginUseCase(inMemoryUsersRepository)

    await expect(
      loginUseCase.execute({
        email: 'usuarioInexistente@example.com',
        password: 'qualquer_coisa',
      }),
    ).rejects.toThrowError(NotFound)
  })

  it('deve lançar Unauthorized se a senha estiver incorreta', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const loginUseCase = new LoginUseCase(inMemoryUsersRepository)

    const passwordHash = await hash('senha_correta', 6)
    await inMemoryUsersRepository.create({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password_hash: passwordHash,
    })

    await expect(
      loginUseCase.execute({
        email: 'jane@example.com',
        password: 'senha_errada',
      }),
    ).rejects.toThrowError(Unauthorized)
  })
})
