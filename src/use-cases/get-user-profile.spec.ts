// in-memory-users-repository.spec.ts
import { describe, it, expect } from 'vitest'
import { InMemoryUsersRepository } from '../repositores/in-memory/in-memory-users-repository'

describe('InMemoryUsersRepository', () => {
  it('deve criar um usuário em memória', async () => {
    const repo = new InMemoryUsersRepository()

    const user = await repo.create({
      name: 'John Doe',
      email: 'john@example.com',
      password_hash: 'any_hash',
    })

    expect(user.id).toBe('1')
    expect(user.name).toBe('John Doe')
    expect(user.email).toBe('john@example.com')
    expect(user.password_hash).toBe('any_hash')
    expect(user.created_at).toBeInstanceOf(Date)

    expect(repo.items.length).toBe(1)
    expect(repo.items[0]).toEqual(user)
  })

  it('deve encontrar um usuário pelo ID', async () => {
    const repo = new InMemoryUsersRepository()

    const createdUser = await repo.create({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password_hash: 'another_hash',
    })

    const user = await repo.findById(createdUser.id!)
    expect(user).not.toBeNull()
    expect(user?.name).toBe('Jane Doe')
    expect(user?.email).toBe('jane@example.com')
  })

  it('deve retornar null se o usuário não existir', async () => {
    const repo = new InMemoryUsersRepository()

    const user = await repo.findById('algum-id-inexistente')
    expect(user).toBeNull()
  })

  it('deve encontrar um usuário pelo email', async () => {
    const repo = new InMemoryUsersRepository()

    const createdUser = await repo.create({
      name: 'Alice',
      email: 'alice@example.com',
      password_hash: 'alice_hash',
    })

    const user = await repo.findByEmail(createdUser.email!)
    expect(user).not.toBeNull()
    expect(user?.name).toBe('Alice')
    expect(user?.email).toBe('alice@example.com')
  })
})
