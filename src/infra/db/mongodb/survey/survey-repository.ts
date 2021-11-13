import { LoadSurveysRepository } from './../../../../data/protocols/db/survey/load-surveys-repository'
import { SurveyModel } from './../../../../domain/models/survey'
import { mongoHelper } from '../helpers/mongo-helper'
import { AddSurveyModel, AddSurveyRepository } from '../../../../data/usecases/add-survey/db-add-survey-protocols'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add (surveyData: AddSurveyModel): Promise<SurveyModel | null> {
    const surveyCollection = await mongoHelper.getCollection('surveys')
    const result = await surveyCollection.insertOne(surveyData)
    return mongoHelper.map(result.ops[0])
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await mongoHelper.getCollection('surveys')
    const surveys = await surveyCollection.find({}).toArray()
    return surveys
  }
}
