import { Injectable, NotFoundException } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['userId', 'name', 'email', 'isActive', 'created'],
    });
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    return await this.userRepository.save(createUserDto);
  }

  async findOneByUserId(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { userId },
    });
    if (user === undefined) {
      throw new NotFoundException(`userId ${userId} is not found`);
    }
    return user;
  }

  async remove(userId: string): Promise<DeleteResult> {
    await this.findOneByUserId(userId);
    return await this.userRepository.delete(userId);
  }

  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    await this.findOneByUserId(userId);
    return await this.userRepository.update(userId, updateUserDto);
  }
}
