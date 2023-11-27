import { CreateUserDto } from 'src/user/dto/create-user.dto';
import User from 'src/user/entities/user';
import { UserRepository } from '../user.respository';

export class InMemoryUserRepository implements UserRepository {
  private userRepository: User[] = [];
  async findByUserId(userId: string): Promise<User | null> {
    const user = this.userRepository.find((find) => find.userId === userId);

    return user;
  }

  async findByUserName(userName: string): Promise<User | null> {
    const user = this.userRepository.find((find) => find.userName === userName);

    return user;
  }
  async create(data: CreateUserDto): Promise<User | null> {
    const user = new User();
    Object.assign(user, {
      userName: data.userName,
      password: data.userName,
    });

    this.userRepository.push(user);

    return user;
  }
}
