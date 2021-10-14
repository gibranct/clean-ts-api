import { AddSurveyModel } from '../../../../domain/models/survey'

export type AddSurveyRepository = {
  add: (survey: AddSurveyModel) => Promise<AddSurveyModel | null>
}
