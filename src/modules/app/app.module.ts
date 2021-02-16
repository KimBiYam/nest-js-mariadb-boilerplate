import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ormconfig } from '../../config/ormconfig';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
