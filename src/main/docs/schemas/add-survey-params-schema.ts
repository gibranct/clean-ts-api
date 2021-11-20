export const addSurveyParamsSchema = {
  type: 'object',
  properties: {
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
  },
  required: ['question', 'date', 'answers']
}
