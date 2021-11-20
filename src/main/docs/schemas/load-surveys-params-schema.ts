export const loadSurveysParamsSchema = {
  type: 'array',
  properties: {
    id: {
      type: 'string'
    },
    question: {
      type: 'string'
    },
    date: {
      type: 'string'
    },
    answers: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          answer: {
            type: 'string'
          },
          image: {
            type: 'string'
          }
        }
      }
    }
  }
}
