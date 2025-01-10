import { compare } from 'bcryptjs'
import { prisma } from '../lib/prisma'
import { NotFound } from '../errors/not-found'
import { Unauthorized } from '../errors/unauthorized'

interface LoginUseCaseProps {
  email: string
  password: string
}

export async function loginUseCase({ email, password }: LoginUseCaseProps) {
  const account = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  if (!account) {
    throw new NotFound('NotFound')
  }
  const isValid = await compare(password, account.password_hash)
  if (!isValid) {
    throw new Unauthorized('Unauthorized')
  }
}
