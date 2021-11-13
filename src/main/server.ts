import 'module-alias/register'
import { mongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from './config/app'
import env from './config/env'

mongoHelper.connect(env.mongoUrl)
  .then(() => {
    app.listen(env.port, () => {
      console.log(`Server running at http://127.0.0.1:${env.port}`)
    })
  }).catch(console.error)
