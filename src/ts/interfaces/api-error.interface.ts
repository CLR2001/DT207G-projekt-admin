export interface ApiError {
  error: string,
  message: string,
  details?: { [key: string]: string }
}

export interface ApiErrorCause extends ApiError {
  status: number
}