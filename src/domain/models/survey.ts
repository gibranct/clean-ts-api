export type SurveyModel = {
  id: string
  question: string
  answers: SurveyAnswer[]
}

export type SurveyAnswer = {
  image: string
  answer: string
}
