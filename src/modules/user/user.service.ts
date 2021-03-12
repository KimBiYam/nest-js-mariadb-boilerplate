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
    const user = await this.userRepository.findOne(id);
    return user;
  }

  async findOneByUserId(userId: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { userId },
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
