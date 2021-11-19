import { accountSchema } from '@/main/docs/schemas/account-schema'
import { loginParamsSchema } from '@/main/docs/schemas/login-params-schema'
import { loginPath } from './login-path'

export default {
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
    name: 'Login'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema
  }
}
