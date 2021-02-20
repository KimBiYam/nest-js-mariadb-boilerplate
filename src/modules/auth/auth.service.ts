import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { User, UserService } from '../../modules/user';
import LoginPayloadDto from './dto/login-payload.dto';
import { JwtService } from '@nestjs/jwt';
import { HashUtil } from '../../util/hashUtil.ts';

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

  async validateUser(@Body() loginPayload: LoginPayloadDto): Promise<any> {
    const { userId, password } = loginPayload;
    const user = await this.userService.findOneByUserId(userId);
    if (!user || !HashUtil.compare(password, user.password)) {
      throw new BadRequestException('Bad Reqeust');
    }
    return user;
  }
}
