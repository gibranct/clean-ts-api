import { AddSurveyModel } from '../models/survey'

export interface AddSurvey {
  add: (survey: AddSurveyModel) => Promise<void>
}
