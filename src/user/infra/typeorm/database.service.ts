import { DataSource, DataSourceOptions } from 'typeorm';
import User from 'src/user/entities/user';
import { User1701114241690 } from '../typeorm/migration/1701114241690-User';

import { config } from 'dotenv';
config();

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_HOST),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
  migrations: [User1701114241690],
  entities: [User],
};

export const datasource = new DataSource(options);
