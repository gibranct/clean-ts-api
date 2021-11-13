import MockDate from 'mockdate'
import { Collection } from 'mongodb'
import { mongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-repository'

let surveyCollection: Collection

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    await mongoHelper.connect(process.env.MONGO_URL!)
  })

  afterAll(async () => {
    MockDate.reset()
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
      }],
      date: new Date()
    })
    expect(survey).toBeTruthy()
    expect(survey!.id).toBeTruthy()
    expect(survey!.question).toBe('any_question')
    expect(survey!.answers[0].answer).toBe('any_anwser')
    expect(survey!.answers[0].image).toBe('any_image')
  })

  test('should load all surveys on success', async () => {
    await surveyCollection.insertMany([{
      question: 'any_question',
      answers: [{
        answer: 'any_anwser',
        image: 'any_image'
      }],
      date: new Date()
    }])
    const sut = makeSut()
    const surveys = await sut.loadAll()
    expect(surveys.length).toBe(1)
  })
})
