import { user } from '../types/user'
import {
  userCreate,
  userSetVerifyCode,
  dbForgotPassword,
  dbUpdatePassword,
  dbUpdateEmail } from '../types/user'
import DB from '../db/db'
import { createVerifier } from '../utils/SRP6'
import crypto from 'crypto'

class userDB {
  constructor() { }

  public findUserByKey(key: keyof user, value: any): Promise<Array<user | []>> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await DB.exec(`SELECT * FROM users WHERE (${key}) = ?`, [
          value,
        ])

        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }

  public createUser({
    email,
    username,
    password,
  }: userCreate): Promise<Array<user | []>> {
    return new Promise(async (resolve, reject) => {
      try {
        const salt = crypto.randomBytes(32)
        const verifier = await createVerifier(username, password, salt)
        const res = await DB.exec(
          `INSERT INTO users (email, username, salt, verifier) VALUES (?, ?, ?, ?)`,
          [email, username.toLocaleUpperCase(), salt, verifier]
        )
        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }

  public codeVerifyUser({
    email,
    code,
  }: userSetVerifyCode): Promise<Array<user | []>> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await DB.exec(`UPDATE users SET code = ? WHERE email = ?`, [
          code,
          email,
        ])

        resolve(res)

        setTimeout(async () => {
          await DB.exec(`UPDATE users SET code = ? WHERE email = ?`, [
            null,
            email,
          ])
        }, 240000)
      } catch (error) {
        reject(error)
      }
    })
  }

  public codeVerify({
    email,
    code,
  }: userSetVerifyCode): Promise<Array<user | []>> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await DB.exec(
          `UPDATE users SET verified = ?, code = ? WHERE email = ?`,
          [1, null, email]
        )

        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }

  public codeVerifyUpdate({
    email
  }: userSetVerifyCode): Promise<Array<user | []>> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await DB.exec(
          `UPDATE users SET code = ? WHERE email = ?`,
          [1, null, email]
        )

        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }

  public forgotPassword({
    email,
    password,
  }: dbForgotPassword): Promise<Array<user | []>> {
    return new Promise(async (resolve, reject) => {
      try {
        const userData = await this.findUserByKey('email', email)
        // @ts-ignore
        const verifier = await createVerifier(
          // @ts-ignore
          userData[0].username,
          password,
          // @ts-ignore
          userData[0].salt
        )
        const res = await DB.exec(
          `UPDATE users SET verifier = ? WHERE email = ?`,
          [verifier, email]
        )

        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }

  public updatePassword({
    newPassword,
    email
  }: dbUpdatePassword): Promise<Array<user | []>> {
    return new Promise(async (resolve, reject) => {
      try {
        const userData = await this.findUserByKey('email', email)
        // @ts-ignore
        const verifier = await createVerifier(
          // @ts-ignore
          userData[0].username,
          newPassword,
          // @ts-ignore
          userData[0].salt
        )
        const res = await DB.exec(
          `UPDATE users SET verifier = ? WHERE email = ?`,
          [verifier, email]
        )

        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }

  public updateEmail({
    email,
    newEmail
  }: dbUpdateEmail): Promise<Array<user | []>> {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await DB.exec(
          `UPDATE users SET email = ?, verified = ? WHERE email = ?`,
          [newEmail, 0, email]
        )

        resolve(res)
      } catch (error) {
        reject(error)
      }
    })
  }
}

export default new userDB()
