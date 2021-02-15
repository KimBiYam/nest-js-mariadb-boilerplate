import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
}
