import type { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { login } from './controllers/login'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.post('/login', login)
}
