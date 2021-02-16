import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import LoginAuthDto from './dto/login-auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authServcie: AuthService) {}

  @Post()
  async validateUser(@Body() loginUserDto: LoginAuthDto) {
    await this.authServcie.validateUser(loginUserDto);
    return true;
  }
}
