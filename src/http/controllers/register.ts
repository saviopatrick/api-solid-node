import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { Conflit } from '../../errors/conflit'
import { makeRegisterUseCase } from '../../use-cases/factories/make-register-use-case'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodyShema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { name, email, password } = registerBodyShema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({
      name,
      password,
      email,
    })
  } catch (error) {
    if (error instanceof Conflit) {
      return reply.status(409).send({ message: error.message })
    }
    throw error
  }
}
