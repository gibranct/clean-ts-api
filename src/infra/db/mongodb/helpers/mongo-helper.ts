import { Collection, MongoClient } from 'mongodb'

class MongoHelper {
  client: MongoClient

  async connect (mongoUrl: string) {
    this.client = await MongoClient.connect(mongoUrl, {
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

  map (collection: any): any {
    const { _id, ...accountWithoutId } = collection
    return {
      id: _id,
      ...accountWithoutId
    }
  }
}

const mongoHelper = new MongoHelper()

export {
  mongoHelper
}
