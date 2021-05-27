import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts, Users } from 'src/models/entities';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserService } from '../user';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
    private readonly userService: UserService,
  ) {}
  private logger = new Logger('Post');

  async findAll(): Promise<Posts[]> {
    return await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .select(['post', 'user.name'])
      .getMany();
  }

  async findOneByPostId(id: number): Promise<Posts> {
    return await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .select(['post', 'user.name'])
      .where('post.id = :id', { id })
      .getOne();
  }

  async create(createPostDto: CreatePostDto, user: Users): Promise<any> {
    const post = new Posts();
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
