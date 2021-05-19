import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/decorators';
import { PostController, PostService } from '.';
import { UserEntity, UserService } from '../user';
import { CreatePostDto } from './dto/create-post.dto';
import { PostEntity } from './post.entity';

const mockUserService = {
  findOneByUserId: jest.fn((id) => {
    return { ...testUser, id };
  }),
};

const mockPostService = {
  findAll: jest.fn(() => [mockPostEntity]),
  findOneByPostId: jest.fn((id: number) => {
    return { ...mockPostEntity, id };
  }),
  create: jest.fn(() => {
    return mockPostEntity;
  }),
  delete: jest.fn(() => {}),
  update: jest.fn(({ content, title }: CreatePostDto, id: number) => {
    return { ...mockPostEntity, id, content, title };
  }),
  validatePostUser: jest.fn(() => true),
};

const testUser: UserEntity = {
  id: 1,
  name: 'test',
  email: 'test@test.com',
  password: '12345678',
  userId: 'test',
  createdAt: new Date(),
  isActive: true,
};

const mockPostEntity: PostEntity = {
  content: 'content',
  id: 1,
  title: 'title',
  user: testUser,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('PostController', () => {
  let controller: PostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        {
          provide: PostService,
          useValue: mockPostService,
        },
      ],
    }).compile();

    controller = module.get<PostController>(PostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a post', async () => {
    const response = (await controller.createPost(
      { userId: '1', username: 'userName' },
      { content: 'content', title: 'title' },
    )) as any;

    expect(response.id).toEqual(1);
  });

  it('should get posts', async () => {
    const response = await controller.getPosts();

    expect(response.length).toBeGreaterThan(0);
  });

  it('should get a post', async () => {
    const postId = 1;
    const response = await controller.getPost(postId);

    expect(response.id).toEqual(postId);
  });

  it('should update a post', async () => {
    const user: User = { userId: '1', username: 'userName' };
    const createPostDto: CreatePostDto = { content: 'create', title: 'create' };
    const updatePostDto: CreatePostDto = {
      content: 'updated',
      title: 'updated',
    };
    const postId = 1;

    await controller.createPost(user, createPostDto);
    const response = (await controller.updatePost(
      user,
      postId,
      updatePostDto,
    )) as any;

    expect(response.content).toEqual(updatePostDto.content);
  });

  it('should delete a post', async () => {
    const user: User = { userId: '1', username: 'userName' };
    const createPostDto: CreatePostDto = { content: 'create', title: 'create' };
    const postId = 1;

    await controller.createPost(user, createPostDto);
    await controller.deletePost(user, postId);
    mockPostService.findAll = jest.fn(() => []);

    const response = await controller.getPosts();
    expect(response.length).toEqual(0);
  });
});
