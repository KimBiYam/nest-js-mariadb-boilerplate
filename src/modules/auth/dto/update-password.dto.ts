import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdatePasswordDto {
  @ApiProperty({
    example: '12345678',
    description: '이전 비밀번호',
    required: true,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  previousPassword: string;

  @ApiProperty({
    example: '12345678',
    description: '새로운 비밀번호',
    required: true,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  newPassword: string;
}
