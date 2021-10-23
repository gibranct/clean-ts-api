import { Middleware } from './../../../presentation/protocols/middleware'
import { NextFunction, Request, Response } from 'express'
import { HttpRequest } from '../../../presentation/protocols'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: req.headers
    }
    const httpResponse = await middleware.handle(httpRequest)
    if (httpResponse?.statusCode === 200) {
      Object.assign(res, httpResponse.body)
      return next()
    }
    return res.status(httpResponse?.statusCode ?? 500).json({
      error: httpResponse?.body.message
    })
  }
}
