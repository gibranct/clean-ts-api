export type AddSurveyModel = {
  question: string
  answers: SurveyAnswer[]
}

export type SurveyAnswer = {
  image: string
  answer: string
}
