import { UserRepository } from '../infra/typeorm/repositories/user.respository';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserAlreadyExists } from 'src/Error/user.already.exists.error';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private userRository: UserRepository) {}

  async execute({ userName, password }: CreateUserDto) {
    const userExists = await this.userRository.findByUserName(userName);

    if (userExists) {
      throw new UserAlreadyExists();
    }

    const passwordHash = await hash(password, 8);

    const user = await this.userRository.create({
      userName,
      password: passwordHash,
    });

    return user;
  }
}
