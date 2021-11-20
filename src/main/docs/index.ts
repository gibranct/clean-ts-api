import { forbidden } from './components/forbidden'
import { notFound } from './components/not-found'
import { unauthorized } from './components/unauthorized'
import { serverError } from './components/server-error'
import { badRequest } from './components/bad-request'
import { errorSchema } from '@/main/docs/schemas/error-schema'
import { accountSchema } from '@/main/docs/schemas/account-schema'
import { loginParamsSchema } from '@/main/docs/schemas/login-params-schema'
import { loginPath, signupPath } from './login-path'
import { signupParamsSchema } from '@/main/docs/schemas/signup-params-schema'
import { addSurveyParamsSchema } from '@/main/docs/schemas/add-survey-params-schema'
import { surveyPath } from '@/main/docs/survey-path'
import { loadSurveysParamsSchema } from '@/main/docs/schemas/load-surveys-params-schema'

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
    name: 'Login'
  },
  {
    name: 'Survey'
  }],
  paths: {
    '/login': loginPath,
    '/signup': signupPath,
    '/surveys': surveyPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema,
    signup: signupParamsSchema,
    addSignupParams: addSurveyParamsSchema,
    loadSurveys: loadSurveysParamsSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden,
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'x-access-token'
      }
    }
  }
}
