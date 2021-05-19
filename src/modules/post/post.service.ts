import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity, UserService } from '../user';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    private readonly userService: UserService,
  ) {}
  private logger = new Logger('Post');

  async findAll(): Promise<PostEntity[]> {
    return await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .select(['post', 'user.id', 'user.userId', 'user.name', 'user.email'])
      .getMany();
  }

  async findOneByPostId(id: number): Promise<PostEntity> {
    return await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .select(['post', 'user.id', 'user.userId', 'user.name', 'user.email'])
      .where('post.id = :id', { id })
      .getOne();
  }

  async create(createPostDto: CreatePostDto, user: UserEntity): Promise<any> {
    const post = new PostEntity();
    const { title, content } = createPostDto;
    post.title = title;
    post.content = content;
    post.user = user;
    return await this.postRepository.save(post);
  }

  async update(
    createPostDto: CreatePostDto,
    id: number,
  ): Promise<UpdateResult> {
    return await this.postRepository.update({ id }, createPostDto);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.postRepository.delete(id);
  }

  async validatePostUser(userId: string, id: number): Promise<boolean> {
    const user = await this.userService.findOneByUserId(userId);
    if (!user) {
      this.logger.error('This user not exist');
      throw new NotFoundException('This user not exist');
    }

    const post = await this.findOneByPostId(id);
    if (!post) {
      this.logger.error('This post not exist');
      throw new NotFoundException('This post not exist');
    }

    if (user.id !== post.user.id) {
      this.logger.error('This post is not your post');
      throw new BadRequestException('This post is not your post');
    }

    return true;
  }
}
