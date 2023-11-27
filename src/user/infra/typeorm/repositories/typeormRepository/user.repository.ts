import { UserRepository } from '../user.respository';
import { Repository } from 'typeorm';
import User from 'src/user/entities/user';
import { Injectable } from '@nestjs/common/decorators';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  private repository: Repository<User>;
  constructor() {
    this.repository = data;
  }

  async create(data: CreateUserDto): Promise<User | null> {
    const userCreated = await this.repository.create({
      userName: data.userName,
      password: data.password,
    });

    await this.repository.save(userCreated);
    return userCreated;
  }

  async findByUserName(userName: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: {
        userName,
      },
    });

    if (!user) {
      return null;
    }
    return user as User;
  }

  async update({ userId, rule }: ChangeRoleUsersDto): Promise<User> {
    const updatedRole = await this.prisma.user.update({
      where: {
        userId: userId,
      },
      data: {
        rule: rule,
      },

      select: {
        userId: true,
        userName: true,
        rule: true,
      },
    });

    return updatedRole as User;
  }

  async findByUserId(userId: string): Promise<User | null> {
    const user = await this.prisma.user.findFirst({
      where: { userId: userId },
    });

    if (!user) {
      return null;
    }

    return user;
  }
  async isAdmin(userId: string): Promise<boolean> {
    const user = await this.prisma.user.findUnique({
      where: {
        userId,
      },
    });

    if (user.rule !== 'ADMIN') {
      return null;
    }
    return true;
  }

  async isValidPassword(password: string): Promise<boolean> {
    const hasQuantityCaracterAllowed = password.length;

    if (hasQuantityCaracterAllowed < 8 && hasQuantityCaracterAllowed > 64) {
      return false;
    }

    const isSecurePassword =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@#!$%])[A-Za-z\d@#!$%]*$/;

    if (!isSecurePassword.test(password)) return false;

    return true;
  }
}
