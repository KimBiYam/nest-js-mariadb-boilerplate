import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user';
import { configModuleOption, typeormConfig } from 'src/config/';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './modules/post';
import { APP_FILTER } from '@nestjs/core';
import { OrmExceptionFilter } from './filters/orm-exception-filter';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    UserModule,
    AuthModule,
    PostModule,
    ConfigModule.forRoot(configModuleOption),
  ],
  providers: [{ provide: APP_FILTER, useClass: OrmExceptionFilter }],
})
export class AppModule {}
