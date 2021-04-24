import { TokenGenerator } from './../../protocols/db/token-generator'
import { HashComparer } from '../../protocols/cryptography/hash-comparer'
import { LoadAccountByEmailRepository } from '../../protocols/db/load-account-by-email-repository'
import { Authentication, AuthenticationModel } from './../../../domain/usecases/authentication'
import { UpdateAccessTokenRepository } from '../../protocols/db/update-access-token-repository'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepo: LoadAccountByEmailRepository
  private readonly hashComparer: HashComparer
  private readonly tokenGenerator: TokenGenerator
  private readonly updateAccessTokenRepo: UpdateAccessTokenRepository

  constructor (
    loadAccountByEmailRepo: LoadAccountByEmailRepository,
    hashComparer: HashComparer,
    tokenGenerator: TokenGenerator,
    updateAccessTokenRepo: UpdateAccessTokenRepository
  ) {
    this.loadAccountByEmailRepo = loadAccountByEmailRepo
    this.hashComparer = hashComparer
    this.tokenGenerator = tokenGenerator
    this.updateAccessTokenRepo = updateAccessTokenRepo
  }

  async auth (authentication: AuthenticationModel): Promise<string | null> {
    const accountModel = await this.loadAccountByEmailRepo.load(authentication.email)
    if (accountModel) {
      const hasCorrectPassword = await this.hashComparer.compare(authentication.password, accountModel.password)
      if (hasCorrectPassword) {
        const accessToken = await this.tokenGenerator.generate(accountModel.id)
        await this.updateAccessTokenRepo.update(accountModel.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
