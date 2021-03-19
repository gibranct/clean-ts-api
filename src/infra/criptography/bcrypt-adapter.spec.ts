import bcrypt from 'bcrypt'

import { BcryptAdapter } from './bcrypt-adapter'

describe('', () => {
  test('should call bcrypt with correct value', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('should return a hash on success', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => {
      return Promise.resolve('hash_value')
    })
    const hashValue = await sut.encrypt('any_value')
    expect(hashValue).toBe('hash_value')
  })
})
