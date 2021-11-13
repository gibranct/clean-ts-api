import { makeDbLoadSurveys } from '@/main/factories/usecases/load-surveys/db-load-surveys-factory'
import { LogMongoRepository } from '@/infra/db/mongodb/log/log-repository'
import { LoadSurveysController } from '@/presentation/controllers/survey/load-survey/load-surveys-controller.'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'

export const makeLoadSurveysController = (): Controller => {
  const surveyController = new LoadSurveysController(makeDbLoadSurveys())
  const logMongoRepo = new LogMongoRepository()
  return new LogControllerDecorator(surveyController, logMongoRepo)
}
