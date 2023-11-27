/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersModule } from './user/create/users.module';
import { ConfigModule } from '@nestjs/config';
//import { ErrorInterceptor } from './users/errors/interceptor';
//import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from './user/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
  ],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: ErrorInterceptor,
    // },
  ],
})
export class AppModule {}
