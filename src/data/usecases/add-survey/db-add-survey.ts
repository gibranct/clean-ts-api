import { AddSurvey, AddSurveyModel, AddSurveyRepository } from './db-add-account-protocols'

export class DbAddSurvey implements AddSurvey {
  constructor (
    private readonly addSurveyRepo: AddSurveyRepository
  ) {
    this.addSurveyRepo = addSurveyRepo
  }

  async add (data: AddSurveyModel): Promise<void> {
    await this.addSurveyRepo.add(data)
  }
}
