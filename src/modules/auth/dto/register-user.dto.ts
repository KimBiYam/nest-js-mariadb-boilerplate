import { PickType } from '@nestjs/swagger';
import { User } from '../../../entities';

export class RegsiterUserDto extends PickType(User, [
  'userId',
  'password',
  'email',
  'name',
]) {}
