import { Injectable } from '@nestjs/common';
import { Session } from 'fastify-secure-session';
import { AuthService } from '../auth.service';

@Injectable()
export class SessionSerializer {
  constructor(private readonly authService: AuthService) {}

  serialize(user: string): Promise<string> {
    return Promise.resolve(user);
  }

  deserialize(userId: string): Promise<Session> {
    return this.authService.createSession(userId);
  }
}
