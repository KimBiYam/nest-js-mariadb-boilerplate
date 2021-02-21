import { PickType } from '@nestjs/swagger';
import { RegsiterUserDto } from './register-user.dto';

export class LoginDto extends PickType(RegsiterUserDto, [
  'userId',
  'password',
] as const) {}
