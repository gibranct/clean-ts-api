import { LogErrorRepository } from '../../data/protocols/db/log/log-error-repository'
import { HttpRequest, HttpResponse, Controller } from '../../presentation/protocols'

export class LogControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller,
    private readonly logErrorRepo: LogErrorRepository) {
    this.controller = controller
    this.logErrorRepo = logErrorRepo
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    if (httpResponse?.statusCode === 500) {
      await this.logErrorRepo.logError(httpResponse.body.stack)
    }
    return httpResponse
  }
}
