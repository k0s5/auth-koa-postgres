import { IUser } from './user'
import type { JwtPayload } from 'jsonwebtoken'

export interface ISession {
  id: string
  token: string
  user: IUser
  expiresAt: Date
  createdAt: Date
  revokedAt: Date
}

export interface ITokenPayload extends JwtPayload {
  email: string
  userId: string
  username: string
}

export interface IAuthTokens {
  accessToken: string
  refreshToken: string
}

export interface ICreateSessionPayload {
  userId: string
  username: string
  email: string
}

export interface IDeleteSessionPayload {
  token: string
}

export interface IValidateRefreshTokenContext {
  tokenPayload: ITokenPayload
  refreshToken: string
}

export enum TokenType {
  'ACCESS' = 'access',
  'REFRESH' = 'refresh',
}
