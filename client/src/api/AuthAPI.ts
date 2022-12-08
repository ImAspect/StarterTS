import { JsonResponse } from '../types/misc'
import API from './API'

class AuthAPI extends API {
  constructor() {
    super()
  }

  public checkToken({
    signal,
  }: {
    signal: AbortSignal
  }): Promise<JsonResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await super.get({
          url: 'http://localhost:4000/api/auth/checkToken',
          signal,
        })

        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }

  public login({
    username,
    password,
  }: {
    username: string
    password: string
  }): Promise<JsonResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await super.post({
          url: 'http://localhost:4000/api/user/login',
          data: { username, password },
        })

        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }

  public register({
    username,
    email,
    password,
    passwordConfirmation,
  }: {
    username: string
    email: string
    password: string
    passwordConfirmation: string
  }): Promise<JsonResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await super.post({
          url: 'http://localhost:4000/api/user/create',
          data: { username, email, password, passwordConfirmation }
        })

        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }

  public logout({}: {}): Promise<JsonResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await super.get({
          url: 'http://localhost:4000/api/user/logout'
        })

        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }

  public forgot({
    email
  }:{
    email : string
  }): Promise<JsonResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await super.get({
          url: 'http://localhost:4000/api/user/forgot/' + email
        })

        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }

  public sendVerify({
    email
  }:{
    email : string
  }): Promise<JsonResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await super.get({
          url: 'http://localhost:4000/api/user/sendVerify/' + email
        })

        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }

  public sendVerifyUpdate({
    email
  }:{
    email : string
  }): Promise<JsonResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await super.get({
          url: 'http://localhost:4000/api/user/sendVerifyUpdate/' + email
        })

        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }

  public verify({
    email,
    code
  }:{
    email : string,
    code : string
  }): Promise<JsonResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await super.post({
          url: 'http://localhost:4000/api/user/verify/' + email,
          data: { code }
        })

        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }

  public verifyUpdate({
    email,
    code
  }:{
    email : string,
    code : string
  }): Promise<JsonResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await super.post({
          url: 'http://localhost:4000/api/user/verifyUpdate/' + email,
          data: { code }
        })

        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }

  public updatePassword({
    password,
    newPassword,
    newPasswordConfirmation,
    email
  }:{
    password : string,
    newPassword : string,
    newPasswordConfirmation : string,
    email : string
  }): Promise<JsonResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await super.post({
          url: 'http://localhost:4000/api/user/updatePassword/' + email,
          data: { password, newPassword, newPasswordConfirmation, email }
        })

        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }

  public updateEmail({
    email,
    newEmail,
    password
  }:{
    email: string,
    newEmail: string,
    password: string
  }): Promise<JsonResponse>{
    return new Promise(async (resolve, reject) => {
      try {
        const res = await super.post({
          url: 'http://localhost:4000/api/user/updateEmail/' + email,
          data: { email, newEmail, password }
        })

        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default new AuthAPI()
