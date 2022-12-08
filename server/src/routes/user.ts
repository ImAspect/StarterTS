import { NextFunction, Request, Response, Router } from 'express'
import userServices from '../services/user'
import userDB from '../orm/user'
import jwt from 'jsonwebtoken'

const R = Router()

R.post('/create', async (req: Request, res: Response, next: NextFunction) => {
  const { email, username, password, passwordConfirmation } = req.body

  try {
    const { status, msg } = await userServices.createUser({
      email,
      username,
      password,
      passwordConfirmation,
    })
    res.status(status).json({ status, msg })
  } catch ({ status, msg }) {
    res.status(status as number).json({ status, msg })
  }
})

R.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body

  if (!username || !password)
    return res.status(400).json({ status: 400, msg: 'Error: Invalid data' })

  try {
    const { status, msg } = await userServices.loginUser({
      username,
      password,
    })
    const userData = await userDB.findUserByKey('username', username)
    // @ts-ignore
    const infos = { id: userData[0].id, username: userData[0].username }
    const secret = process.env.SECRET_TOKEN
    // @ts-ignore
    const token = jwt.sign(infos, secret)
    res
      .cookie(`${process.env.COOKIE_NAME}`, token, {
        httpOnly: true,
        secure: false,
        path: '/',
      })
      .json({ status, msg, user: userData[0] })
  } catch ({ status, msg }) {
    res.status(status as number).json({ status, msg })
  }
})

R.get('/logout', async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie(`${process.env.COOKIE_NAME}`)
  res.status(200).json({ status: 200, msg: 'Success: User logout' })
})

R.get(
  '/sendVerify/:email',
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params
    if (!email)
      return res.status(400).json({ status: 400, msg: 'Error: Invalid data' })

    try {
      const { status, msg } = await userServices.sendVerifyCodeUser({
        email,
      })

      res.status(status).json({ status, msg })
    } catch ({ status, msg }) {
      res.status(status as number).json({ status, msg })
    }
  }
)

R.get(
  '/sendVerifyUpdate/:email',
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params
    if (!email)
      return res.status(400).json({ status: 400, msg: 'Error: Invalid data' })

    try {
      const { status, msg } = await userServices.sendVerifyUpdateCodeUser({
        email,
      })

      res.status(status).json({ status, msg })
    } catch ({ status, msg }) {
      res.status(status as number).json({ status, msg })
    }
  }
)

R.post(
  '/verify/:email',
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params
    const { code } = req.body

    if (!email || !code)
      return res.status(400).json({ status: 400, msg: 'Error: Invalid data' })

    try {
      const { status, msg } = await userServices.userEmailVerify({
        email,
        code,
      })

      res.status(status).json({ status, msg })
    } catch ({ status, msg }) {
      res.status(status as number).json({ status, msg })
    }
  }
)

R.post(
  '/verifyUpdate/:email',
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params
    const { code } = req.body

    if (!email || !code)
      return res.status(400).json({ status: 400, msg: 'Error: Invalid data' })

    try {
      const { status, msg } = await userServices.userEmailUpdateVerify({
        email,
        code,
      })

      res.status(status).json({ status, msg })
    } catch ({ status, msg }) {
      res.status(status as number).json({ status, msg })
    }
  }
)

R.get(
  '/forgot/:email',
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.params

    if (!email)
      return res.status(400).json({ status: 400, msg: 'Error: Invalid data' })

    try {
      const { status, msg } = await userServices.userForgotPassword({
        email,
      })

      res.status(status).json({ status, msg })
    } catch ({ status, msg }) {
      res.status(status as number).json({ status, msg })
    }
  }
)

R.post(
  '/updatePassword/:email',
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, newPassword, newPasswordConfirmation } = req.body
    const { email } = req.params

    if (!password || !newPassword || !newPasswordConfirmation || !email)
      return res.status(400).json({ status: 400, msg: 'Error: Invalid data' })

    try {
      const { status, msg } = await userServices.userUpdatePassword({
        password,
        newPassword,
        newPasswordConfirmation,
        email
      })

      res.status(status).json({ status, msg })
    } catch ({ status, msg }) {
      res.status(status as number).json({ status, msg })
    }
  }
)

R.post(
  '/updateEmail/:email',
  async (req: Request, res: Response, next: NextFunction) => {
    const { newEmail, password } = req.body
    const { email } = req.params

    if (!newEmail || !password || !email)
      return res.status(400).json({ status: 400, msg: 'Error: Invalid data' })

    try {
      const { status, msg } = await userServices.userUpdateEmail({
        email,
        newEmail,
        password
      })

      res.status(status).json({ status, msg })
    } catch ({ status, msg }) {
      res.status(status as number).json({ status, msg })
    }
  }
)

export default R
