import { AccountModel } from '../../domain/models/account'
import { AddAccountModel } from '../../domain/usecases/add-account'

export type AddAccountRepository = {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
