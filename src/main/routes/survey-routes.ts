import { Router } from 'express'

import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey-controller-factory'
import { makeLoadSurveysController } from '../factories/controllers/survey/load-survey/load-surveys-controller-factory'
import { adminAuth } from '../factories/middlewares/admin-auth'
import { auth } from '../factories/middlewares/auth'

export default (router: Router) => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))

  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
