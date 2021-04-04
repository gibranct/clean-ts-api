import { mongoHelper } from '../helpers/mongo-helper'
import { LogErrorRepository } from './../../../../data/protocols/log-error-repository'

export class LogMongoRepostiory implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorCollection = await mongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date().toISOString()
    })
  }
}
