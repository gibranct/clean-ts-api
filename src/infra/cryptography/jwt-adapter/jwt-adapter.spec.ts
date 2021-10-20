import jwt from 'jsonwebtoken'

import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return Promise.resolve('any_token')
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('Jwt Adapter', () => {
  describe('sign()', () => {
    test('Should call sign with correct values', async () => {
      const jwtAdapter = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await jwtAdapter.encrypt('any_id')
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
    })

    test('Should return a token on sign success', async () => {
      const jwtAdapter = makeSut()
      const token = await jwtAdapter.encrypt('any_id')
      expect(token).toEqual('any_token')
    })

    test('Should throws if sign throws', async () => {
      const jwtAdapter = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = jwtAdapter.encrypt('any_id')
      await expect(promise).rejects.toThrow()
    })
  })
})
