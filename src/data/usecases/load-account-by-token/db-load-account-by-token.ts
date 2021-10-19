import { LoadAccountByTokenRepository } from './../../protocols/db/account/load-account-by-token-repository'
import { Decrypter } from '../../protocols/cryptography/decrypter'
import { AccountModel } from '../authentication/db-authentication-protocols'
import { LoadAccountByToken } from './../../../domain/usecases/load-account-by-token'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly descryper: Decrypter,
    private readonly loadAccountByTokenRepo: LoadAccountByTokenRepository
  ) {}

  async loadByToken (accessToken: string, role?: string | undefined): Promise<AccountModel | null> {
    const decryptedToken = await this.descryper.decrypt(accessToken)
    let account
    if (decryptedToken) {
      account = await this.loadAccountByTokenRepo.loadByToken(accessToken, role)
    }
    return account ?? null
  }
}
