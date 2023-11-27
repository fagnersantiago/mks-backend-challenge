import { CreateUserDto } from 'src/user/dto/create-user.dto';
import User from 'src/user/entities/user';

export abstract class UserRepository {
  abstract create(data: CreateUserDto): Promise<User | null>;
  abstract findByUserId(userId: string): Promise<User | null>;
}
