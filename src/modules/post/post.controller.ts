import {
  Controller,
  Get,
  Post,
  Logger,
  UseGuards,
  NotFoundException,
  Body,
  Param,
  ParseIntPipe,
  Put,
  BadRequestException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestUser } from 'src/decorators/user.decorator';
import { InsertResult, UpdateResult } from 'typeorm';
import { JwtAuthGuard } from '../auth';
import { UserService } from '../user';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';

@Controller('posts')
@ApiTags('Post')
@ApiResponse({ status: 400, description: '잘못된 요청' })
@ApiResponse({ status: 500, description: '서버 에러' })
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}
  private logger = new Logger('Post');

  @Get()
  async getPosts(): Promise<PostEntity[]> {
    return await this.postService.findAll();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createPost(
    @RequestUser() requestUser: RequestUser,
    @Body() createPostDto: CreatePostDto,
  ): Promise<InsertResult> {
    const { userId } = requestUser;
    const user = await this.userService.findOneByUserId(userId);
    if (!user) {
      this.logger.error('This user not exist');
      throw new NotFoundException('This user not exist');
    }

    return await this.postService.create(createPostDto, user);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  async getPost(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    const post = await this.postService.findOneByPostId(id);
    if (!post) {
      this.logger.error('This post nsot exist');
      throw new NotFoundException('This post not exist');
    }
    return post;
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async updatePost(
    @RequestUser() requestUser: RequestUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() createPostDto: CreatePostDto,
  ): Promise<UpdateResult> {
    const { userId } = requestUser;
    const user = await this.userService.findOneByUserId(userId);
    if (!user) {
      this.logger.error('This user not exist');
      throw new NotFoundException('This user not exist');
    }

    const post = await this.postService.findOneByPostId(id);
    if (!post) {
      this.logger.error('This post nsot exist');
      throw new NotFoundException('This post not exist');
    }

    if (user.id !== post.user.id) {
      this.logger.error('This post is not your post');
      throw new BadRequestException('This post is not your post');
    }

    return await this.postService.update(createPostDto, id);
  }
}
