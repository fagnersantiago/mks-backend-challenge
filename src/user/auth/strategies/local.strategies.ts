import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserNotFound } from 'src/users/errors/user-not-found';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'userName',
    });
  }

  async validate(userName: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(userName, password);

    if (!user) {
      throw new UserNotFound();
    }

    return user;
  }
}
