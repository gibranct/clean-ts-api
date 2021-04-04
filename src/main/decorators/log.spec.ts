import { serverError } from './../../presentation/helpers/http-helper'
import { HttpResponse, HttpRequest } from '../../presentation/protocols'
import { Controller } from './../../presentation/protocols/controller'
import { LogControllerDecorator } from './log'
import { LogErrorRepository } from '../../data/protocols/log-error-repository'

const makeHttpRequest = () => ({
  body: {
    name: 'valid_name',
    email: 'valid_email@mail.com',
    password: 'valid_password',
    passwordConfirmation: 'valid_password'
  }
})

const makeFakeServerError = () => {
  const fakeError = new Error()
  fakeError.stack = 'not good'
  return serverError(fakeError)
}

const makeControllerStub = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return Promise.resolve({
        statusCode: 200,
        body: httpRequest.body
      })
    }
  }
  return new ControllerStub()
}

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (stack: string): Promise<void> {
      return Promise.resolve()
    }
  }
  return new LogErrorRepositoryStub()
}

type SutTypes = {
  controllerStub: Controller
  sut: LogControllerDecorator
  logErrorRepoStub: LogErrorRepository
}

const makeSut = (): SutTypes => {
  const stub = makeControllerStub()
  const logErrorRepoStub = makeLogErrorRepository()
  const sut = new LogControllerDecorator(stub, logErrorRepoStub)
  return {
    controllerStub: stub,
    sut,
    logErrorRepoStub
  }
}

describe('LogController Decorator', () => {
  test('should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const httpRequest = makeHttpRequest()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = makeHttpRequest()
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: httpRequest.body
    })
  })

  test('should call LogErrorRepository log method', async () => {
    const { controllerStub, logErrorRepoStub, sut } = makeSut()
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(makeFakeServerError())))
    const logSpy = jest.spyOn(logErrorRepoStub, 'logError')
    const httpRequest = makeHttpRequest()
    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith(makeFakeServerError()?.body.stack)
  })
})
