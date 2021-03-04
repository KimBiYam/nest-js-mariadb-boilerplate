import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user';
import { APP_FILTER } from '@nestjs/core';
import {
  CustomExceptionFilter,
  configModuleOption,
  ormModuleOptions,
} from 'src/config/';
import { ConfigModule } from '@nestjs/config';
import loggerMiddleware from 'src/middlewares/logger.middleware';

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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(loggerMiddleware).forRoutes('*');
  }
}
