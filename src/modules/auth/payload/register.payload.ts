import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/user';

export default class RegisterPayload extends PartialType(CreateUserDto) {}
