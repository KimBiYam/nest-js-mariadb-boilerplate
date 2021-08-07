import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import faker from 'faker';
import { User } from '../../entities';
import { UserService } from '../user';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {},
        },
        { provide: JwtService, useValue: {} },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createToken', () => {
    it('should success create Token', async () => {
      // given
      const sampleUser: User = {
        userId: faker.internet.userName(),
        password: faker.internet.password(),
        createdAt: faker.datatype.datetime(),
        email: faker.internet.email(),
        id: faker.datatype.number(),
        isActive: true,
        name: faker.internet.userName(),
        posts: [],
      };

      const sampleToken = faker.internet.password();

      jwtService.sign = jest.fn().mockReturnValue(sampleToken);

      // when
      const result = await service.createToken(sampleUser);

      // then
      expect(result.accessToken).toEqual(sampleToken);
      expect(result.user).toEqual(sampleUser);
    });
  });

  describe('login', () => {
    it('should success login', async () => {
      // given
      const userId = faker.internet.userName();
      const password = faker.internet.password();

      const sampleUser: User = {
        userId,
        password,
        createdAt: faker.datatype.datetime(),
        email: faker.internet.email(),
        id: faker.datatype.number(),
        isActive: true,
        name: faker.internet.userName(),
        posts: [],
      };

      userService.findOneByUserId = jest.fn().mockResolvedValue(sampleUser);

      // when
      const result = await service.login({ userId, password });

      // then
      expect(result.userId).toEqual(userId);
    });
  });
});
