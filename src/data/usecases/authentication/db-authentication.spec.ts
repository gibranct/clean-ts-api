import { DbAuthentication } from './db-authentication'
import {
  AuthenticationModel,
  Authentication,
  HashComparer,
  LoadAccountByEmailRepository,
  Encrypter,
  UpdateAccessTokenRepository,
  AccountModel
} from './db-authentication-protocols'

const makeFakeAccountModel = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

const makeFakeAuthentication = (): AuthenticationModel => ({
  email: 'any_email@mail.com',
  password: 'any_password'
})

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      const account: AccountModel = makeFakeAccountModel()
      return Promise.resolve(account)
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (password: string, hashedPassword: string): Promise<boolean> {
      return Promise.resolve(true)
    }
  }
  return new HashComparerStub()
}

const makeEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (id: string): Promise<string> {
      return Promise.resolve('token')
    }
  }

  return new EncrypterStub()
}

const makeUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken (id: string, token: string): Promise<void> {
      return Promise.resolve()
    }
  }

  return new UpdateAccessTokenRepositoryStub()
}

type SutTypes = {
  sut: Authentication
  loadAccountByEmailRepoStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
  tokenGeneratorStub: Encrypter
  updateAccessTokenRepoStub: UpdateAccessTokenRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepoStub = makeLoadAccountByEmailRepository()
  const hashComparerStub = makeHashComparer()
  const tokenGeneratorStub = makeEncrypter()
  const updateAccessTokenRepoStub = makeUpdateAccessTokenRepository()
  const sut = new DbAuthentication(loadAccountByEmailRepoStub, hashComparerStub, tokenGeneratorStub, updateAccessTokenRepoStub)
  return {
    sut,
    loadAccountByEmailRepoStub,
    hashComparerStub,
    tokenGeneratorStub,
    updateAccessTokenRepoStub
  }
}

describe('DbAuthentication UseCase', () => {
  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepoStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepoStub, 'loadByEmail')
    await sut.auth(makeFakeAuthentication())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepoStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepoStub, 'loadByEmail').mockRejectedValueOnce(new Error())
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepoStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepoStub, 'loadByEmail').mockReturnValueOnce(Promise.resolve(null))
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  test('should call HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()
    const hashComparerSpy = jest.spyOn(hashComparerStub, 'compare')
    await sut.auth(makeFakeAuthentication())
    expect(hashComparerSpy).toHaveBeenCalledWith('any_password', 'hashed_password')
  })

  test('should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockRejectedValueOnce(new Error())
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockResolvedValue(false)
    const accessToken = await sut.auth(makeFakeAuthentication())
    expect(accessToken).toBeNull()
  })

  test('should call Encrypter with correct id', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    const tokenGeneratorSpy = jest.spyOn(tokenGeneratorStub, 'encrypt')
    await sut.auth(makeFakeAuthentication())
    expect(tokenGeneratorSpy).toHaveBeenCalledWith('any_id')
  })

  test('should throw if Encrypter throws', async () => {
    const { sut, tokenGeneratorStub } = makeSut()
    jest.spyOn(tokenGeneratorStub, 'encrypt').mockRejectedValueOnce(new Error())
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })

  test('should call Encrypter with correct id', async () => {
    const { sut } = makeSut()
    const accessToken = await sut.auth(makeFakeAuthentication())
    await expect(accessToken).toBe('token')
  })

  test('should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepoStub } = makeSut()
    const updateSpy = jest.spyOn(updateAccessTokenRepoStub, 'updateAccessToken')
    await sut.auth(makeFakeAuthentication())
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'token')
  })

  test('should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepoStub } = makeSut()
    jest.spyOn(updateAccessTokenRepoStub, 'updateAccessToken').mockRejectedValueOnce(new Error())
    const promise = sut.auth(makeFakeAuthentication())
    await expect(promise).rejects.toThrow()
  })
})
