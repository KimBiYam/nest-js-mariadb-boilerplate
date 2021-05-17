import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from '../user';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const mockRepository = () => ({
  findOne: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
});

const mockUserService = {
  findOneByUserId: jest.fn(),
};

describe('PostService', () => {
  let postService: PostService;
  let userService: UserService;
  let postRepository: MockRepository<PostEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        { provide: getRepositoryToken(PostEntity), useValue: mockRepository() },
        { provide: UserService, useValue: mockUserService },
      ],
    }).compile();

    postService = module.get<PostService>(PostService);
    userService = module.get<UserService>(UserService);
    postRepository = module.get(getRepositoryToken(PostEntity));
  });

  it('should be defined', () => {
    expect(postService).toBeDefined();
  });

  it('should create post', () => {});
});
