import { makeDbAuthentication } from '@/main/factories/usecases/authentication/db-authentication-factory'
import { Controller } from '@/presentation/protocols'
import { LoginController } from '@/presentation/controllers/login/login-controller'
import { makeLoginValidation } from './login-validation-factory'
import { LogMongoRepository } from '@/infra/db/mongodb/log/log-repository'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'

export const makeLoginController = (): Controller => {
  const loginController = new LoginController(makeDbAuthentication(), makeLoginValidation())
  const logMongoRepo = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepo)
}
