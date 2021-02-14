import { OmitType, PartialType } from '@nestjs/swagger';
import CreateUserDto from './create-user.dto';

export default class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['userId'] as const),
) {}
