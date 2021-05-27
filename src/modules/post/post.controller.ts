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
  Delete,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User, RequestUser } from '../../decorators';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { JwtAuthGuard } from '../auth';
import { UserService } from '../user';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { Posts } from 'src/models/entities';

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
  @ApiOperation({ summary: '전체 게시글 가져오기' })
  @ApiResponse({ status: 200, description: '게시글 가져오기 성공' })
  async getPosts(): Promise<Posts[]> {
    return await this.postService.findAll();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '게시글 작성' })
  @ApiResponse({ status: 201, description: '게시글 작성 성공' })
  async createPost(
    @RequestUser() requestUser: User,
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
  @ApiOperation({ summary: '특정 게시글 가져오기' })
  @ApiResponse({ status: 200, description: '특정 게시글 가져오기 성공' })
  async getPost(@Param('id', ParseIntPipe) id: number): Promise<Posts> {
    const post = await this.postService.findOneByPostId(id);
    if (!post) {
      this.logger.error('This post not exist');
      throw new NotFoundException('This post not exist');
    }
    return post;
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '게시글 내용 수정' })
  @ApiResponse({ status: 200, description: '게시글 내용 수정 성공' })
  async updatePost(
    @RequestUser() requestUser: User,
    @Param('id', ParseIntPipe) id: number,
    @Body() createPostDto: CreatePostDto,
  ): Promise<UpdateResult> {
    const { userId } = requestUser;
    await this.postService.validatePostUser(userId, id);
    return await this.postService.update(createPostDto, id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '게시글 삭제' })
  @ApiResponse({ status: 200, description: '게시글 삭제 성공' })
  async deletePost(
    @RequestUser() requestUser: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    const { userId } = requestUser;
    await this.postService.validatePostUser(userId, id);
    return await this.postService.delete(id);
  }
}
