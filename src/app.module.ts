import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user';
import { configModuleOption, typeormConfig } from 'src/config/';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './modules/post';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    UserModule,
    AuthModule,
    PostModule,
    ConfigModule.forRoot(configModuleOption),
  ],
  providers: [],
})
export class AppModule {}
