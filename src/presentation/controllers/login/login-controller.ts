import { HttpRequest, HttpResponse, Authentication, Validation, Controller } from './login-protocols'
import { serverError, unauthorized, ok, badRequest } from '../../helpers/http/http-helper'
export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {
    this.authentication = authentication
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const accessToken = await this.authentication.auth(httpRequest.body)
      if (!accessToken) {
        return unauthorized()
      }

      return ok({ accessToken })
    } catch (error) {
      console.log(error)
      return serverError(error)
    }
  }
}
