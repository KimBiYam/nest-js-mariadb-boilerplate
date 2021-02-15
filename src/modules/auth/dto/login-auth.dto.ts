import { OmitType, PartialType } from '@nestjs/swagger';
import CreateUserDto from '../../user/dto/create-user.dto';

export default class LoginAuthDto extends PartialType(
  OmitType(CreateUserDto, ['name', 'email'] as const),
) {}
