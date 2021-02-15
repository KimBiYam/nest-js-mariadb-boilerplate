import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
}
