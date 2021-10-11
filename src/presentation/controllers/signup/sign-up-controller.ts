import { EmailInUseError } from './../../errors/email-in-use-error'
import { Controller, HttpRequest, HttpResponse, AddAccount, Validation, Authentication } from './signup-protocols'
import { badRequest, serverError, ok, forbidden } from '../../helpers/http/http-helper'

export class SignUpController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = httpRequest.body

      const account = await this.addAccount.add({
        name,
        email,
        password
      })
      if (!account) {
        return forbidden(new EmailInUseError())
      }
      const accessToken = await this.authentication.auth({
        email,
        password
      })
      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
