import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '../../user';

export default class LoginPayloadDto extends PartialType(
  OmitType(CreateUserDto, ['name', 'email'] as const),
) {}
