import { hash } from 'bcrypt'
import { Collection } from 'mongodb'
import request from 'supertest'

import { mongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '@/main/config/app'

let accountCollection: Collection

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL!)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await mongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('should return an account on success', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'name',
          email: 'name@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('should return 200 on login', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'name',
        email: 'name@gmail.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'name@gmail.com',
          password: '123'
        })
        .expect(200)
    })

    test('should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'name@gmail.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
