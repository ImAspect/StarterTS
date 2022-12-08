import {
  userCreation,
  userLogin,
  userSendVerify,
  userSetVerifyCode,
  forgotPassword,
  updatePassword,
  updateEmail
} from '../types/user'
import { JsonResponse } from '../types/misc'
import userServices from '../services/user'
import userDB from '../orm/user'
import { createVerifier } from '../utils/SRP6'

class userValidators {
  constructor() { }

  public async validateUserCreation({
    username,
    email,
    password,
    passwordConfirmation,
  }: userCreation): Promise<JsonResponse> {
    const emailExist = await userServices.userEmailExist(email)
    const usernameExist = await userServices.userUsernameExist(username)

    if (!email || !username || !password || !passwordConfirmation)
      return {
        status: 400,
        msg: 'Error : Invalid data',
      }

    if (emailExist)
      return {
        status: 401,
        msg: 'Error : Email already exist',
      }

    if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    )
      return {
        status: 402,
        msg: 'Error : Email format is invalid',
      }

    if (usernameExist)
      return {
        status: 403,
        msg: 'Error : Username already exist',
      }

    if (!username.match('^[a-z0-9A-Z]{3,16}$'))
      return {
        status: 404,
        msg: 'Error: Username format is Invalid',
      }

    if (username.length <= 5)
      return {
        status: 405,
        msg: 'Error: Username to short',
      }

    if (password.length < 8 || password.length > 16)
      return {
        status: 406,
        msg: 'Error: Password require 8 min or 16 max characters !',
      }

    if (password != passwordConfirmation)
      return {
        status: 407,
        msg: 'Error: Invalid password confirmation',
      }

    return {
      status: 200,
      msg: 'Success: User create',
    }
  }

  public async validateUserLogin({
    username,
    password,
  }: userLogin): Promise<JsonResponse> {
    const usernameExist = await userServices.userUsernameExist(username)

    if (!username || !password)
      return {
        status: 400,
        msg: 'Error: Invalid data',
      }

    if (!usernameExist)
      return {
        status: 401,
        msg: 'Error: Username not exist',
      }

    const userData = await userDB.findUserByKey('username', username)
    // @ts-ignore
    const verifierTest = await createVerifier(
      username,
      password,
      // @ts-ignore
      userData[0].salt
    )
    // @ts-ignore
    if (JSON.stringify(userData[0].verifier) !== JSON.stringify(verifierTest))
      return {
        status: 402,
        msg: 'Error: Bad password',
      }

    return {
      status: 200,
      msg: 'Success: User login',
    }
  }

  public async validateUserSendVerifyCode({
    email,
  }: userSendVerify): Promise<JsonResponse> {
    const emailExist = await userServices.userEmailExist(email)
    const userData = await userDB.findUserByKey('email', email)

    if (!email)
      return {
        status: 400,
        msg: 'Error: Invalid data',
      }

    if (!emailExist)
      return {
        status: 401,
        msg: 'Error: Email not exist',
      }

    // @ts-ignore
    if (userData[0].verified === 1)
      return {
        status: 402,
        msg: 'Error: User email already verified',
      }

    return {
      status: 200,
      msg: 'Success: Verify code send to email',
    }
  }

  public async validateUserSendVerifyUpdateCode({
    email,
  }: userSendVerify): Promise<JsonResponse> {
    const emailExist = await userServices.userEmailExist(email)
    const userData = await userDB.findUserByKey('email', email)

    if (!email)
      return {
        status: 400,
        msg: 'Error: Invalid data',
      }

    if (!emailExist)
      return {
        status: 401,
        msg: 'Error: Email not exist',
      }

    return {
      status: 200,
      msg: 'Success: Verify code send to email',
    }
  }

  public async validateUserVerify({
    email,
    code,
  }: userSetVerifyCode): Promise<JsonResponse> {
    const emailExist = await userServices.userEmailExist(email)
    const userData = await userDB.findUserByKey('email', email)

    if (!email || !code)
      return {
        status: 400,
        msg: 'Error: Invalid data',
      }

    if (!emailExist)
      return {
        status: 401,
        msg: 'Error: Email not exist',
      }

    // @ts-ignore
    if (userData[0].code === null)
      return {
        status: 402,
        msg: 'Error: Code time exceed',
      }

    // @ts-ignore
    if (JSON.stringify(userData[0].code) !== JSON.stringify(code))
      return {
        status: 403,
        msg: 'Error: Bad code',
      }

    return {
      status: 200,
      msg: 'Success: User email verified',
    }
  }

  public async validateUserUpdateVerify({
    email,
    code,
  }: userSetVerifyCode): Promise<JsonResponse> {
    const emailExist = await userServices.userEmailExist(email)
    const userData = await userDB.findUserByKey('email', email)

    if (!email || !code)
      return {
        status: 400,
        msg: 'Error: Invalid data',
      }

    if (!emailExist)
      return {
        status: 401,
        msg: 'Error: Email not exist',
      }

    // @ts-ignore
    if (userData[0].code === null)
      return {
        status: 402,
        msg: 'Error: Code time exceed',
      }

    // @ts-ignore
    if (JSON.stringify(userData[0].code) !== JSON.stringify(code))
      return {
        status: 403,
        msg: 'Error: Bad code',
      }

    return {
      status: 200,
      msg: 'Success: Great code',
    }
  }

  public async validateUserForgotPassword({
    email,
  }: forgotPassword): Promise<JsonResponse> {
    const emailExist = await userServices.userEmailExist(email)
    const userData = await userDB.findUserByKey('email', email)

    if (!email)
      return {
        status: 400,
        msg: 'Error: Invalid data',
      }

    if (!emailExist)
      return {
        status: 401,
        msg: 'Error: Email not exist',
      }

    // @ts-ignore
    if (userData[0].verified === 0)
      return {
        status: 402,
        msg: 'Error: User not verified',
      }

    return {
      status: 200,
      msg: 'Success: User new password send',
    }
  }

  public async validateUserUpdatePassword({
    password,
    newPassword,
    newPasswordConfirmation,
    email
  }: updatePassword): Promise<JsonResponse> {
    const emailExist = await userServices.userEmailExist(email)
    const userData = await userDB.findUserByKey('email', email)

    if (!password || !newPassword || !newPasswordConfirmation || !email)
      return {
        status: 400,
        msg: 'Error: Invalid data',
      }

    if (!emailExist)
      return {
        status: 401,
        msg: 'Error: Email not exist',
      }

    // @ts-ignore
    if (userData[0].verified === 0)
      return {
        status: 402,
        msg: 'Error: User not verified',
      }

    const newVerifier = await createVerifier(
      // @ts-ignore
      userData[0].username,
      password,
      // @ts-ignore
      userData[0].salt
    )

    // @ts-ignore
    if (JSON.stringify(userData[0].verifier) !== JSON.stringify(newVerifier))
      return {
        status: 403,
        msg: 'Error: Bad password',
      }

    if (newPassword.length < 8 || newPassword.length > 16)
      return {
        status: 404,
        msg: 'Error: Password require 8 min or 16 max characters !',
      }

    if (newPassword != newPasswordConfirmation)
      return {
        status: 405,
        msg: 'Error: Invalid password confirmation',
      }

    return {
      status: 200,
      msg: 'Success: User password updated',
    }
  }

  public async validateUserUpdateEmail({
    email,
    newEmail,
    password
  }: updateEmail): Promise<JsonResponse> {
    const emailExist = await userServices.userEmailExist(email)
    const newEmailExist = await userServices.userEmailExist(newEmail)
    const userData = await userDB.findUserByKey('email', email)

    if (!email || !newEmail || !password)
      return {
        status: 400,
        msg: 'Error: Invalid data'
      }

    if (!emailExist)
      return {
        status: 401,
        msg: 'Error: Email not exist'
      }

    if (newEmailExist)
      return {
        status: 402,
        msg: 'Error: New email already exist'
      }

    // @ts-ignore
    if (userData[0].verified === 0)
      return {
        status: 403,
        msg: 'Error: User not verified'
      }

    const newVerifier = await createVerifier(
      // @ts-ignore
      userData[0].username,
      password,
      // @ts-ignore
      userData[0].salt
    )

    // @ts-ignore
    if (JSON.stringify(userData[0].verifier) !== JSON.stringify(newVerifier))
      return {
        status: 404,
        msg: 'Error: Bad password',
      }

      if (
        !newEmail.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
      )
        return {
          status: 405,
          msg: 'Error : Email format is invalid',
        }

    return {
      status: 200,
      msg: 'Success: User email updated',
    }
  }
}

export default new userValidators()
