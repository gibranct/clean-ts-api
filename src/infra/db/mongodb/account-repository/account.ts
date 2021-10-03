import { LoadAccountByEmailRepository } from './../../../../data/protocols/db/load-account-by-email-repository'
import { mongoHelper } from '../helpers/mongo-helper'
import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await mongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return mongoHelper.map(result.ops[0])
  }

  async loadByEmail (email: string): Promise<AccountModel | null> {
    const accountCollection = await mongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return mongoHelper.map(account)
  }
}
