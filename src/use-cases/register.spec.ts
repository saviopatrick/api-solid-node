import { describe, it, expect } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '../repositores/in-memory/in-memory-users-repository'
import { Conflit } from '../errors/conflit'

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const usersRepositorys = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepositorys)
    const { user } = await registerUseCase.execute({
      email: 'jhondoe@example.com',
      name: 'John Doe',
      password: '123456',
    })
    expect(user.id).toEqual(expect.any(String))
  })
  it('should hash user password upon registration', async () => {
    const usersRepositorys = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepositorys)
    const { user } = await registerUseCase.execute({
      email: 'jhondoe@example.com',
      name: 'John Doe',
      password: '123456',
    })
    const isPasswordHashed = await compare('123456', user.password_hash)
    expect(isPasswordHashed).toBe(true)
  })
  it('should not allow two users to register with the same email', async () => {
    const usersRepositorys = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepositorys)
    const email = 'johndoe@example.com'

    await registerUseCase.execute({
      email,
      name: 'John Doe',
      password: '123456',
    })
    expect(async () => {
      await registerUseCase.execute({
        email,
        name: 'John Doe',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(Conflit)
  })
})
