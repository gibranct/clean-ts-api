import { mongoHelper } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL!)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  test('should reconnect if mongodb is down', async () => {
    let accountCollection = await mongoHelper.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
    accountCollection = await mongoHelper.getCollection('accounts')
    expect(accountCollection).toBeTruthy()
  })
})
