export const forbidden = {
  description: 'Requisição não autorizada',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error'
      }
    }
  }
}
