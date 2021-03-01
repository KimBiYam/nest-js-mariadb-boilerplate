import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { User, UserService } from '../../modules/user';
import { JwtService } from '@nestjs/jwt';
import { HashUtil } from '../../util/hashUtil.ts';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createToekn(user: User) {
    return {
      accessToken: this.jwtService.sign({ id: user.userId }),
      user,
    };
  }

  async validateUser(@Body() loginDto: LoginDto): Promise<any> {
    const { userId, password } = loginDto;
    const user = await this.userService.findOneByUserId(userId);
    if (!user || !HashUtil.compare(password, user.password)) {
      throw new BadRequestException('Bad Reqeust');
    }
    return user;
  }
}
