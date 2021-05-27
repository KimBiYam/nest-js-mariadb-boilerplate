import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity, UserService } from '../user';
import { Posts, PostService } from './';
import { CreatePostDto } from './dto/create-post.dto';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const testUser: UserEntity = {
  id: 0,
  name: 'test',
  email: 'test@test.com',
  password: '12345678',
  userId: 'test',
  createdAt: new Date(),
  isActive: true,
};

const testPostEntity: Posts = {
  content: 'content',
  id: 1,
  title: 'title',
  user: testUser,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('PostService', () => {
  let postService: PostService;
  let userService: UserService;
  let postRepository: MockRepository<Posts>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostService,
        {
          provide: getRepositoryToken(Posts),
          useValue: {
            save: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            findOneByUserId: jest.fn((userId) => {
              return { ...testUser, userId };
            }),
          },
        },
      ],
    }).compile();

    postService = module.get<PostService>(PostService);
    userService = module.get<UserService>(UserService);
    postRepository = module.get(getRepositoryToken(Posts));
  });

  it('should be defined', () => {
    expect(postService).toBeDefined();
  });

  it('should create post', async () => {
    const createPostDto: CreatePostDto = {
      content: 'content',
      title: 'title',
    };

    postRepository.createQueryBuilder = jest.fn(() => ({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockReturnValue([testPostEntity]),
    }));

    await postService.create(createPostDto, testUser);
    const result = await postService.findAll();

    expect(result[0].content).toEqual(createPostDto.content);
  });

  it('should find one by postId', async () => {
    const postId = 1;
    const createPostDto: CreatePostDto = {
      content: 'content',
      title: 'title',
    };

    postRepository.createQueryBuilder = jest.fn(() => ({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockReturnValue(testPostEntity),
    }));

    await postService.create(createPostDto, testUser);
    const result = await postService.findOneByPostId(postId);

    expect(result.content).toEqual(createPostDto.content);
  });

  it('should validate post user', async () => {
    const userId = '0';
    const postId = 1;

    postRepository.createQueryBuilder = jest.fn(() => ({
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      select: jest.fn().mockReturnThis(),
      where: jest.fn().mockReturnThis(),
      getOne: jest.fn().mockReturnValue(testPostEntity),
    }));

    await postService.validatePostUser(userId, postId);
  });
});
