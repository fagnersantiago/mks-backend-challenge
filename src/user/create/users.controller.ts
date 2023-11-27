import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dto/create-user.dto';
//import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/create')
  async handle(@Body() body: CreateUserDto) {
    const { userName, password } = body;

    const createUser = await this.usersService.execute({
      userName,
      password,
    });

    return {
      data: {
        userId: createUser.userId,
        userName: createUser.userName,
      },
    };
  }
}
