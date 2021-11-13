import { Router } from 'express'

import { adaptRoute } from '@/main/adapters/express/express-route-adapter'
import { makeAddSurveyController } from '@/main/factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeLoadSurveysController } from '@/main/factories/controllers/survey/load-survey/load-surveys-controller-factory'
import { adminAuth } from '@/main/factories/middlewares/admin-auth'
import { auth } from '@/main/factories/middlewares/auth'

export default (router: Router) => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))

  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
