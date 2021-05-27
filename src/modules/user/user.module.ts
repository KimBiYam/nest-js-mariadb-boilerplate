import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/models/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
