import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasource } from './database.service';

import { UsersModule } from 'src/user/create/users.module';
import { AuthModule } from 'src/user/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...datasource.options }),
    UsersModule,
    AuthModule,
  ],
  providers: [AuthModule],
})
export class DatabaseModule {}
