import { Request, Response, NextFunction } from 'express'
import JWT from 'jsonwebtoken'

const withAuth = (req: Request, res: Response, next: NextFunction) => {
  JWT.verify(
    req.cookies[`${process.env.COOKIE_NAME}`],
    process.env.SECRET_TOKEN as string,
    (err: JWT.VerifyErrors | null, decodedToken: any) => {
      if (err) {
        req.id = null
        res
          .status(400)
          .json({ status: 400, msg: '[ERROR] Invalid Token !', data: null })
        return
      }

      req.id = decodedToken.id

      next()
    }
  )
}

export { withAuth }
