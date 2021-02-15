import { OmitType, PartialType } from '@nestjs/swagger';
import CreateUserDto from './create-user.dto';

export default class LoginUserDto extends PartialType(
  OmitType(CreateUserDto, ['name', 'email'] as const),
) {}
