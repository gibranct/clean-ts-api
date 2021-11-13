import { AddSurveyController } from '@/presentation/controllers/survey/add-survey/add-survey-controller'
import { LogMongoRepository } from '@/infra/db/mongodb/log/log-repository'
import { Controller } from '@/presentation/protocols'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { makeDbAddSurvey } from '@/main/factories/usecases/add-survey/db-add-survey-factory'

export const makeAddSurveyController = (): Controller => {
  const surveyController = new AddSurveyController(makeAddSurveyValidation(), makeDbAddSurvey())
  const logMongoRepo = new LogMongoRepository()
  return new LogControllerDecorator(surveyController, logMongoRepo)
}
