export type TLoginResponse = {
  status?: number
  message?: string
  access_token?: string
}

export type TLoginRequest = {
  email: string
  password: string
}
