import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    return await this.userRepository.save(createUserDto);
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    if (user === undefined) {
      throw new NotFoundException(`userId ${id} is not found`);
    }
    return user;
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.userRepository.delete(id);
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    await this.findOne(id);
    return await this.userRepository.update(id, updateUserDto);
  }
}
