export interface Credential {
  username: string
  password: string
}

interface Token {
  value: string
  expiredAt: string
}

export interface AuthResult {
  accessToken: Token
  refreshToken: Token
}
