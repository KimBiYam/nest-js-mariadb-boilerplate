import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from '../../user';

export default class RegisterPayloadDto extends PartialType(CreateUserDto) {}
