import request from 'supertest'

import app from '../config/app'

describe('Middleware Body Parser', () => {
  test('should parse body as json', async () => {
    app.post('/test-body-parser', (req, res) => {
      return res.send(req.body)
    })

    await request(app)
      .post('/test-body-parser')
      .send({ test: 'body-parser' })
      .expect({ test: 'body-parser' })
  })
})
