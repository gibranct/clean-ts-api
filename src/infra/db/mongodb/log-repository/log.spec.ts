import { Collection } from 'mongodb'

import { mongoHelper } from '../helpers/mongo-helper'
import { LogMongoRepostiory } from './log'
import { LogErrorRepository } from '../../../../data/protocols/db/log-error-repository'

const makeSut = (): LogErrorRepository => {
  return new LogMongoRepostiory()
}

describe('Log Mongo Repository', () => {
  let errorCollection: Collection

  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL!)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  beforeEach(async () => {
    errorCollection = await mongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  test('should create an erro log on success', async () => {
    const sut = makeSut()
    await sut.logError('any_error')
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
