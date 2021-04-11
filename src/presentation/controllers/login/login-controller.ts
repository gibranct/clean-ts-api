import { Authentication } from './../../../domain/usecases/authentication'
import { InvalidParamError } from './../../errors/invalid-param-error'
import { EmailValidator } from './../../protocols/email-validator'
import { HttpRequest, HttpResponse } from '../../protocols'
import { MissingParamError } from './../../errors/missing-param-error'
import { badRequest, serverError, unauthorized } from './../../helpers/http-helper'
import { Controller } from './../../protocols/controller'

export class LoginController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly authentication: Authentication

  constructor (emailValidator: EmailValidator, authentication: Authentication) {
    this.emailValidator = emailValidator
    this.authentication = authentication
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body

    try {
      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const isEmailValid = await this.emailValidator.isValid(email)
      if (!isEmailValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const accessToken = await this.authentication.auth(email, password)
      if (!accessToken) {
        return unauthorized()
      }
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
