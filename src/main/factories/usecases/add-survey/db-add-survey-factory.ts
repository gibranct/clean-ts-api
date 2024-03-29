
import { DbAddSurvey } from '@/data/usecases/add-survey/db-add-survey'
import { AddSurvey } from '@/domain/usecases/add-survey'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-repository'

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyRepo = new SurveyMongoRepository()
  return new DbAddSurvey(surveyRepo)
}
