export const surveyPath = {
  post: {
    tags: ['Survey'],
    summary: 'API para cadastrar pesquisa',
    requestBody: {
      description: 'Dados da pesquisa',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/addSignupParams'
          }
        }
      }
    },
    security: [
      {
        ApiKeyAuth: []
      }
    ],
    responses: {
      204: {
        description: 'Sucesso'
      },
      400: {
        $ref: '#/components/badRequest'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  },
  get: {
    tags: ['Survey'],
    summary: 'API para listar pesquisas',
    security: [
      {
        ApiKeyAuth: []
      }
    ],
    responses: {
      200: {
        description: 'Sucesso',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/loadSurveys'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      401: {
        $ref: '#/components/unauthorized'
      },
      403: {
        $ref: '#/components/forbidden'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
