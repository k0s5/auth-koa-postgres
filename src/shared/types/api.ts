interface ApiResponseDetails {
  fields?: Record<
    string,
    {
      value: string
      errors: Record<string, unknown>[] // { message: 'Not valid email', rule: 'isEmail' }
    }
  >
}

export interface IApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
  details?: ApiResponseDetails
}

export interface IApiSuccessResponse<T> extends IApiResponse<T> {
  success: true
  data: T
}

export interface IApiErrorResponse<T> extends IApiResponse<T> {
  success: false
  error: string
  message: string
  details?: ApiResponseDetails
}
