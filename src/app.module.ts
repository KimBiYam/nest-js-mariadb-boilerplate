import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user';
import { APP_FILTER } from '@nestjs/core';
import { configModuleOption, ormModuleOptions } from 'src/config/';
import { ConfigModule } from '@nestjs/config';
import { CustomExceptionFilter } from 'src/filters/custom-exception.filter';
import { PostModule } from './modules/post';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormModuleOptions),
    UserModule,
    AuthModule,
    PostModule,
    ConfigModule.forRoot(configModuleOption),
  ],
  providers: [{ provide: APP_FILTER, useClass: CustomExceptionFilter }],
})
export class AppModule {}
