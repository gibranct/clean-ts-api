import { Collection, MongoClient } from 'mongodb'

class MongoHelper {
  client: MongoClient | null
  url: string

  async connect (mongoUrl: string) {
    this.url = mongoUrl
    this.client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  async disconnect () {
    await this.client?.close()
    this.client = null
  }

  async getCollection (name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.url)
    }
    return this.client!.db().collection(name)
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
