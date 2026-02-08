/** Standard API response shape (statusCode, data, message, success). */
export class ApiResponse<T = unknown> {
  readonly statusCode: number;
  readonly data: T | null;
  readonly message: string;
  readonly success: boolean;

  constructor(statusCode: number, data: T | null, message = 'Success') {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
  }
}
