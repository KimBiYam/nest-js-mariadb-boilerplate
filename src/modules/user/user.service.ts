import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { RegsiterUserDto, UpdateUserDto } from '../auth';
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

  async create(registerUserPayloadDto: RegsiterUserDto): Promise<User> {
    return await this.userRepository.save(registerUserPayloadDto);
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne(id);
  }

  async findOneByUserId(userId: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { userId },
    });
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  async update(
    userId: string,
    updateUserPayloadDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userRepository.update(userId, updateUserPayloadDto);
  }
}
