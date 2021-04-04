import { badRequest } from './../../helpers/http-helper'
import { LoginController } from './login-controller'
import { Controller } from './../../protocols/controller'
import { MissingParamError } from '../../errors'

const makeSut = (): Controller => {
  return new LoginController()
}

describe('Login Controller', () => {
  test('should return 400 if no email is provided', async () => {
    const sut = makeSut()
    const httpResponse = await sut.handle({
      body: {
        password: 'any_password'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('should return 400 if no password is provided', async () => {
    const sut = makeSut()
    const httpResponse = await sut.handle({
      body: {
        email: 'any_email'
      }
    })
    expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
  })
})
