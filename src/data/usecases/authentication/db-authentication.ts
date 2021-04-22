import { LoadAccountByEmailRepository } from './../../protocols/load-account-by-email-repository'
import { Authentication, AuthenticationModel } from './../../../domain/usecases/authentication'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailRepo: LoadAccountByEmailRepository

  constructor (loadAccountByEmailRepo: LoadAccountByEmailRepository) {
    this.loadAccountByEmailRepo = loadAccountByEmailRepo
  }

  async auth (authentication: AuthenticationModel): Promise<string | null> {
    await this.loadAccountByEmailRepo.load(authentication.email)
    return null
  }
}
