import { HttpResponse, HttpRequest } from '../../presentation/protocols'
import { Controller } from './../../presentation/protocols/controller'
import { LogControllerDecorator } from './log'

describe('LogController Decorator', () => {
  test('should call controller handle', async () => {
    class ControllerStub implements Controller {
      async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
        return Promise.resolve({
          statusCode: 200,
          body: httpRequest
        })
      }
    }
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const stub = new ControllerStub()
    const sut = new LogControllerDecorator(stub)
    const handleSpy = jest.spyOn(stub, 'handle')
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
