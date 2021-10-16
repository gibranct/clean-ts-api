import { SurveyModel } from '../../../../domain/models/survey'
import { AddSurveyModel } from '../../../usecases/add-survey/db-add-survey-protocols'

export type AddSurveyRepository = {
  add: (survey: AddSurveyModel) => Promise<SurveyModel | null>
}
