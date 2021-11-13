import { SurveyMongoRepository } from './../../../../../infra/db/mongodb/survey/survey-repository'
import { LogMongoRepository } from '../../../../../infra/db/mongodb/log/log-repository'
import { LoadSurveysController } from '../../../../../presentation/controllers/survey/load-survey/load-surveys-controller.'
import { Controller } from '../../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../../decorators/log-controller-decorator'
import { DbLoadSurveys } from '../../../../../data/usecases/load-surveys/db-load-surveys'

export const makeLoadSurveysController = (): Controller => {
  const surveyRepository = new SurveyMongoRepository()
  const loadSurveys = new DbLoadSurveys(surveyRepository)
  const surveyController = new LoadSurveysController(loadSurveys)
  const logMongoRepo = new LogMongoRepository()
  return new LogControllerDecorator(surveyController, logMongoRepo)
}
