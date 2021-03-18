import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ example: '제목', description: '게시글 제목', required: true })
  @IsString()
  title: string;

  @ApiProperty({ example: '내용', description: '게시글 내용', required: true })
  @IsString()
  content: string;
}
