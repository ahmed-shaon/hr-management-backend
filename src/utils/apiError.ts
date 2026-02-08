import type { ApiErrorDetail } from '../type';

/** Error class for API failures; statusCode and errors are sent to client. */
export class ApiError extends Error {
  readonly statusCode: number;
  /* eslint-disable @typescript-eslint/prefer-as-const -- literal types required for discriminant */
  readonly data: null = null;
  override readonly message: string;
  readonly success: false = false;
  /* eslint-enable @typescript-eslint/prefer-as-const */
  readonly errors: ApiErrorDetail[];

  constructor(
    statusCode: number,
    message = 'Something went wrong',
    errors: ApiErrorDetail[] = [],
    stack = ''
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }

    Object.setPrototypeOf(this, ApiError.prototype);
    this.name = 'ApiError';
  }
}
