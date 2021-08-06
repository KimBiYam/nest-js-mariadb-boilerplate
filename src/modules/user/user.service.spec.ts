import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { User } from '../../entities';

const testUser: User = {
  id: 0,
  name: 'test',
  email: 'test@test.com',
  password: '12345678',
  userId: 'test',
  createdAt: new Date(),
  isActive: true,
  posts: [],
};

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create', async () => {
    // given
    jest.spyOn(userRepository, 'save').mockResolvedValueOnce(testUser);

    // when
    const user = await service.create(testUser);

    // then
    expect(user).toEqual(testUser);
    expect(userRepository.save).toBeCalled();
  });

  it('findAll', async () => {
    // given
    jest.spyOn(userRepository, 'find').mockResolvedValueOnce([testUser]);

    // when
    const users = await service.findAll();

    // then
    expect(users).toEqual([testUser]);
    expect(userRepository.find).toBeCalled();
  });

  it('findOneById', async () => {
    // given
    const { id } = testUser;
    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(testUser);

    // when
    const user = await service.findOneById(id);

    // then
    expect(user).toEqual(testUser);
    expect(userRepository.findOne).toBeCalled();
  });

  it('findOneByUserId', async () => {
    // given
    const { userId } = testUser;
    jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(testUser);

    // when
    const user = await service.findOneByUserId(userId);

    // then
    expect(user).toEqual(testUser);
    expect(userRepository.findOne).toBeCalled();
  });
});
