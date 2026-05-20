export class ApiError extends Error {
  status?: number;
  error?: string

  constructor(message: string, status?: number, error?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.error = error;
  }
}