import userValidators from '../validators/user'
import {
  userCreation,
  userLogin,
  userSendVerify,
  userSetVerifyCode,
  forgotPassword,
  updateUserEmail,
  updatePassword,
  updateEmail
} from '../types/user'
import userDB from '../orm/user'
import { JsonResponse } from '../types/misc'
import { mail } from '../utils/mail'
import { codeGenerator } from '../utils/codeGenerator'

class userServices {
  constructor() {}

  public async userEmailExist(value: string): Promise<boolean> {
    const user = await userDB.findUserByKey('email', value)

    if (user.length === 0) return false

    return true
  }

  public async userUsernameExist(value: string): Promise<boolean> {
    const user = await userDB.findUserByKey('username', value)

    if (user.length === 0) return false

    return true
  }

  public async createUser({
    email,
    username,
    password,
    passwordConfirmation,
  }: userCreation): Promise<JsonResponse> {
    return new Promise(async (resolve, reject) => {
      const { status, msg } = await userValidators.validateUserCreation({
        email,
        username,
        password,
        passwordConfirmation,
      })
      if (status !== 200) return reject({ status, msg })

      try {
        await userDB.createUser({ email, username, password })
        resolve({ status: 200, msg: 'Success: User create' })
      } catch (error) {
        reject({ status: status, msg: msg })
      }
    })
  }

  public async loginUser({
    username,
    password,
  }: userLogin): Promise<JsonResponse> {
    return new Promise(async (resolve, reject) => {
      const { status, msg } = await userValidators.validateUserLogin({
        username,
        password,
      })

      if (status !== 200) return reject({ status, msg })

      return resolve({ status, msg })
    })
  }

  public async sendVerifyCodeUser({
    email,
  }: userSendVerify): Promise<JsonResponse> {
    return new Promise(async (resolve, reject) => {
      const { status, msg } = await userValidators.validateUserSendVerifyCode({
        email,
      })

      if (status !== 200) return reject({ status, msg })

      try {
        const code = await codeGenerator(6)
        mail(email, 'Code de vérification', code)
        await userDB.codeVerifyUser({ email, code })
        resolve({ status, msg })
      } catch (error) {
        reject({ status: status, msg: msg })
      }
    })
  }

  public async sendVerifyUpdateCodeUser({
    email,
  }: userSendVerify): Promise<JsonResponse> {
    return new Promise(async (resolve, reject) => {
      const { status, msg } = await userValidators.validateUserSendVerifyUpdateCode({
        email,
      })

      if (status !== 200) return reject({ status, msg })

      try {
        const code = await codeGenerator(6)
        mail(email, 'Code de vérification', code)
        await userDB.codeVerifyUser({ email, code })
        resolve({ status, msg })
      } catch (error) {
        reject({ status: status, msg: msg })
      }
    })
  }

  public async userEmailVerify({
    email,
    code,
  }: userSetVerifyCode): Promise<JsonResponse> {
    return new Promise(async (resolve, reject) => {
      const { status, msg } = await userValidators.validateUserVerify({
        email,
        code,
      })

      if (status !== 200) return reject({ status, msg })

      try {
        await userDB.codeVerify({ email, code })
        resolve({ status, msg })
      } catch (error) {
        reject({ status: status, msg: msg })
      }
    })
  }

  public async userEmailUpdateVerify({
    email,
    code,
  }: userSetVerifyCode): Promise<JsonResponse> {
    return new Promise(async (resolve, reject) => {
      const { status, msg } = await userValidators.validateUserUpdateVerify({
        email,
        code,
      })

      if (status !== 200) return reject({ status, msg })

      try {
        await userDB.codeVerifyUpdate({ email, code })
        resolve({ status, msg })
      } catch (error) {
        reject({ status: status, msg: msg })
      }
    })
  }

  public async userForgotPassword({
    email,
  }: forgotPassword): Promise<JsonResponse> {
    return new Promise(async (resolve, reject) => {
      const { status, msg } = await userValidators.validateUserForgotPassword({
        email,
      })

      if (status !== 200) return reject({ status, msg })

      try {
        const password = await codeGenerator(10)
        mail(email, 'Nouveau mot de passe', password)
        await userDB.forgotPassword({ email, password })
        resolve({ status, msg })
      } catch (error) {
        reject({ status: status, msg: msg })
      }
    })
  }

  public async userUpdatePassword({
    password,
    newPassword,
    newPasswordConfirmation,
    email
  }: updatePassword): Promise<JsonResponse> {
    return new Promise(async (resolve, reject) => {
      const { status, msg } = await userValidators.validateUserUpdatePassword({
        password,
        newPassword,
        newPasswordConfirmation,
        email
      })

      if (status !== 200) return reject({ status, msg })

      try {
        mail(email, 'Votre mot de passe à été modifié !', 'Votre mot de passe à été modifié !')
        await userDB.updatePassword({ email, newPassword })
        resolve({ status, msg })
      } catch (error) {
        reject({ status: status, msg: msg })
      }
    })
  }

  public async userUpdateEmail({
    email,
    newEmail,
    password
  }: updateEmail): Promise<JsonResponse> {
    return new Promise(async (resolve, reject) => {
      const { status, msg } = await userValidators.validateUserUpdateEmail({
        email,
        newEmail,
        password
      })

      if (status !== 200) return reject({ status, msg })

      try {
        mail(email, 'Votre adresse email à été modifié !', `Voici la nouvelle adresse email lié à votre compte : ${newEmail}`)
        await userDB.updateEmail({ email, newEmail })
        resolve({ status, msg })
      } catch (error) {
        reject({ status: status, msg: msg })
      }
    })
  }
}

export default new userServices()
