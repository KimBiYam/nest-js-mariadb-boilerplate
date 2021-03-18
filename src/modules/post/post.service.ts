import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    return await this.postRepository.find();
  }

  async findOneByPostId(id: number): Promise<PostEntity> {
    return await this.postRepository.findOne(id);
  }

  async create(createPostDto: CreatePostDto, userId: number): Promise<any> {
    return await this.postRepository.save({ ...createPostDto, userId });
  }
}
