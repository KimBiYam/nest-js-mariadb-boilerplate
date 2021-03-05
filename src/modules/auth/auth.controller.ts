import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from '../user';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegsiterUserDto } from './dto/register-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RequestUser } from '../../decorators/user.decorator';

@ApiTags('Auth')
@Controller('auth')
@ApiResponse({ status: 400, description: '잘못된 요청' })
@ApiResponse({ status: 500, description: '서버 에러' })
export class AuthController {
  constructor(
    private readonly authServcie: AuthService,
    private readonly userService: UserService,
  ) {}
  private logger = new Logger('Auth');

  @Post('login')
  @ApiOperation({ summary: '로그인' })
  @ApiResponse({ status: 201, description: '로그인 성공' })
  async login(@Body() loginDto: LoginDto): Promise<any> {
    const user = await this.authServcie.validateUser(loginDto);
    return await this.authServcie.createToekn(user);
  }

  @Post('sign-up')
  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({ status: 201, description: '회원가입 성공' })
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
  @ApiResponse({ status: 200, description: '프로필 조회 성공' })
  @UseGuards(JwtAuthGuard)
  async getProfile(@RequestUser() requestUser: any): Promise<any> {
    const { userId } = requestUser;
    this.logger.debug(requestUser);
    const user = await this.userService.findOneByUserId(userId);
    if (!user) {
      this.logger.error('This user not exist');
      throw new NotFoundException('This user not exist');
    }
    delete user.password;
    return user;
  }
}
