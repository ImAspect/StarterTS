import { NextFunction, Request, Response, Router } from 'express'
import { withAuth } from '../middlewares/withAuth'
import userDB from '../orm/user'

const R = Router()

R.get(
  '/checkToken',
  withAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.id) {
      const userData = await userDB.findUserByKey('id', req.id)
      return res.json({
        status: 200,
        msg: '[SUCCESS] Great Token !',
        data: userData[0],
      })
    }
  }
)

export default R
