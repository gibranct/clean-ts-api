import { Express } from 'express'

import { bodyParser, cors } from '../middlewares'
import setUpRoutes from './routes'

export default (app: Express) => {
  app.use(bodyParser)
  app.use(cors)
  setUpRoutes(app)
}
