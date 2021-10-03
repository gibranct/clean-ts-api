import {
  AuthenticationModel,
  Authentication,
  HashComparer,
  LoadAccountByEmailRepository,
  Encrypter,
  UpdateAccessTokenRepository
} from './db-authentication-protocols'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepo: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer
  private readonly tokenGenerator: Encrypter
  private readonly updateAccessTokenRepo: UpdateAccessTokenRepository

  constructor (
    loadAccountByEmailRepo: LoadAccountByEmailRepository,
    hashComparer: HashComparer,
    tokenGenerator: Encrypter,
    updateAccessTokenRepo: UpdateAccessTokenRepository
  ) {
    this.loadAccountByEmailRepo = loadAccountByEmailRepo
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
    this.updateAccessTokenRepo = updateAccessTokenRepo
  }

  async auth (authentication: AuthenticationModel): Promise<string | null> {
    const accountModel = await this.loadAccountByEmailRepo.loadByEmail(authentication.email)
    if (accountModel) {
      const hasCorrectPassword = await this.hashComparer.compare(authentication.password, accountModel.password)
      if (hasCorrectPassword) {
        const accessToken = await this.tokenGenerator.encrypt(accountModel.id)
        await this.updateAccessTokenRepo.updateAccessToken(accountModel.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
