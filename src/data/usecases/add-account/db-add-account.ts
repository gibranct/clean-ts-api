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

  async add (data: AddAccountModel): Promise<AccountModel | null> {
    const account = await this.loadByEmailRepo.loadByEmail(data.email)
    if (account) return null
    const hashedPassword = await this.encrypter.hash(data.password)
    const newAccount = await this.addAccountRepository.add({
      ...data,
      password: hashedPassword
    })
    return newAccount
  }
}
