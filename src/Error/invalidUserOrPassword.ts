import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidUsernameOrPassword extends HttpException {
  constructor() {
    super(
      {
        error: {
          code: HttpStatus.UNAUTHORIZED,
          message: 'Invalid credentials username e/or email ',
        },
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
