import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DatabaseModule } from '../infra/database/prisma/database.module';
import { ErrorInterceptor } from '../errors/interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ChangeRoleUsersController } from '../changeRoleUsers/update.role.users.controller';
import { ChangeRoleUsersService } from '../changeRoleUsers/update.role.users.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController, ChangeRoleUsersController],
  providers: [
    UsersService,
    ChangeRoleUsersService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
})
export class UsersModule {}
