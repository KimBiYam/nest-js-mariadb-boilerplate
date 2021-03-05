import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  NotFoundException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
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
  private logger = new Logger('Auth');

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: '로그인' })
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const user = await this.authServcie.validateUser(loginDto);
    return await this.authServcie.createToekn(user);
  }

  @Post('sign-up')
  @ApiOperation({ summary: '회원가입' })
  async signUp(@Body() registerPayloadDto: RegsiterUserDto): Promise<any> {
    const { userId } = registerPayloadDto;
    const user = await this.userService.findOneByUserId(userId);
    if (user) {
      this.logger.error('Is exist user id');
      throw new BadRequestException('Is exist user id');
    }
    return await this.userService.create(registerPayloadDto);
  }

  @Get('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: '본인의 프로필 조회' })
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() request: any): Promise<any> {
    const { userId } = request.user;
    const user = await this.userService.findOneByUserId(userId);
    if (!user) {
      this.logger.error('This user not exist');
      throw new NotFoundException('This user not exist');
    }
    delete user.password;
    return user;
  }
}
