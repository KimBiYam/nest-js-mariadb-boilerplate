import { PickType } from '@nestjs/swagger';
import { User } from '../../../entities';

export class RequestUserDto extends PickType(User, ['userId', 'name']) {}
