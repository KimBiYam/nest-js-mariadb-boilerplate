import { Test, TestingModule } from '@nestjs/testing';
import { getCustomRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getCustomRepositoryToken(UserRepository),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(
      getCustomRepositoryToken(UserRepository),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return for findAll', async () => {
    const testUser: User = {
      id: 0,
      name: 'test',
      email: 'test@test.com',
      password: '12345678',
      userId: 'test',
      created: new Date(),
      isActive: true,
    };

    jest.spyOn(userRepository, 'find').mockResolvedValueOnce([testUser]);
    const findUsers = await service.findAll();
    expect(findUsers).toEqual([testUser]);
  });
});
