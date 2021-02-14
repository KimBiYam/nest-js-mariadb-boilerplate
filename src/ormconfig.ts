import { ConnectionOptions } from 'typeorm';
import { User } from './auth/user.entity';

export const ormconfig: ConnectionOptions = {
  type: 'mariadb',
  host: process.env.MARIADB_HOST,
  port: Number(process.env.MARIADB_PORT),
  username: 'root',
  password: process.env.MARIADB_ROOT_PASSWORD,
  database: 'test',
  entities: [User],
  synchronize: true,
};
