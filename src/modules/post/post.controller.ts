import { Controller, Get, Post, Logger, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';

@Controller('posts')
@ApiTags('Post')
@ApiResponse({ status: 400, description: '잘못된 요청' })
@ApiResponse({ status: 500, description: '서버 에러' })
export class PostController {
  constructor(private readonly PostService: PostService) {}
  private logger = new Logger('Post');

  @Get()
  async getPosts(): Promise<PostEntity[]> {
    return await this.PostService.findAll();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createPost(): Promise<any> {
    return await this.PostService.findAll();
  }
}
