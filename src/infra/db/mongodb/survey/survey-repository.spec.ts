import { Collection } from 'mongodb'
import { mongoHelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-repository'

let surveyCollection: Collection

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL!)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await mongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  const makeSut = (): SurveyMongoRepository => {
    return new SurveyMongoRepository()
  }

  test('should return an survey on AddSurveyRepository success', async () => {
    const sut = makeSut()
    const survey = await sut.add({
      question: 'any_question',
      answers: [{
        answer: 'any_anwser',
        image: 'any_image'
      }]
    })
    expect(survey).toBeTruthy()
    expect(survey!.id).toBeTruthy()
    expect(survey!.question).toBe('any_question')
    expect(survey!.answers[0].answer).toBe('any_anwser')
    expect(survey!.answers[0].image).toBe('any_image')
  })
})
