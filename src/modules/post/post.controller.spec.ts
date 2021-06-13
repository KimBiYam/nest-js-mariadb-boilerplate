import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PostController, PostService } from '.';
import { UserService } from '../user';
import { CreatePostDto } from './dto/create-post.dto';
import { User, Post } from '../../entities';

const testUser: User = {
  id: 1,
  name: 'test',
  email: 'test@test.com',
  password: '12345678',
  userId: 'test',
  createdAt: new Date(),
  isActive: true,
  posts: [],
};

const testPostEntity: Post = {
  content: 'content',
  id: 1,
  title: 'title',
  user: testUser,
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('PostController', () => {
  let postController: PostController;
  let userSerivce: UserService;
  let postService: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findOneByUserId: jest.fn((id) => {
              return { ...testUser, id };
            }),
          },
        },
        {
          provide: PostService,
          useValue: {
            findAll: jest.fn(() => [testPostEntity]),
            findOneByPostId: jest.fn((id: number) => {
              return { ...testPostEntity, id };
            }),
            create: jest.fn(() => {
              return testPostEntity;
            }),
            delete: jest.fn(() => {
              true;
            }),
            update: jest.fn(({ content, title }: CreatePostDto, id: number) => {
              return { ...testPostEntity, id, content, title };
            }),
            validatePostUser: jest.fn(() => true),
          },
        },
      ],
    }).compile();

    postController = module.get<PostController>(PostController);
    userSerivce = module.get<UserService>(UserService);
    postService = module.get<PostService>(PostService);
  });

  it('should be defined', () => {
    expect(postController).toBeDefined();
  });

  it('should create a post', async () => {
    const user: User = testUser;
    const createPostDto: CreatePostDto = { content: 'content', title: 'title' };

    await postController.createPost(user, createPostDto);
    const result = await postController.getPosts();

    expect(result[0].id).toEqual(1);
  });

  it('should throw NotFoundException', async () => {
    const user: User = testUser;
    const createPostDto: CreatePostDto = { content: 'content', title: 'title' };

    userSerivce.findOneByUserId = jest.fn(() => undefined);
    expect(
      async () => await postController.createPost(user, createPostDto),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should get posts', async () => {
    const result = await postController.getPosts();

    expect(result.length).toBeGreaterThan(0);
  });

  it('should get a post', async () => {
    const postId = 1;

    const result = await postController.getPost(postId);

    expect(result.id).toEqual(postId);
  });

  it('should throw NotFoundException', async () => {
    const postId = 100;

    postService.findOneByPostId = jest.fn(() => undefined);

    expect(
      async () => await postController.getPost(postId),
    ).rejects.toThrowError(NotFoundException);
  });

  it('should update a post', async () => {
    const user: User = testUser;
    const createPostDto: CreatePostDto = { content: 'create', title: 'create' };
    const updatePostDto: CreatePostDto = {
      content: 'updated',
      title: 'updated',
    };
    const postId = 1;

    postService.findOneByPostId = jest.fn(async (id: number) => {
      return {
        ...testPostEntity,
        id,
        content: updatePostDto.content,
        title: updatePostDto.title,
      };
    });

    await postController.createPost(user, createPostDto);
    await postController.updatePost(user, postId, updatePostDto);
    const result = await postController.getPost(postId);

    expect(result.content).toEqual(updatePostDto.content);
  });

  it('should delete a post', async () => {
    const user: User = testUser;
    const createPostDto: CreatePostDto = { content: 'create', title: 'create' };
    const postId = 1;

    await postController.createPost(user, createPostDto);
    await postController.deletePost(user, postId);
    postService.findAll = jest.fn(async () => []);

    const result = await postController.getPosts();
    expect(result.length).toEqual(0);
  });
});
