import { makeSignUpValidation } from './signup-validation'
import { LogMongoRepostiory } from './../../infra/db/mongodb/log-repository/log'
import { LogControllerDecorator } from './../decorators/log'
import { BcryptAdapter } from './../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from './../../infra/db/mongodb/account-repository/account'
import { DbAddAccount } from './../../data/usecases/add-account/db-add-account'
import { EmailValidatorAdapter } from './../../utils/email-validator-adapter'
import { SignUpController } from './../../presentation/controllers/signup/sign-up-controller'
import { Controller } from '../../presentation/protocols'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount, makeSignUpValidation())
  const logMongoRepo = new LogMongoRepostiory()
  return new LogControllerDecorator(signUpController, logMongoRepo)
}
