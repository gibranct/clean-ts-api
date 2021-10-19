import { Decrypter } from '../../protocols/cryptography/decrypter'
import { AccountModel } from '../authentication/db-authentication-protocols'
import { LoadAccountByToken } from './../../../domain/usecases/load-account-by-token'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (private readonly descryper: Decrypter) {}

  async loadByToken (accessToken: string, role?: string | undefined): Promise<AccountModel | null> {
    const decryptedToken = await this.descryper.decrypt(accessToken)
    if (!decryptedToken) return null
    return null
  }
}
