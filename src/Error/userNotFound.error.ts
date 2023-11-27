import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFound extends HttpException {
  constructor() {
    super(
      {
        error: {
          code: HttpStatus.NOT_FOUND,
          message: 'User not found',
        },
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
