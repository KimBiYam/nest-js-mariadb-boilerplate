import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from '../user';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegsiterUserDto } from './dto/register-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authServcie: AuthService,
    private readonly userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginUserDto: LoginDto): Promise<any> {
    const user = await this.authServcie.validateUser(loginUserDto);
    return await this.authServcie.createToekn(user);
  }

  @Post('sign-up')
  async signUp(@Body() registerPayloadDto: RegsiterUserDto): Promise<any> {
    return await this.userService.create(registerPayloadDto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() request: any): Promise<any> {
    const { userId } = request.user;
    const user = await this.userService.findOneByUserId(userId);
    delete user.password;
    return user;
  }
}
