import { OmitType } from '@nestjs/swagger';
import { RegsiterUserDto } from './register-user.dto';

export class UpdateUserDto extends OmitType(RegsiterUserDto, [
  'userId',
] as const) {}
