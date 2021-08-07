import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import faker from 'faker';
import { User } from 'src/entities';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: 'test',
        }),
      ],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            createToken: jest.fn(),
            validateUser: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            // findOneByUserId: jest.fn(),
            // create: jest.fn(),
          },
        },
      ],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return token when success login', async () => {
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
      const sampleToken = faker.internet.password();

      authService.login = jest.fn().mockResolvedValue(sampleUser);
      authService.createToken = jest.fn().mockResolvedValue(sampleToken);

      // when
      const result = await controller.login({ password, userId });

      // then
      expect(result).toEqual(sampleToken);
    });

    it('should throw not found exception when user not exist', async () => {
      // given
      const userId = faker.internet.userName();
      const password = faker.internet.password();

      authService.login = jest.fn().mockRejectedValue(new NotFoundException());

      // when
      const result = controller.login({ userId, password });

      // then
      await expect(result).rejects.toThrow(NotFoundException);
    });

    it('should throw bad request exception when failure matching password', async () => {
      //given
      const userId = faker.internet.userName();
      const password = faker.internet.password();

      authService.login = jest
        .fn()
        .mockRejectedValue(new BadRequestException());

      //when
      const result = controller.login({ userId, password });

      //then
      await expect(result).rejects.toThrow(BadRequestException);
    });
  });

  describe('signUp', () => {
    it('should return user entity when success create user', async () => {
      // given
      const userId = faker.internet.userName();
      const password = faker.internet.password();
      const email = faker.internet.email();
      const name = faker.internet.userName();

      const sampleUser: User = {
        userId,
        password,
        email,
        name,
        id: faker.datatype.number(),
        createdAt: faker.datatype.datetime(),
        isActive: true,
        posts: [],
      };

      userService.findOneByUserId = jest.fn().mockReturnValue(undefined);
      userService.create = jest.fn().mockResolvedValue(sampleUser);

      // when
      const result = await controller.signUp({ userId, email, name, password });

      // then
      expect(result).toEqual(sampleUser);
    });

    it('should throw bad request exception when user exists', async () => {
      // given
      const userId = faker.internet.userName();
      const password = faker.internet.password();
      const email = faker.internet.email();
      const name = faker.internet.userName();

      const sampleUser: User = {
        userId,
        password,
        email,
        name,
        id: faker.datatype.number(),
        createdAt: faker.datatype.datetime(),
        isActive: true,
        posts: [],
      };

      userService.findOneByUserId = jest.fn().mockReturnValue(sampleUser);

      // when
      const result = controller.signUp({ userId, email, name, password });

      // then
      await expect(result).rejects.toThrowError(BadRequestException);
    });
  });

  describe('getProfile', () => {
    it('should get my profile when token is valid', async () => {
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

      userService.findOneByUserIdExceptPassword = jest
        .fn()
        .mockResolvedValue(sampleUser);

      // when
      const result = await controller.getProfile(sampleUser);

      // then
      expect(result).toEqual(sampleUser);
    });

    it('should throw not found exception when user is not exist', async () => {
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

      userService.findOneByUserIdExceptPassword = jest
        .fn()
        .mockResolvedValue(undefined);

      // when
      const result = controller.getProfile(sampleUser);

      // then
      await expect(result).rejects.toThrowError(NotFoundException);
    });
  });

  describe('updatePassword', () => {
    it('should success update password', async () => {
      // given
      const previousPassword = faker.internet.password();
      const newPassword = faker.internet.password();

      const sampleUser: User = {
        userId: faker.internet.userName(),
        password: previousPassword,
        createdAt: faker.datatype.datetime(),
        email: faker.internet.email(),
        id: faker.datatype.number(),
        isActive: true,
        name: faker.internet.userName(),
        posts: [],
      };

      userService.findOneByUserId = jest.fn().mockResolvedValue(sampleUser);
      userService.updatePassword = jest.fn().mockResolvedValue({});
      userService.findOneByUserIdExceptPassword = jest
        .fn()
        .mockResolvedValue({ ...sampleUser, password: newPassword });

      // when
      await controller.updatePassword(sampleUser, {
        newPassword,
        previousPassword,
      });

      const result = await controller.getProfile(sampleUser);

      // then
      expect(result.password).toEqual(newPassword);
    });
  });

  describe('signOut', () => {
    it('should success sign out', async () => {
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

      userService.remove = jest.fn().mockResolvedValue({});
      userService.findOneByUserIdExceptPassword = jest
        .fn()
        .mockResolvedValue(undefined);

      // when
      await controller.signOut(sampleUser);

      const result = controller.getProfile(sampleUser);

      // then
      await expect(result).rejects.toThrowError(NotFoundException);
    });
  });
});
