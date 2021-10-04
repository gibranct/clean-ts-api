import { Router } from 'express'

import { makeSignUpController } from '../factories/signup/signup-controller-factory'
import { makeLoginController } from './../factories/login/login-controller-factory'
import { adaptRoute } from './../adapters/express/express-route-adapter'

export default (router: Router) => {
  router.post('/signup', adaptRoute(makeSignUpController()))

  router.post('/login', adaptRoute(makeLoginController()))
}