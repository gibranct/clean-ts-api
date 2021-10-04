import env from '../../config/env'
import { JwtAdapter } from './../../../infra/cryptography/jwt-adapter/jwt-adapter'
import { AccountMongoRepository } from './../../../infra/db/mongodb/account/account-repository'
import { makeLoginValidation } from './login-validation-factory'
import { DbAuthentication } from './../../../data/usecases/authentication/db-authentication'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-repository'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { Controller } from '../../../presentation/protocols'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'

export const makeLoginController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAuth = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
  const loginController = new LoginController(dbAuth, makeLoginValidation())
  const logMongoRepo = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepo)
}
