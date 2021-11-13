import { LoadSurveys, LoadSurveysRepository, SurveyModel } from './db-load-surveys-protocols'

export class DbLoadSurveys implements LoadSurveys {
  constructor (
    private readonly loadSurveysRepo: LoadSurveysRepository
  ) {
    this.loadSurveysRepo = loadSurveysRepo
  }

  async load (): Promise<SurveyModel[]> {
    const surveys = await this.loadSurveysRepo.loadAll()
    return surveys
  }
}
