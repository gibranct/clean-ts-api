import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'

import { mongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'
import env from '../config/env'

let surveyCollection: Collection
let accountCollection: Collection

describe('Survey Routes', () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL!)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await mongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    accountCollection = await mongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'any_question',
          answers: [
            {
              answer: 'any_answer',
              image: 'any_image'
            }
          ]
        })
        .expect(403)
    })

    test('should return 204 on add survey with valid accessToken', async () => {
      const res = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        role: 'admin'
      })
      const id = res.ops[0]._id
      const accessToken = sign({ id }, env.jwtSecret)
      await accountCollection.updateOne({ _id: id }, { $set: { accessToken } })
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'any_question',
          answers: [
            {
              answer: 'any_answer',
              image: 'any_image'
            }
          ]
        })
        .expect(204)
    })
  })
})
