import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, UserService } from '../user';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import LoginPayloadDto from './dto/login-payload.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authServcie: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginPayloadDto): Promise<any> {
    const user = await this.authServcie.validateUser(loginUserDto);
    return await this.authServcie.createToekn(user);
  }

  @Post('sign-up')
  async signUp(@Body() CreateUserDto: CreateUserDto): Promise<any> {
    return await this.userService.create(CreateUserDto);
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
