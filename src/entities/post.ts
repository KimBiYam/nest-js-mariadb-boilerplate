import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user';

@Entity({ name: 'post' })
export class Post {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @ApiProperty({ example: '제목', description: '게시글 제목', required: true })
  @IsString()
  @Column({ type: 'varchar' })
  title: string;

  @ApiProperty({ example: '내용', description: '게시글 내용', required: true })
  @IsString()
  @Column({ type: 'varchar' })
  content: string;

  @Index()
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'id' }])
  user: User;
}
