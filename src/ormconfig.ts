import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormconfig: TypeOrmModuleOptions = {
  type: 'mariadb',
  host: process.env.MARIADB_HOST,
  port: Number(process.env.MARIADB_PORT),
  username: 'root',
  password: process.env.MARIADB_ROOT_PASSWORD,
  database: 'test',
  autoLoadEntities: true,
  synchronize: true,
  charset: 'utf8mb4',
};
