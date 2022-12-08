export interface user {
  id: number
  username: string
  email: string
  salt: Uint8Array
  verifier: Uint8Array
  verified: boolean
}

export interface userCreation {
  username: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface userCreate {
  username: string
  email: string
  password: string
}

export interface userLogin {
  username: string
  password: string
}

export interface userSendVerify {
  email: string
}

export interface userSetVerifyCode {
  email: string
  code: string
}

export interface forgotPassword {
  email: string
}

export interface dbForgotPassword {
  email: string
  password: string
}

export interface updateUserEmail {
  email: string
  newEmail: string
}

export interface updatePassword {
  password: string
  newPassword: string
  newPasswordConfirmation: string
  email: string
}

export interface dbUpdatePassword {
  newPassword : string
  email : string
}

export interface updateEmail {
  email : string
  newEmail: string
  password: string
}

export interface dbUpdateEmail {
  email : string
  newEmail : string
}