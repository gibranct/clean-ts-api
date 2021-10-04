import { makeSignUpValidation } from './signup-validation-factory'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-repository'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { BcryptAdapter } from '../../../infra/cryptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-repository'
import { DbAddAccount } from '../../../data/usecases/add-account/db-add-account'
import { SignUpController } from '../../../presentation/controllers/signup/sign-up-controller'
import { Controller } from '../../../presentation/protocols'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation())
  const logMongoRepo = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepo)
}
