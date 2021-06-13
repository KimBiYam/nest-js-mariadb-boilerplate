import { PasswordTransformer } from '../util/password-transformer';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { Post } from './post';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

@Entity({ name: 'user' })
@Unique(['userId', 'email'])
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ example: 'userId', description: '유저 ID', required: true })
  @IsString()
  @Column({ type: 'varchar' })
  userId: string;

  @ApiProperty({ example: 'name', description: '유저명', required: true })
  @IsString()
  @Column({ type: 'varchar' })
  name: string;

  @ApiProperty({
    example: 'userId@gmail.com',
    description: '이메일',
    required: true,
  })
  @IsEmail()
  @Column({ type: 'varchar' })
  email: string;

  @ApiProperty({ example: '12345678', description: '비밀번호', required: true })
  @IsString()
  @MinLength(8)
  @MaxLength(16)
  @Column({
    type: 'varchar',
    transformer: new PasswordTransformer(),
  })
  password: string;

  @Index()
  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'tinyint', default: true })
  isActive: boolean;

  @OneToMany(() => Post, (posts) => posts.user)
  posts: Post[];
}
