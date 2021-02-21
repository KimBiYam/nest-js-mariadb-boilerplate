import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegsiterUserDto {
  @ApiProperty({ example: 'userId' })
  @IsString()
  userId: string;

  @ApiProperty({ example: 'name' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'userId@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678' })
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password: string;
}
