import fs from 'fs'
import path from 'path'
import { Express, Router } from 'express'

export default (app: Express) => {
  const router = Router()
  app.use('/api', router)
  // fg.sync('**/src/main/routes/**routes.ts').map(async file => {
  //   (await import(`../../../${file}`)).default(router)
  // })
  fs.readdirSync(path.resolve(__dirname, '..', 'routes')).forEach(async (file) => {
    if (!file.includes('.test.')) {
      (await import(path.resolve(__dirname, '..', 'routes', file))).default(router)
    }
  })
}
