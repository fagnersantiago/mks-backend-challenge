import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'nestjs-redis';
import { Session } from 'fastify-secure-session';
import { UserRepository } from '../infra/typeorm/repositories/user.respository';
import { SingDTO } from './dto/signDto';
import { InvalidUsernameOrPassword } from 'src/Error/invalidUserOrPassword';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly redisService: RedisService,
    private userService: UserRepository,
    private jwtService: JwtService,
  ) {}

  async createSession(userId: string): Promise<Session> {
    const client = this.redisService.getClient();
    const sessionId = `${userId}-${Date.now()}`;
    await client.set(sessionId, userId, 'EX', 60 * 60);
    return { sessionId };
  }

  async getUserIdFromSession(sessionId: string): Promise<string | null> {
    const client = this.redisService.getClient();
    const userId = await client.get(sessionId);
    return userId;
  }

  async validateUser(userName: string, password: string): Promise<any> {
    const user = await this.userService.findByUserName(userName);

    if (!user) {
      throw new InvalidUsernameOrPassword();
    }
    const isValidPassword = await compare(password, user.password);

    if (!isValidPassword) {
      throw new InvalidUsernameOrPassword();
    }

    return user;
  }
  async login(user: SingDTO) {
    const payload = {
      userId: user.userId,
      username: user.userName,
    };

    return {
      data: {
        user: {
          userId: user.userId,
          username: user.userName,
        },
        token: this.jwtService.sign(payload),
      },
    };
  }
}
