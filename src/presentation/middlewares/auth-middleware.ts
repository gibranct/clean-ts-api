import { LoadAccountByToken } from '../../domain/usecases/load-account-by-token'
import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers/http/http-helper'
import { HttpRequest, HttpResponse, Middleware } from '../protocols'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken
  ) {
    this.loadAccountByToken = loadAccountByToken
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = new AccessDeniedError()
    const accessToken = httpRequest?.headers?.['x-access-token']
    if (accessToken) {
      await this.loadAccountByToken.loadByToken(accessToken)
    }
    return forbidden(error)
  }
}
