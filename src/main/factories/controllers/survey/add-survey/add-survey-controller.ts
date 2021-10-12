import { AddSurvey } from './../../../../../domain/usecases/add-survey'
import { badRequest } from './../../../../../presentation/helpers/http/http-helper'
import { Controller, HttpRequest, HttpResponse, Validation } from './add-survey-protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {
    this.validation = validation
    this.addSurvey = addSurvey
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    await this.addSurvey.add(httpRequest.body)
    return Promise.resolve({
      body: {},
      statusCode: 200
    })
  }
}
