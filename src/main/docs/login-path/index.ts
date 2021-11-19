export const loginPath = {
  post: {
    tags: ['login'],
    summary: 'API para autenticar o usuário',
    requestBody: {
      description: 'Dados do usuário',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/loginParams'
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/account'
            }
          }
        }
      }
    }
  }
}
