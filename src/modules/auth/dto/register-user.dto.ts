import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegsiterUserDto {
  @ApiProperty({ example: 'userId', description: '유저 ID', required: true })
  @IsString()
  userId: string;

  @ApiProperty({ example: 'name', description: '유저명', required: true })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'userId@gmail.com',
    description: '이메일',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345678', description: '비밀번호', required: true })
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  password: string;
}
