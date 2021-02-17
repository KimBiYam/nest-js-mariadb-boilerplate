import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      select: ['userId', 'name', 'email', 'isActive', 'created'],
    });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return await this.userRepository.save(createUserDto);
  }

  async findOneById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (user === undefined) {
      throw new NotFoundException(`id ${id} is not found`);
    }
    return user;
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

  async remove(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userRepository.update(userId, updateUserDto);
  }
}
