import { Collection, MongoClient } from 'mongodb'

class MongoHelper {
  client: MongoClient

  async connect () {
    this.client = await MongoClient.connect(process.env.MONGO_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  async disconnect () {
    return this.client.close()
  }

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  }
}

const mongoHelper = new MongoHelper()

export {
  mongoHelper
}
