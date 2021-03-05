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

@Module({
  imports: [
    TypeOrmModule.forRoot(ormModuleOptions),
    UserModule,
    AuthModule,
    ConfigModule.forRoot(configModuleOption),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: CustomExceptionFilter },
  ],
})
export class AppModule {}
