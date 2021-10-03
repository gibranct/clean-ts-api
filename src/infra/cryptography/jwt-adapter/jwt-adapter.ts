import jwt from 'jsonwebtoken'
import { Encrypter } from './../../../data/protocols/db/encrypter'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secret: string) {
    this.secret = secret
  }

  async encrypt (value: string): Promise<string> {
    await jwt.sign({ id: value }, this.secret)
    return Promise.resolve('dasd')
  }
}
