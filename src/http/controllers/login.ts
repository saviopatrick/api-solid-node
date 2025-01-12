import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { NotFound } from '../../errors/not-found'
import { Unauthorized } from '../../errors/unauthorized'
import { makeLoginUseCase } from '../../use-cases/factories/make-login-use-case'

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const registerBodyShema = z.object({
    email: z.string(),
    password: z.string(),
  })
  const { email, password } = registerBodyShema.parse(request.body)
  try {
    const loginUseCase = makeLoginUseCase()
    const token = await loginUseCase.execute({
      email,
      password,
    })

    return reply.status(200).send(token)
  } catch (error) {
    if (error instanceof NotFound) {
      return reply.status(404).send({ message: error.message })
    }
    if (error instanceof Unauthorized) {
      return reply.status(401).send({ message: error.message })
    }
    return reply.status(500).send()
  }
}
