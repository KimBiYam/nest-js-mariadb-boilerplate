import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from '../user';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}
  private logger = new Logger('Post');

  async findAll(): Promise<PostEntity[]> {
    return await this.postRepository.find({
      relations: ['user'],
    });
  }

  async findOneByPostId(id: number): Promise<PostEntity> {
    return await this.postRepository.findOne({
      relations: ['user'],
      where: { id },
    });
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
}
