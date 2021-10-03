import jwt from 'jsonwebtoken'

import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return Promise.resolve('any_token')
  }
}))

describe('Jwt Adapter', () => {
  test('Should call sign with correct values', async () => {
    const jwtAdapter = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    await jwtAdapter.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret')
  })

  test('Should return a token on sign success', async () => {
    const jwtAdapter = new JwtAdapter('secret')
    const token = await jwtAdapter.encrypt('any_id')
    expect(token).toEqual('any_token')
  })
})
