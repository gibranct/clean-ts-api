import { Hasher } from '../../protocols/cryptography/hasher'
import { AccountModel } from '../../../domain/models/account'
import { AddAccountRepository } from '../../protocols/db/account/add-account-repository'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Hasher,
    private readonly addAccountRepository: AddAccountRepository
  ) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (account: AddAccountModel): Promise<AccountModel | null> {
    const hashedPassword = await this.encrypter.hash(account.password)
    const newAccount = await this.addAccountRepository.add({
      ...account,
      password: hashedPassword
    })
    return newAccount
  }
}
