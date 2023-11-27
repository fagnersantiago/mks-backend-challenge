import { UserRepository } from '../user.respository';
import { Repository } from 'typeorm';
import User from 'src/user/entities/user';
import { Injectable } from '@nestjs/common/decorators';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  private repository: Repository<User>;
  constructor() {}

  async create(data: CreateUserDto): Promise<User | null> {
    const userCreated = await this.repository.create({
      userName: data.userName,
      password: data.password,
    });

    await this.repository.save(userCreated);
    return userCreated;
  }

  async findByUserId(userId: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: { userId },
    });

    if (!user) {
      return null;
    }
    return user;
  }
  async findByUserName(userName: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: { userName },
    });

    if (!user) {
      return null;
    }
    return user;
  }
}
