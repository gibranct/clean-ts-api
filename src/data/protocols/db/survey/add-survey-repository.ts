import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyModel } from '@/data/usecases/add-survey/db-add-survey-protocols'

export type AddSurveyRepository = {
  add: (survey: AddSurveyModel) => Promise<SurveyModel | null>
}
