import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExists extends HttpException {
  constructor() {
    super(
      {
        error: {
          code: HttpStatus.CONFLICT,
          message: 'User Already Exists',
        },
      },
      HttpStatus.CONFLICT,
    );
  }
}
