import fs from 'fs'
import path from 'path'
import { Express, Router } from 'express'

export default (app: Express) => {
  const router = Router()
  app.use('/api', router)
  fs.readdirSync(path.resolve(__dirname, '..', 'routes')).forEach(async (file) => {
    if (!file.includes('.test.')) {
      (await import(path.resolve(__dirname, '..', 'routes', file))).default(router)
    }
  })
}
