import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user';
import LoginAuthDto from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(loginUserDto: LoginAuthDto): Promise<any> {
    return true;
  }
}
