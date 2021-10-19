import { LoadAccountByTokenRepository } from './../../protocols/db/account/load-account-by-token-repository'
import { AccountModel } from './../../../domain/models/account'
import { DbLoadAccountByToken } from './db-load-account-by-token'
import { Decrypter } from './../../protocols/cryptography/decrypter'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password'
})

type SutType = {
  sut: DbLoadAccountByToken
  decrypterStub: Decrypter
  loadAccountByEmailRepoStub: LoadAccountByTokenRepository
}

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return Promise.resolve('any_toke')
    }
  }

  return new DecrypterStub()
}

const makeLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (token: string, role?: string): Promise<AccountModel | null> {
      return Promise.resolve(makeFakeAccount())
    }
  }

  return new LoadAccountByTokenRepositoryStub()
}

const makeSut = (): SutType => {
  const decrypterStub = makeDecrypter()
  const loadAccountByEmailRepoStub = makeLoadAccountByTokenRepository()
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByEmailRepoStub)
  return {
    sut,
    decrypterStub,
    loadAccountByEmailRepoStub
  }
}

describe('DbLoadAccountByToken UseCase', () => {
  test('should call Decrypter with the correct value', async () => {
    const { sut, decrypterStub } = makeSut()
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt')
    await sut.loadByToken('any_token', 'any_role')
    expect(decryptSpy).toHaveBeenCalledWith('any_token')
  })

  test('should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.loadByToken('any_token', 'any_role')
    expect(response).toBeNull()
  })

  test('should call LoadAccountByTokenRepository with the correct values', async () => {
    const { sut, loadAccountByEmailRepoStub } = makeSut()
    const loadByTokenSpy = jest.spyOn(loadAccountByEmailRepoStub, 'loadByToken')
    await sut.loadByToken('any_token', 'any_role')
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role')
  })
})
