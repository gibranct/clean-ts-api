import { InvalidParamError } from './../../errors/invalid-param-error'
import { EmailValidator } from './../../protocols/email-validator'
import { HttpRequest, HttpResponse } from '../../protocols'
import { MissingParamError } from './../../errors/missing-param-error'
import { badRequest, serverError } from './../../helpers/http-helper'
import { Controller } from './../../protocols/controller'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body

    try {
      if (!email) {
        return new Promise(resolve => resolve(badRequest(new MissingParamError('email'))))
      }
      if (!password) {
        return new Promise(resolve => resolve(badRequest(new MissingParamError('password'))))
      }

      const isEmailValid = await this.emailValidator.isValid(email)
      if (!isEmailValid) {
        return new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
