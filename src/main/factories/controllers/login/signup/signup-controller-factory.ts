import { LogMongoRepository } from '@/infra/db/mongodb/log/log-repository'
import { SignUpController } from '@/presentation/controllers/signup/sign-up-controller'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/authentication/db-authentication-factory'
import { makeDbAddAccount } from '@/main/factories/usecases/add-account/db-add-account-factory'

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(makeDbAuthentication(), makeDbAddAccount(), makeSignUpValidation())
  const logMongoRepo = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepo)
}
