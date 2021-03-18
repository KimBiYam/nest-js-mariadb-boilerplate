import {
  Controller,
  Get,
  Post,
  Logger,
  UseGuards,
  NotFoundException,
  Body,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RequestUser } from 'src/decorators/user.decorator';
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
    private readonly PostService: PostService,
    private readonly userService: UserService,
  ) {}
  private logger = new Logger('Post');

  @Get()
  async getPosts(): Promise<PostEntity[]> {
    return await this.PostService.findAll();
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async createPost(
    @RequestUser() requestUser: RequestUser,
    @Body() createPostDto: CreatePostDto,
  ): Promise<any> {
    const { userId } = requestUser;
    const user = await this.userService.findOneByUserId(userId);
    if (!user) {
      this.logger.error('This user not exist');
      throw new NotFoundException('This user not exist');
    }
    this.logger.log(user);
    return await this.PostService.create(createPostDto, user.id);
  }
}
