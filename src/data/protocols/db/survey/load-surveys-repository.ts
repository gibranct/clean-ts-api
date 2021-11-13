import { SurveyModel } from '@/domain/models/survey'

export type LoadSurveysRepository = {
  loadAll: () => Promise<SurveyModel[]>
}
