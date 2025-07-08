export class ApiError /* extends Error  */ {
  success: boolean = false
  statusCode: number
  error: string
  message: string

  constructor(statusCode: number, error: string, message: string) {
    // super(message)
    this.statusCode = statusCode
    this.error = error
    this.message = message
  }

  static UnauthorizedError(message: string) {
    return new ApiError(401, 'User is unauthorized', message)
  }

  static BadCredentials(message: string) {
    return new ApiError(422, 'Bad Credentials', message)
  }

  static BadRequest(message: string) {
    return new ApiError(400, 'Bad Request', message)
  }

  static Conflict(message: string) {
    return new ApiError(409, 'Conflict', message)
  }

  static Forbidden(message: string) {
    return new ApiError(403, 'Forbidden', message)
  }

  static ValidationError(message: string) {
    return new ApiError(444, 'Validation Error', message)
  }

  static NotFound(message: string) {
    return new ApiError(404, 'Not Found Error', message)
  }

  static CustomError(message: string) {
    return new ApiError(400, 'Custom Error', message)
  }
}

export default ApiError
