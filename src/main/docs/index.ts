import { notFound } from './components/not-found'
import { unauthorized } from './components/unauthorized'
import { serverError } from './components/server-error'
import { badRequest } from './components/bad-request'
import { errorSchema } from '@/main/docs/schemas/error-schema'
import { accountSchema } from '@/main/docs/schemas/account-schema'
import { loginParamsSchema } from '@/main/docs/schemas/login-params-schema'
import { loginPath } from './login-path'

export const swaggerConfig = {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    version: '1.0.0',
    description: 'A clean node api'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login',
    description: 'API para autenticar o usuário'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound
  }
}
