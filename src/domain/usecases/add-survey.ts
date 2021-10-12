
export type AddSurveyModel = {
  question: string
  answer: SurveyAnswer[]
}

export type SurveyAnswer = {
  image: string
  answer: string
}

export interface AddSurvey {
  add: (account: AddSurveyModel) => Promise<void>
}
