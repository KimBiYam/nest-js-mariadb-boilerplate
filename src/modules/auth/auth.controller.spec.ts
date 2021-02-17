import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UserService],
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
