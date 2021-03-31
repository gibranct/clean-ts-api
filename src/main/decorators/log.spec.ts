import { serverError } from './../../presentation/helpers/http-helper'
import { HttpResponse, HttpRequest } from '../../presentation/protocols'
import { Controller } from './../../presentation/protocols/controller'
import { LogControllerDecorator } from './log'
import { LogErrorRepository } from '../../data/protocols/log-error-repository'

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
    async log (stack: string): Promise<void> {
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
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })

  test('should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: httpRequest.body
    })
  })

  test('should call LogErrorRepository log method', async () => {
    const { controllerStub, logErrorRepoStub, sut } = makeSut()
    const fakeError = new Error()
    fakeError.stack = 'not good'
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(serverError(fakeError))))
    const logSpy = jest.spyOn(logErrorRepoStub, 'log')
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    await sut.handle(httpRequest)
    expect(logSpy).toHaveBeenCalledWith(fakeError.stack)
  })
})
