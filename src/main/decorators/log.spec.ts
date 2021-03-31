import { HttpResponse, HttpRequest } from '../../presentation/protocols'
import { Controller } from './../../presentation/protocols/controller'
import { LogControllerDecorator } from './log'

type SutTypes = {
  controllerStub: Controller
  sut: LogControllerDecorator
}

const makeSut = (): SutTypes => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      return Promise.resolve({
        statusCode: 200,
        body: httpRequest.body
      })
    }
  }
  const stub = new ControllerStub()
  const sut = new LogControllerDecorator(stub)
  return {
    controllerStub: stub,
    sut
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
})
