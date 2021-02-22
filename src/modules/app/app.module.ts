import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ormconfig } from '../../config/ormconfig';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user';
import { APP_FILTER } from '@nestjs/core';
import { CustomExceptionFilter } from 'src/config/custom-exception.filter';

@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), UserModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: CustomExceptionFilter },
  ],
})
export class AppModule {}
