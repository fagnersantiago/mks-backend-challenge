import { CreateUserDto } from 'src/users/dto/create-user.dto';
import User from 'src/user/entities/user';
import { UserRepository } from 'src/users/infra/database/prisma/repositories/user.respository';
import { ChangeRoleUsersDto } from 'src/users/dto/change-role.users.dto';

export class InMemoryUserRepository implements UserRepository {
  private userRepository: User[] = [];
  async findByUserId(userId: string): Promise<User | null> {

    const user = this.userRepository.find((find) => find.userId === userId);

    return user;
  }

  async create(data: CreateUserDto): Promise<User | null> {
    const user = new User({
      userName: data.userName,
      password: data.password,
    });

    this.userRepository.push(user);

    return user;
  }

