import type { IApiResponse } from './api'
import { IUser } from './user'
import { ISession, IAuthTokens } from './session'

/*#region REQUESTS*/
export interface ISignUpPayload {
  email: string
  password: string
  terms: boolean
}

export interface ISignInPayload extends Omit<ISignUpPayload, 'terms'> {}

export interface IRefreshPayload {
  refreshToken: string
}

export interface ISignOutPayload {}
/*#region REQUESTS*/

/*#region RESPONSES*/
export interface ISignUpResponse
  extends IApiResponse<Omit<IUser, 'passwordHash'> & IAuthTokens> {}

export interface ISignInResponse<T>
  extends IApiResponse<Omit<IUser, 'passwordHash'> & IAuthTokens> {}

export interface IRefreshResponse<T> extends IApiResponse<IAuthTokens> {}

export interface ISignOutResponse<T> extends IApiResponse<T> {}
/*#endregion RESPONSES*/
