import request from 'supertest'

import app from '../config/app'

describe('Middleware Cors', () => {
  test('should parse body as json', async () => {
    app.get('/test-cors', (req, res) => {
      return res.send(req.body)
    })

    await request(app)
      .get('/test-cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*')
  })
})
