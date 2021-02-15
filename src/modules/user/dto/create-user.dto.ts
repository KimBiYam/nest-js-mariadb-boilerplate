import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class CreateUserDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
