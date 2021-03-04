import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user';
import { APP_FILTER } from '@nestjs/core';
import { configModuleOption, ormModuleOptions } from 'src/config/';
import { ConfigModule } from '@nestjs/config';
import { CustomExceptionFilter } from 'src/filters/custom-exception.filter';
import { PostModule } from '../post';
import { AdminModule } from '@admin-bro/nestjs';
import { Connection } from 'typeorm';
import AdminBro from 'admin-bro';
import { Database, Resource } from '@admin-bro/typeorm';
import { validate } from 'class-validator';

Resource.validate = validate;
AdminBro.registerAdapter({ Database, Resource });

@Module({
  imports: [
    TypeOrmModule.forRoot(ormModuleOptions),
    UserModule,
    AuthModule,
    PostModule,
    ConfigModule.forRoot(configModuleOption),
    AdminModule.createAdminAsync({
      inject: [Connection],
      useFactory: (connection: Connection) => ({
        adminBroOptions: {
          rootPath: '/admin',
          databases: [connection],
        },
        auth: {
          authenticate: async (email, password) =>
            Promise.resolve({ email: 'test' }),
          cookieName: 'test',
          cookiePassword: 'testPass',
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: CustomExceptionFilter },
  ],
})
export class AppModule {}
