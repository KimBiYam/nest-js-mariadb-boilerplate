import { Test, TestingModule } from '@nestjs/testing';
import { PostController, PostService } from '.';
import { UserService } from '../user';

const mockUserService = {};

const mockPostService = {};

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
});
