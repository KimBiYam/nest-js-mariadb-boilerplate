import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { RegsiterUserDto, UpdateUserDto } from '../auth';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['userId', 'name', 'email', 'isActive', 'createdAt'],
    });
  }

  async create(registerUserPayloadDto: RegsiterUserDto): Promise<User> {
    return await this.userRepository.save(registerUserPayloadDto);
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    return user;
  }

  async findOneByUserId(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { userId },
    });
    return user;
  }

  async findOneByUserIdExceptPassword(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { userId },
      select: ['id', 'userId', 'name', 'email', 'createdAt', 'isActive'],
    });
    return user;
  }

  async remove(userId: string): Promise<DeleteResult> {
    return await this.userRepository.delete({ userId });
  }

  async update(
    userId: string,
    updateUserPayloadDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    await this.findOneByUserId(userId);
    return await this.userRepository.update(userId, updateUserPayloadDto);
  }

  async updatePassword(
    userId: string,
    newPassword: string,
  ): Promise<UpdateResult> {
    return await this.userRepository.update(
      { userId },
      { password: newPassword },
    );
  }
}
