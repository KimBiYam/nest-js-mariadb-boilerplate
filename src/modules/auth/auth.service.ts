import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../../modules/user';
import { JwtService } from '@nestjs/jwt';
import { HashUtil } from '../../util/hash-util';
import { LoginDto } from './dto/login.dto';
import { User } from '../../entities';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createToken(user: User) {
    return {
      accessToken: this.jwtService.sign({ id: user.userId }),
      user,
    };
  }

  async login(loginDto: LoginDto) {
    const { userId, password } = loginDto;
    const user = await this.userService.findOneByUserId(userId);

    if (this.validateUser(password, user.password)) {
      return user;
    }
  }

  async validateUser(password: string, userPassword: string) {
    if (!HashUtil.compare(password, userPassword)) {
      throw new BadRequestException('Password not match');
    }

    return true;
  }
}
