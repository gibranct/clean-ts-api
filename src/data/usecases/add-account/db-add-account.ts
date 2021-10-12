import { Hasher } from '../../protocols/cryptography/hasher'
import { AccountModel } from '../../../domain/models/account'
import { AddAccountRepository } from '../../protocols/db/account/add-account-repository'
import { AddAccount, AddAccountModel } from '../../../domain/usecases/add-account'
import { LoadAccountByEmailRepository } from '../authentication/db-authentication-protocols'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly encrypter: Hasher,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadByEmailRepo: LoadAccountByEmailRepository
  ) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
    this.loadByEmailRepo = loadByEmailRepo
  }

  async add (account: AddAccountModel): Promise<AccountModel | null> {
    await this.loadByEmailRepo.loadByEmail(account.email)
    const hashedPassword = await this.encrypter.hash(account.password)
    const newAccount = await this.addAccountRepository.add({
      ...account,
      password: hashedPassword
    })
    return newAccount
  }
}
