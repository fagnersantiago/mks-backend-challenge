import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import User from 'src/user/entities/user';
import { config } from 'dotenv';
config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: Number(process.env.PORT),
  username: 'postgres',
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [User],
  synchronize: true,
};
