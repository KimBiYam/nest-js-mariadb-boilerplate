import { Module } from '@nestjs/common';
import { UserModule } from 'src/user';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule],
  providers: [AuthService],
})
export class AuthModule {}
