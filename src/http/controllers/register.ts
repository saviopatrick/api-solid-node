import { z } from 'zod'
import { FastifyReply, FastifyRequest } from 'fastify'
import { registerUseCase } from '../../use-cases/register'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodyShema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { name, email, password } = registerBodyShema.parse(request.body)

  try{
    await registerUseCase({
      name,
      password,
      email
    })
  }catch (error){
    return reply.status(409).send()
  }
  
  return reply.status(201).send()
}
