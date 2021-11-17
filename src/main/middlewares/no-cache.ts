import { Request, Response, NextFunction } from 'express'

export const noCache = (req: Request, res: Response, next: NextFunction) => {
  res.set('cache-control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
  res.set('pragma', 'no-cache')
  res.set('expires', '0')
  res.set('surrogate-control', 'no-store')
  return next()
}