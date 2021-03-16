import { Encrypter } from '../../protocols/encrypter'
import { AccountModel } from '../../../domain/models/account'
import { AddAccountRepository } from '../../protocols/add-account-repository'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccountRepository

  constructor (encrypter: Encrypter, addAccountRepository: AddAccountRepository) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (account: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(account.password)
    await this.addAccountRepository.add({
      ...account,
      password: hashedPassword
    })
    return new Promise((resolve) => {
      resolve({
        id: 1,
        name: account.name,
        email: account.email,
        password: account.password
      })
    })
  }
}
