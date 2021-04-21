import { PasswordTransformer } from '../../util/passwordTransformer';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { PostEntity } from '../post';

@Entity({ name: 'users' })
@Index(['id'], { unique: true })
@Unique(['userId', 'email'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar' })
  userId: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({
    type: 'varchar',
    transformer: new PasswordTransformer(),
  })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'tinyint', default: true })
  isActive: boolean;
}
