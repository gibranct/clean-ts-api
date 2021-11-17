import express from 'express'

import setUpMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupSwagger from './config-swagger'

const app = express()

setupSwagger(app)
setUpMiddlewares(app)
setupRoutes(app)

export default app
