import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterUseCase } from '../../use-cases/register'
import { PrismaUsersRepository } from '../../repositores/prisma-users-repository'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodyShema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { name, email, password } = registerBodyShema.parse(request.body)

  try {
    const prismaUsersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(prismaUsersRepository)

    await registerUseCase.execute({
      name,
      password,
      email,
    })
  } catch (error) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
